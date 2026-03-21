import { groq } from '@ai-sdk/groq';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.content || m.text || (Array.isArray(m.parts) ? m.parts.find((p: any) => p.type === 'text')?.text : '') || '',
    })),
    system: `You are a helpful e-commerce assistant for a hardware, home decor, and health store.
    Your goals:
    1. Help users find products using the 'searchProducts' tool.
    2. Answer questions about product differences and specifications.
    3. Recommend products based on user needs.
    4. If a user asks for items under a certain price, use the 'maxPrice' argument in the tool.
    5. Always show items that fit the criteria.
    6. Ensure that when calling tools, you generate strictly valid JSON without any markdown or extra text.
    7. Provide short, concise descriptions for products.`,
    tools: {
      searchProducts: tool({
        description: 'Search for products in the store by keyword and price range.',
        inputSchema: z.object({
          search: z.string().optional().describe('Text search for title, description, or tags'),
          minPrice: z.coerce.number().optional().describe('Minimum price filter'),
          maxPrice: z.coerce.number().optional().describe('Maximum price filter'),
        }),
        execute: async ({ search, minPrice, maxPrice }: { search?: string, minPrice?: number, maxPrice?: number }) => {
          const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
                query GetProducts($search: String, $minPrice: Float, $maxPrice: Float) {
                  products(search: $search, minPrice: $minPrice, maxPrice: $maxPrice) {
                    id
                    title
                    description
                    price
                    tags
                  }
                }
              `,
              variables: { search, minPrice, maxPrice },
            }),
          });

          const { data } = await response.json();
          return data?.products || [];
        },
      }),
    },
  });

  // Updated to the modern AI SDK response method
  return result.toUIMessageStreamResponse();
}