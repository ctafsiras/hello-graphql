export const postResolvers = {
  createPost: async (
    parent,
    args: { title: string; content: string },
    { prisma, userId }
  ) => {
    if (!userId) {
      return {
        errorMessage: "You are not authenticated",
        post: null,
      };
    }
    if (!args.title || !args.content) {
      return {
        errorMessage: "Title and Content are required",
        post: null,
      };
    }
    const newPost = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userId,
      },
    });
    return {
      errorMessage: null,
      post: newPost,
    };
  },
  updatePost: async (
    parent,
    args: { id: string; title: string; content: string },
    { prisma, userId }
  ) => {
    if (!userId) {
      return {
        errorMessage: "You are not authenticated",
        post: null,
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: args.id,
      },
    });
    if (!post) {
      return {
        errorMessage: "Post not found",
        post: null,
      };
    }
    if (post.authorId !== userId) {
      return {
        errorMessage: "You are not authorized to update this post",
        post: null,
      };
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: args.id,
      },
      data: {
        title: args.title,
        content: args.content,
      },
    });
    return {
      errorMessage: null,
      post: updatedPost,
    };
  },
  deletePost: async (
    parent,
    args: { id: string; title: string; content: string },
    { prisma, userId }
  ) => {
    if (!userId) {
      return {
        errorMessage: "You are not authenticated",
        post: null,
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: args.id,
      },
    });
    if (!post) {
      return {
        errorMessage: "Post not found",
        post: null,
      };
    }
    if (post.authorId !== userId) {
      return {
        errorMessage: "You are not authorized to update this post",
        post: null,
      };
    }
    const deletedPost = await prisma.post.delete({
      where: {
        id: args.id,
      },
      data: {
        title: args.title,
        content: args.content,
      },
    });
    return {
      errorMessage: null,
      post: deletedPost,
    };
  },
  publishPost: async (parent, args: { id: string }, { prisma, userId }) => {
    if (!userId) {
      return {
        errorMessage: "You are not authenticated",
        post: null,
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: args.id,
      },
    });
    if (!post) {
      return {
        errorMessage: "Post not found",
        post: null,
      };
    }
    if (post.authorId !== userId) {
      return {
        errorMessage: "You are not authorized to update this post",
        post: null,
      };
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: args.id,
      },
      data: {
        published: true,
      },
    });
    return {
      errorMessage: null,
      post: updatedPost,
    };
  },
};
