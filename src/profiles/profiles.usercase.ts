import type { Profile } from '../../prisma/generated/client'
import prisma from '../lib/prisma'

// DTOs basados en el esquema de Prisma
export interface CreateProfileInput {
  DNI: string // @unique en la DB
  name: string
  lastname: string
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

export const getProfiles = async (): Promise<Profile[]> => {
  return prisma.profile.findMany({
    where: { deleted_at: false },
    include: {
      user: {
        select: {
          id_users: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  })
}

export const getProfileById = async (id_profiles: number): Promise<Profile | null> => {
  return prisma.profile.findFirst({
    where: { id_profiles, deleted_at: false },
    include: {
      user: {
        select: {
          id_users: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  })
}

export const createProfile = async (data: CreateProfileInput): Promise<Profile> => {
  // Verificar si ya existe un perfil con el mismo DNI
  const existingProfile = await prisma.profile.findFirst({
    where: { DNI: data.DNI, deleted_at: false },
  })

  if (existingProfile) {
    throw new Error('El DNI ya está en uso por otro perfil')
  }

  return prisma.profile.create({
    data: {
      ...data,
      deleted_at: false,
    },
    include: {
      user: {
        select: {
          id_users: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  })
}

export const updateProfile = async (
  id_profiles: number,
  data: Partial<CreateProfileInput>,
): Promise<Profile | null> => {
  const profile = await prisma.profile.findFirst({
    where: { id_profiles, deleted_at: false },
  })

  if (!profile) return null

  // Verificar si el DNI ya está en uso por otro perfil
  if (data.DNI) {
    const dniExists = await prisma.profile.findFirst({
      where: { DNI: data.DNI, deleted_at: false, NOT: { id_profiles } },
    })
    if (dniExists) {
      throw new Error('El DNI ya está en uso por otro perfil')
    }
  }

  return prisma.profile.update({
    where: { id_profiles },
    data,
    include: {
      user: {
        select: {
          id_users: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  })
}

export const deleteProfile = async (id_profiles: number): Promise<Profile | null> => {
  const profile = await prisma.profile.findFirst({
    where: { id_profiles, deleted_at: false },
  })
  if (!profile) return null
  return prisma.profile.update({
    where: { id_profiles },
    data: { deleted_at: true },
  })
}
