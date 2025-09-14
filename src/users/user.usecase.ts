import type { User } from '../../prisma/generated/client'
import { hashPassword } from '../lib/password'
import prisma from '../lib/prisma'

export interface CreateUserInput {
  name: string
  email: string
  password: string
  role: string
}

interface UpdateUserInput extends Partial<CreateUserInput> {}

export const getUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({
    where: { deleted: false },
  })
}

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findFirst({
    where: { id, deleted: false },
  })
}

export const createUser = async (data: CreateUserInput): Promise<User> => {
  const hashedPassword = await hashPassword(data.password)

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      validateEmail: false,
      deleted: false,
    },
  })
}

export const updateUser = async (id: number, data: UpdateUserInput): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: { id, deleted: false },
  })

  if (!user) return null

  return prisma.user.update({
    where: { id },
    data,
  })
}

export const deleteUser = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: { id, deleted: false },
  })

  if (!user) return null

  return prisma.user.update({
    where: { id },
    data: { deleted: true },
  })
}
