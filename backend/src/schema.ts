export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    role: String!
    createdAt: String!
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
    inventory: Int!
    tags: String!
    createdAt: String!
  }

  type Order {
    id: ID!
    user: User!
    status: String!
    total: Float!
    items: [OrderItem!]!
    createdAt: String!
  }

  type OrderItem {
    id: ID!
    product: Product!
    quantity: Int!
    price: Float!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    products(search: String): [Product!]!
    product(id: ID!): Product
    orders: [Order!]!
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
  
  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    createOrder(items: [OrderItemInput!]!): Order!
  }
`;
