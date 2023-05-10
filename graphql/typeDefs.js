
const typeDefs = `
  """
    Representa un mensaje en el sistema.
  """
  type Message {
    _id: ID
    content: String!
    timestamp: String!
  }

  type Query {
    getMessages: [Message]
  }

  type Mutation {
    sendMessage(content: String): Boolean
  }

  type Subscription {
    messageSent: Message
  }
`;

export { typeDefs };