import type { Request, Response } from 'express'
import { NotFoundError } from '../shared/shared.http.error'
import * as userUseCase from './user.usecase'

const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await userUseCase.getUsers()
  res.status(200).json(users)
}

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const user = await userUseCase.getUserById(Number(id))

  if (!user) {
    throw new NotFoundError('User not found')
  }

  res.status(200).json(user)
}

const createdUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body
  const user = await userUseCase.createUser({ name, email, password, role })
  res.status(201).json(user)
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { name, email, password, role } = req.body
  const user = await userUseCase.updateUser(Number(id), {
    name,
    email,
    password,
    role,
  })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  res.status(200).json(user)
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const user = await userUseCase.deleteUser(Number(id))

  if (!user) {
    throw new NotFoundError('User not found')
  }

  res.status(200).json({ message: 'User deleted successfully' })
}

export { getUsers, getUserById, createdUser, updateUser, deleteUser }
