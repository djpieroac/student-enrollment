import type { Profile } from '../../prisma/generated/client'
import prisma from '../lib/prisma'

// DTOs basados en el esquema de Prisma
export interface CreateProfileInput {
  DNI: string // @unique en la DB
  name: string
  last_name: string
  date_birthday: Date
  national: string
  phone: string
  addres: string
  sex: string
  status: string
  id_user: number // Relación con User
}

export interface ProfileWithUser extends Profile {
  user: {
    id_users: number
    name: string
    email: string
    role: string
  }
}

const profileInclude = {
  user: {
    select: {
      id_users: true,
      name: true,
      email: true,
      role: true,
    },
  },
}

export const getProfiles = async (): Promise<ProfileWithUser[]> => {
  return prisma.profile.findMany({
    where: { deleted: false },
    include: profileInclude,
  })
}

export const getProfileById = async (id_profiles: number): Promise<ProfileWithUser | null> => {
  return prisma.profile.findFirst({
    where: { id_profiles, deleted: false },
    include: profileInclude,
  })
}

export const createProfile = async (data: CreateProfileInput): Promise<ProfileWithUser> => {
  // Verificar si ya existe un perfil con el mismo DNI
  const existingProfile = await prisma.profile.findFirst({
    where: { DNI: data.DNI, deleted: false },
  })

  if (existingProfile) {
    throw new Error('El DNI ya está en uso por otro perfil')
  }

  return prisma.profile.create({
    data: {
      ...data,
      deleted: false,
    },
    include: profileInclude,
  })
}

export const updateProfile = async (
  id_profiles: number,
  data: Partial<CreateProfileInput>,
): Promise<ProfileWithUser | null> => {
  const profile = await prisma.profile.findFirst({
    where: { id_profiles, deleted: false },
  })

  if (!profile) return null

  // Verificar si el DNI ya está en uso por otro perfil
  if (data.DNI) {
    const dniExists = await prisma.profile.findFirst({
      where: { DNI: data.DNI, deleted: false, NOT: { id_profiles } },
    })
    if (dniExists) {
      throw new Error('El DNI ya está en uso por otro perfil')
    }
  }

  return prisma.profile.update({
    where: { id_profiles },
    data,
    include: profileInclude,
  })
}

export const deleteProfile = async (id_profiles: number): Promise<Profile | null> => {
  const profile = await prisma.profile.findFirst({
    where: { id_profiles, deleted: false },
  })
  if (!profile) return null
  return prisma.profile.update({
    where: { id_profiles },
    data: { deleted: true },
  })
}
