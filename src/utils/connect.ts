// we need not call prisma  client again and again so declairing it once

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()


if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma