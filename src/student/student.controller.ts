import type { Request, Response } from 'express'
import { NotFoundError } from '../shared/shared.http.error'
import * as studentUseCase from './student.usecase'

const getStudents = async (_req: Request, res: Response): Promise<void> => {
  const students = await studentUseCase.getStudents()
  res.status(200).json(students)
}

const getStudentById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const student = await studentUseCase.getStudentById(Number(id))
  if (!student) {
    throw new NotFoundError('Student not found')
  }
  res.status(200).json(student)
}

const createdStudent = async (req: Request, res: Response): Promise<void> => {
  const { emergency_contact, id_profile, id_exter_doc } = req.body
  const student = await studentUseCase.createStudent({
    emergency_contact,
    id_profile,
    id_exter_doc,
  })
  res.status(201).json(student)
}

const updateStudent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { emergency_contact, id_profile, id_exter_doc } = req.body
  const student = await studentUseCase.updateStudent(Number(id), {
    emergency_contact,
    id_profile,
    id_exter_doc,
  })
  if (!student) {
    throw new NotFoundError('Student not found')
  }
  res.status(200).json(student)
}

const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const student = await studentUseCase.deleteStudent(Number(id))
  if (!student) {
    throw new NotFoundError('Estudiante no encontrado')
  }
  res.status(200).json({ message: 'Student deleted successfully' })
}
export { getStudents, getStudentById, createdStudent, updateStudent, deleteStudent }
