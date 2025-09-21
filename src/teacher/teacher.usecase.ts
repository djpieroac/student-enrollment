import type { Teacher } from '../../prisma/generated/client'
import prisma from '../lib/prisma'

export interface CreateTeacherInput {
  academic_degree: string
  salary: number
  id_profile: number
}

export interface TeacherWithProfile extends Teacher {
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
}

const teacherInclude = {
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
}

export const getTeachers = async (): Promise<TeacherWithProfile[]> => {
  return prisma.teacher.findMany({
    where: { deleted: false },
    include: teacherInclude,
  })
}

export const getTeacherById = async (id_teachers: number): Promise<TeacherWithProfile | null> => {
  return prisma.teacher.findFirst({
    where: { id_teachers, deleted: false },
    include: teacherInclude,
  })
}

export const createTeacher = async (data: CreateTeacherInput): Promise<TeacherWithProfile> => {
  // Verificar si ya existe un docente con el mismo id_profile
  const existingTeacher = await prisma.teacher.findFirst({
    where: { id_profile: data.id_profile, deleted: false },
  })
  if (existingTeacher) {
    throw new Error('El perfil ya está asociado a otro docente')
  }
  // Verificar si el perfil existe y no está eliminado
  const profile = await prisma.profile.findFirst({
    where: { id_profiles: data.id_profile, deleted: false },
  })
  if (!profile) {
    throw new Error('El perfil asociado no existe o ha sido eliminado')
  }
  return prisma.teacher.create({
    data: {
      ...data,
      deleted: false,
    },
    include: teacherInclude,
  })
}

export const updateTeacher = async (
  id_teachers: number,
  data: Partial<CreateTeacherInput>,
): Promise<TeacherWithProfile | null> => {
  // Verificar si el docente existe y no está eliminado
  const existingTeacher = await prisma.teacher.findFirst({
    where: { id_teachers, deleted: false },
    include: teacherInclude,
  })
  if (!existingTeacher) {
    throw new Error('El docente no existe o ha sido eliminado')
  }
  // Verificar si el perfil existe y no está eliminado
  const profile = await prisma.profile.findFirst({
    where: { id_profiles: data.id_profile, deleted: false },
  })
  if (!profile) {
    throw new Error('El perfil asociado no existe o ha sido eliminado')
  }
  return prisma.teacher.update({
    where: { id_teachers },
    data: {
      ...data,
      deleted: false,
    },
    include: teacherInclude,
  })
}

export const deleteTeacher = async (id_teachers: number): Promise<Teacher | null> => {
  // Verificar si el docente existe y no está eliminado
  const teacher = await prisma.teacher.findFirst({
    where: { id_teachers, deleted: false },
  })
  if (!teacher) return null

  return prisma.teacher.update({
    where: { id_teachers },
    data: {
      deleted: true,
    },
  })
}
