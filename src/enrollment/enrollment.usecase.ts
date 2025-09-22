import type { Enrollment, status_enrollment, type_admission } from '../../prisma/generated/client'
import prisma from '../lib/prisma'

export interface CreateEnrollmentInput {
  date_enrollment: Date
  status_enrollments: status_enrollment
  school_year: string
  type_admission: type_admission
  id_student: number
  id_section: number
  id_reprensentative: number
}

export interface EnrollmentWithRelations extends Enrollment {
  student: {
    id_students: number
    profile: {
      id_profiles: number
      DNI: string
      name: string
      last_name: string
      national: string
      phone: string
      addres: string
      sex: string
    }
  }
  section: {
    id_sections: number
    name: string
    shift: string
    degree: {
      id_degrees: number
      name: string
      level: string
    }
  }
  legal_representative: {
    id_legal_representatives: number
    profile: {
      id_profiles: number
      DNI: string
      name: string
      last_name: string
      national: string
      phone: string
      addres: string
      sex: string
    }
  }
}
const enrollmentInclude = {
  student: {
    include: {
      profile: {
        select: {
          id_profiles: true,
          DNI: true,
          name: true,
          last_name: true,
          national: true,
          phone: true,
          addres: true,
          sex: true,
        },
      },
    },
  },
  section: {
    include: {
      degree: {
        select: {
          id_degrees: true,
          name: true,
          level: true,
        },
      },
    },
  },
  legal_representative: {
    include: {
      profile: {
        select: {
          id_profiles: true,
          DNI: true,
          name: true,
          last_name: true,
          national: true,
          phone: true,
          addres: true,
          sex: true,
        },
      },
    },
  },
}

export const getEnrollments = async (): Promise<EnrollmentWithRelations[]> => {
  return prisma.enrollment.findMany({
    where: { deleted: false },
    include: enrollmentInclude,
  })
}

export const getEnrollmentById = async (
  id_enrollments: number,
): Promise<EnrollmentWithRelations | null> => {
  return prisma.enrollment.findFirst({
    where: { id_enrollments, deleted: false },
    include: enrollmentInclude,
  })
}

export const createEnrollment = async (
  data: CreateEnrollmentInput,
): Promise<EnrollmentWithRelations> => {
  // Validar si existen estudiantes
  const student = await prisma.student.findFirst({
    where: { id_students: data.id_student, deleted: false },
  })
  if (!student) {
    throw new Error('El estudiante no existe')
  }

  // Validar si existen secciones
  const section = await prisma.section.findFirst({
    where: { id_sections: data.id_section, deleted: false },
  })
  if (!section) {
    throw new Error('La sección no existe')
  }

  // Validar si existen representantes legales
  const legalRepresentative = await prisma.legal_representative.findFirst({
    where: { id_legal_representatives: data.id_reprensentative, deleted: false },
  })
  if (!legalRepresentative) {
    throw new Error('El representante legal no existe')
  }

  return prisma.enrollment.create({
    data: {
      ...data,
      deleted: false,
    },
    include: enrollmentInclude,
  })
}

export const updateEnrollment = async (
  id_enrollments: number,
  data: Partial<CreateEnrollmentInput>,
): Promise<EnrollmentWithRelations | null> => {
  // Verificar si la inscripción existe y no está eliminada
  const enrollment = await prisma.enrollment.findFirst({
    where: { id_enrollments, deleted: false },
  })
  if (!enrollment) return null

  // Validar las relaciones si se proporcionan en los datos de actualización
  if (data.id_student) {
    const student = await prisma.student.findFirst({
      where: { id_students: data.id_student, deleted: false },
    })
    if (!student) {
      throw new Error('El estudiante no existe')
    }
  }

  // Validar la sección si se proporciona en los datos de actualización
  if (data.id_section) {
    const section = await prisma.section.findFirst({
      where: { id_sections: data.id_section, deleted: false },
    })
    if (!section) {
      throw new Error('La sección no existe')
    }
  }

  // Validar el representante legal si se proporciona en los datos de actualización
  if (data.id_reprensentative) {
    const legalRepresentative = await prisma.legal_representative.findFirst({
      where: { id_legal_representatives: data.id_reprensentative, deleted: false },
    })
    if (!legalRepresentative) {
      throw new Error('El representante legal no existe')
    }
  }

  return prisma.enrollment.update({
    where: { id_enrollments },
    data,
    include: enrollmentInclude,
  })
}

export const deleteEnrollment = async (id_enrollments: number): Promise<Enrollment | null> => {
  const enrollment = await prisma.enrollment.findFirst({
    where: { id_enrollments, deleted: false },
  })
  if (!enrollment) return null
  return prisma.enrollment.update({
    where: { id_enrollments },
    data: { deleted: true },
  })
}
