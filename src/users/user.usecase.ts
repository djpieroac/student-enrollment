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
    where: { deleted_at: false },
  })
}

export const getUserById = async (id_users: number): Promise<User | null> => {
  return prisma.user.findFirst({
    where: { id_users, deleted_at: false },
  })
}

export const createUser = async (data: CreateUserInput): Promise<User> => {
  const hashedPassword = await hashPassword(data.password)

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      validate_email: false,
      deleted_at: false,
    },
  })
}

export const updateUser = async (id_users: number, data: UpdateUserInput): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: { id_users, deleted_at: false },
  })

  if (!user) return null

  return prisma.user.update({
    where: { id_users },
    data,
  })
}

export const deleteUser = async (id_users: number): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: { id_users, deleted_at: false },
  })

  if (!user) return null

  return prisma.user.update({
    where: { id_users },
    data: { deleted_at: true },
  })
}
