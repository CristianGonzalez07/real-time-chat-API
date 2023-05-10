
const typeDefs = `
  type Book {
    title: String
    author: String
  }

  type Post {
    author: String,
    comment: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createPost(author: String, comment: String): Post
  }

  type Subscription {
    postCreated: Post
  }
`;

export { typeDefs };