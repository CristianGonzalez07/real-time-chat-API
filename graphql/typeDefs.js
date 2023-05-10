
const typeDefs = `
  """
    Representa un mensaje en el sistema.
  """
  type Message {
    _id: ID
    content: String!
    timestamps: String!
  }

  type Post {
    author: String,
    comment: String
  }

  type Query {
    getMessages: [Message]
  }

  type Mutation {
    createPost(author: String, comment: String): Post
  }

  type Subscription {
    postCreated: Post
  }
`;

export { typeDefs };