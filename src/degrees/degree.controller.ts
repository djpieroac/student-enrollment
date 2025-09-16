import type { Request, Response } from 'express'
import { NotFoundError } from '../shared/shared.http.error'
import * as degreeUseCase from './degree.usecase'

const getDegrees = async (_req: Request, res: Response): Promise<void> => {
  const degrees = await degreeUseCase.getDegrees()
  res.status(200).json(degrees)
}

const getDegreeById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const degree = await degreeUseCase.getDegreeById(Number(id))
  if (!degree) throw new NotFoundError('Degree not found')
  res.status(200).json(degree)
}

const createDegree = async (req: Request, res: Response): Promise<void> => {
  const { name, level } = req.body
  const degree = await degreeUseCase.createDegree({ name, level })
  res.status(201).json(degree)
}
const updateDegree = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { name, level } = req.body
  const degree = await degreeUseCase.updateDegree(Number(id), { name, level })
  if (!degree) throw new NotFoundError('Degree not found')
  res.status(200).json(degree)
}

const deleteDegree = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const degree = await degreeUseCase.deleteDegree(Number(id))
  if (!degree) throw new NotFoundError('Degree not found')
  res.status(200).json({ message: 'Degree deleted successfully' })
}
export { getDegrees, getDegreeById, createDegree, updateDegree, deleteDegree }
