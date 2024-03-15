export const Query = {
    users: async (parent, args, { prisma }) => await prisma.user.findMany(),
    user: async (parent, args, { prisma }) => await prisma.user.findUnique({ where: { id: args.id } }),
    me: async (parent, args, { prisma, userId }) => await prisma.user.findUnique({ where: { id: userId } }),
    posts: async (parent, args, { prisma }) => await prisma.post.findMany(),
};
