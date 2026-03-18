import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import DataLoader from 'dataloader';

export const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-resume';

export interface Context {
  prisma: PrismaClient;
  user: User | null;
  loaders: {
    userLoader: DataLoader<string, User | null>;
  };
}

export const createContext = async ({ req }: { req: Request }): Promise<Context> => {
  const authHeader = req.headers.authorization || '';
  let user = null;

  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    } catch (e) {
      // Invalid token
    }
  }

  return {
    prisma,
    user,
    loaders: {
      userLoader: new DataLoader<string, User | null>(async (keys) => {
        const users = await prisma.user.findMany({
          where: { id: { in: keys as string[] } },
        });
        const userMap = new Map(users.map(u => [u.id, u]));
        return keys.map(id => userMap.get(id) || null);
      }),
    },
  };
};
