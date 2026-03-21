import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Context } from './context';
import { GraphQLError } from 'graphql';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-resume';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) throw new GraphQLError('Not authenticated');
      return context.user;
    },
    products: async (_: any, { search, minPrice, maxPrice }: { search?: string, minPrice?: number, maxPrice?: number }, context: Context) => {
      const where: any = {};

      if (search) {
        where.OR = [
          { title: { contains: search } },
          { description: { contains: search } },
          { tags: { contains: search } }
        ];
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};
        if (minPrice !== undefined) where.price.gte = minPrice;
        if (maxPrice !== undefined) where.price.lte = maxPrice;
      }

      return context.prisma.product.findMany({ where });
    },
    product: async (_: any, { id }: { id: string }, context: Context) => {
      return context.prisma.product.findUnique({ where: { id } });
    },
    orders: async (_: any, __: any, context: Context) => {
      if (!context.user) throw new GraphQLError('Not authenticated');
      return context.prisma.order.findMany({
        where: { userId: context.user.id }
      });
    }
  },
  Mutation: {
    register: async (_: any, { input }: any, context: Context) => {
      const existingUser = await context.prisma.user.findUnique({ where: { email: input.email } });
      if (existingUser) throw new GraphQLError('User already exists');

      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await context.prisma.user.create({
        data: { email: input.email, password: hashedPassword }
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user };
    },
    login: async (_: any, { input }: any, context: Context) => {
      const user = await context.prisma.user.findUnique({ where: { email: input.email } });
      if (!user) throw new GraphQLError('Invalid credentials');

      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) throw new GraphQLError('Invalid credentials');

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user };
    },
    createOrder: async (_: any, { items }: any, context: Context) => {
      if (!context.user) throw new GraphQLError('Not authenticated');

      let total = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = await context.prisma.product.findUnique({ where: { id: item.productId } });
        if (!product) throw new GraphQLError(`Product ${item.productId} not found`);
        if (product.inventory < item.quantity) throw new GraphQLError(`Insufficient inventory for ${product.title}`);

        total += product.price * item.quantity;
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price
        });
      }

      const order = await context.prisma.order.create({
        data: {
          userId: context.user.id,
          total,
          items: {
            create: orderItemsData
          }
        },
        include: { items: true }
      });

      // Update inventory (in a real app, do this in a transaction)
      for (const item of items) {
        await context.prisma.product.update({
          where: { id: item.productId },
          data: { inventory: { decrement: item.quantity } }
        });
      }

      return order;
    }
  },
  Order: {
    user: async (parent: any, _: any, context: Context) => {
      // Use DataLoader to avoid N+1 queries when fetching orders -> users
      return context.loaders.userLoader.load(parent.userId);
    },
    items: async (parent: any, _: any, context: Context) => {
      return context.prisma.orderItem.findMany({ where: { orderId: parent.id } });
    }
  },
  OrderItem: {
    product: async (parent: any, _: any, context: Context) => {
      return context.prisma.product.findUnique({ where: { id: parent.productId } });
    }
  }
};
