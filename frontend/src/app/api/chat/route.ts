// @ts-nocheck
import { streamText, tool } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY
});

// Simple in-memory rate limiter (max 5 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

export async function POST(req: Request) {
  // Simple IP extraction
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();

  const limitWindow = rateLimitMap.get(ip);
  if (!limitWindow || now - limitWindow.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
  } else {
    limitWindow.count++;
    if (limitWindow.count > RATE_LIMIT) {
      return new Response('Rate limit exceeded. Please wait a minute before sending another message.', { status: 429 });
    }
  }

  try {
    const { messages } = await req.json();

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: 'You are an AI personal shopping assistant for Amazon Clone. Be helpful, concise, and professional. You have a tool to search the database. When a user asks for products, USE the searchProducts tool with an appropriate search term. If they mention a budget, specify it in the tool call. After returning results, provide them with brief explanations of the products you found, and recommend the best one.',
      messages,
      maxSteps: 5, // allows the LLM to call a tool and then respond with the result automatically
      tools: {
        searchProducts: tool({
          description: 'Searches the Amazon Clone database for products matching the user query.',
          parameters: z.object({
            searchTerm: z.string().describe('The main keyword to search for (e.g., "paint", "graphics card"). If no keyword is clear, use a broad term.'),
            maxPrice: z.number().optional().describe('Maximum price if specified by the user.'),
          }),
          execute: async ({ searchTerm, maxPrice }: { searchTerm: string; maxPrice?: number }) => {
            try {
              const res = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  query: `
                    query GetProducts($search: String) {
                      products(search: $search) {
                        id
                        title
                        description
                        price
                      }
                    }
                  `,
                  variables: { search: searchTerm || "" },
                })
              });
              const { data } = await res.json();
              let products = data?.products || [];
              if (maxPrice) {
                products = products.filter((p: any) => p.price <= maxPrice);
              }
              return products;
            } catch (e) {
              return { error: 'Failed to access database.' };
            }
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (e: any) {
    console.error("API ROUTE ERROR:", e);
    return new Response(JSON.stringify({ error: e.message, stack: e.stack }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

