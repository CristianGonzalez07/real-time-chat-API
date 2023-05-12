
const typeDefs = `
  """
    Representa un mensaje en el sistema.
  """
  type Message {
    _id: ID
    content: String!
    timestamp: String!
  }

  """
  Representa un usuario en el sistema.
  """
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    created_at: String!
  }

  """
  Representa un input de usuario.
  """
  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getMessages: [Message]
  }

  type Mutation {
    sendMessage(content: String!): Boolean
    signUp(user: UserInput!): String
  }

  type Subscription {
    messageSent: Message
  }
`;

export { typeDefs };