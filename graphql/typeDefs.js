
const typeDefs = `
  # Representa un mensaje
  type Message {
    _id: ID
    owner: String!
    content: String!
    timestamp: String!
  }

  # Representa un usuario
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    created_at: String!
  }

  # Entrada para crear un usuario
  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  # Entrada para autenticar un usuario
  input LoginInput {
    email: String!
    password: String!
  }

  # Consultas disponibles
  type Query {
    # Obtiene todos los mensajes
    getMessages: [Message]

    # autentica un usuario
    login(user: LoginInput!): String
  }

  # Mutaciones disponibles
  type Mutation {
    # Envía un mensaje
    sendMessage(content: String!, owner:String!): Boolean

    # Registra un nuevo usuario
    signUp(user: UserInput!): String
  }

  # Suscripciones disponibles
  type Subscription {
    # Notifica cuando se envía un mensaje
    messageSent: Message
  }
`;

export { typeDefs };