export const typeDefs = `
  type Mutation {
    signUp(name: String!, email: String!, password: String!, bio: String): UserToken,
    signIn(email: String!, password: String!): UserToken,
    createPost(title: String!, content: String!): PostResponse,
    updatePost(id: ID!, title: String, content: String): PostResponse,
    deletePost(id: ID!): PostResponse,
    publishPost(id: ID!): PostResponse,

  }
  input PostInput{
    title: String
    content: String
  }
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
    createdAt: String!
  }
  type UserToken{   
    token: String!
    errorMessage: String
  }
  type Post{
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
    createdAt: String!
  }
  type Profile{
    id: ID!
    bio: String!
    user: User!
  }
  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    posts: [Post]
    post(id: ID!): Post
    profiles: [Profile]
    profile(id: ID!): Profile
  }

  type PostResponse{
    errorMessage: String
    post: Post
  }
`;
