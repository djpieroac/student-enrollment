import type { Request, Response } from 'express'
import { NotFoundError } from '../shared/shared.http.error'
import * as sectionUseCase from './section.usecase'

const getSections = async (_req: Request, res: Response): Promise<void> => {
  const sections = await sectionUseCase.getSections()
  res.status(200).json(sections)
}

const getSectionById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const section = await sectionUseCase.getSectionById(Number(id))
  if (!section) throw new NotFoundError('Section not found')
  res.status(200).json(section)
}

const createSection = async (req: Request, res: Response): Promise<void> => {
  const { name, shift, id_degree } = req.body
  const section = await sectionUseCase.createSection({ name, shift, id_degree })
  res.status(201).json(section)
}

const updateSection = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { name, shift, id_degree } = req.body
  const section = await sectionUseCase.updateSection(Number(id), { name, shift, id_degree })
  if (!section) throw new NotFoundError('Section not found')
  res.status(200).json(section)
}

const deleteSection = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const section = await sectionUseCase.deleteSection(Number(id))
  if (!section) throw new NotFoundError('Section not found')
  res.status(200).json(section)
}

export { getSections, getSectionById, createSection, updateSection, deleteSection }
