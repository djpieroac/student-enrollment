import type { Request, Response } from 'express'
import { NotFoundError } from '../shared/shared.http.error'
import * as teacherUseCase from './teacher.usecase'

const getTeachers = async (_req: Request, res: Response): Promise<void> => {
  const teachers = await teacherUseCase.getTeachers()
  res.status(200).json(teachers)
}

const getTeacherById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const teacher = await teacherUseCase.getTeacherById(Number(id))
  if (!teacher) throw new NotFoundError('Docente no encontrado')
  res.status(200).json(teacher)
}

const createdTeacher = async (req: Request, res: Response): Promise<void> => {
  const { academic_degree, salary, id_profile } = req.body
  const teacher = await teacherUseCase.createTeacher({
    academic_degree,
    salary,
    id_profile,
  })
  res.status(201).json(teacher)
}
const updateTeacher = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { academic_degree, salary, id_profile } = req.body
  const teacher = await teacherUseCase.updateTeacher(Number(id), {
    academic_degree,
    salary,
    id_profile,
  })
  if (!teacher) throw new NotFoundError('Docente no encontrado')
  res.status(200).json(teacher)
}

const deleteTeacher = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const teacher = await teacherUseCase.deleteTeacher(Number(id))
  if (!teacher) throw new NotFoundError('Docente no encontrado')
  res.status(200).json(teacher)
}

export { getTeachers, getTeacherById, createdTeacher, updateTeacher, deleteTeacher }
