import type { Request, Response } from 'express'
import { NotFoundError } from '../shared/shared.http.error'
import * as enrollmentUseCase from './enrollment.usecase'

const getEnrollments = async (_req: Request, res: Response): Promise<void> => {
  const enrollments = await enrollmentUseCase.getEnrollments()
  res.status(200).json(enrollments)
}

const getEnrollmentById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const enrollment = await enrollmentUseCase.getEnrollmentById(Number(id))
  if (!enrollment) {
    throw new NotFoundError('Enrollment not found')
  }
  res.status(200).json(enrollment)
}

const createdEnrollment = async (req: Request, res: Response): Promise<void> => {
  const {
    date_enrollment,
    status_enrollments,
    school_year,
    type_admission,
    id_student,
    id_section,
    id_reprensentative,
  } = req.body
  const enrollment = await enrollmentUseCase.createEnrollment({
    date_enrollment,
    status_enrollments,
    school_year,
    type_admission,
    id_student,
    id_section,
    id_reprensentative,
  })
  res.status(201).json(enrollment)
}
const updateEnrollment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const {
    date_enrollment,
    status_enrollments,
    school_year,
    type_admission,
    id_student,
    id_section,
    id_reprensentative,
  } = req.body
  const enrollment = await enrollmentUseCase.updateEnrollment(Number(id), {
    date_enrollment,
    status_enrollments,
    school_year,
    type_admission,
    id_student,
    id_section,
    id_reprensentative,
  })
  if (!enrollment) {
    throw new NotFoundError('Enrollment not found')
  }
  res.status(200).json(enrollment)
}

const deleteEnrollment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const enrollment = await enrollmentUseCase.deleteEnrollment(Number(id))
  if (!enrollment) {
    throw new NotFoundError('Enrollment not found')
  }
  res.status(200).json({ message: 'Enrollment deleted successfully' })
}

export { getEnrollments, getEnrollmentById, createdEnrollment, updateEnrollment, deleteEnrollment }
