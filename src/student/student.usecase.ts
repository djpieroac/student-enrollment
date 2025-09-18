import type { Student } from '../../prisma/generated/client'
import prisma from '../lib/prisma'

export interface CreateStudentInput {
  emergency_contact: string
  id_profile: number
  id_exter_doc: number
}

export interface StudentWithProfile extends Student {
  profile: {
    id_profiles: number
    DNI: string
    name: string
    last_name: string
    date_birthday: Date
    national: string
    phone: string
    addres: string
    sex: string
    status: string
  }
  external_document: {
    id_external_doc: number
    tipe_document: string
    status: string
  }
}

const studentInclude = {
  profile: {
    select: {
      id_profiles: true,
      DNI: true,
      name: true,
      last_name: true,
      date_birthday: true,
      national: true,
      phone: true,
      addres: true,
      sex: true,
      status: true,
    },
  },

  external_document: {
    select: {
      id_external_doc: true,
      tipe_document: true,
      status: true,
    },
  },
}

export const getStudents = async (): Promise<StudentWithProfile[]> => {
  return prisma.student.findMany({
    where: { deleted: false },
    include: studentInclude,
  })
}

export const getStudentById = async (id_students: number): Promise<StudentWithProfile | null> => {
  return prisma.student.findFirst({
    where: { id_students, deleted: false },
    include: studentInclude,
  })
}

export const createStudent = async (data: CreateStudentInput): Promise<StudentWithProfile> => {
  // Verificar si el perfil existe y no está eliminado
  const profile = await prisma.profile.findFirst({
    where: { id_profiles: data.id_profile, deleted: false },
  })

  if (!profile) {
    throw new Error('El perfil asociado no existe o ha sido eliminado')
  }

  // Verificar si el documento externo existe y no está eliminado
  const externalDocument = await prisma.external_document.findFirst({
    where: { id_external_doc: data.id_exter_doc, deleted: false },
  })

  if (!externalDocument) {
    throw new Error('El documento externo asociado no existe o ha sido eliminado')
  }

  // Verificar si el perfil ya está asociado a otro estudiante
  const existingStudent = await prisma.student.findFirst({
    where: { id_profile: data.id_profile, deleted: false },
  })
  if (existingStudent) {
    throw new Error('El perfil ya está asociado a otro estudiante')
  }

  return prisma.student.create({
    data: {
      ...data,
      deleted: false,
    },
    include: studentInclude,
  })
}

export const updateStudent = async (
  id_students: number,
  data: Partial<CreateStudentInput>,
): Promise<StudentWithProfile | null> => {
  const student = await prisma.student.findFirst({
    where: { id_students, deleted: false },
  })
  if (!student) return null
  // Si se está actualizando el id_profile, verificar que el nuevo perfil exista y no esté eliminado
  if (data.id_profile) {
    const profile = await prisma.profile.findFirst({
      where: { id_profiles: data.id_profile, deleted: false },
    })
    if (!profile) {
      throw new Error('El perfil asociado no existe o ha sido eliminado')
    }
    // Verificar si el nuevo perfil ya está asociado a otro estudiante
    const existingStudent = await prisma.student.findFirst({
      //NOT es para excluir al estudiante actual de la búsqueda
      where: { id_profile: data.id_profile, deleted: false, NOT: { id_students } },
    })
    if (existingStudent) {
      throw new Error('El perfil ya está asociado a otro estudiante')
    }
  }
  // Si se está actualizando el id_exter_doc, verificar que el nuevo documento exista y no esté eliminado
  if (data.id_exter_doc) {
    const externalDocument = await prisma.external_document.findFirst({
      where: { id_external_doc: data.id_exter_doc, deleted: false },
    })
    if (!externalDocument) {
      throw new Error('El documento externo asociado no existe o ha sido eliminado')
    }
  }
  return prisma.student.update({
    where: { id_students },
    data,
    include: studentInclude,
  })
}

export const deleteStudent = async (id_students: number): Promise<Student | null> => {
  // Verificar si el estudiante existe y no está eliminado
  const student = await prisma.student.findFirst({
    where: { id_students, deleted: false },
  })
  if (!student) return null

  return prisma.student.update({
    where: { id_students },
    data: { deleted: true },
    include: studentInclude,
  })
}
