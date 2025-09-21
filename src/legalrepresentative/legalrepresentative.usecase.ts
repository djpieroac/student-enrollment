import type { Legal_representative } from '../../prisma/generated/client'
import prisma from '../lib/prisma'

export interface CreateLegalRepresentativeInput {
  family_relationship: string
  id_profile: number
}

export interface LegalRepresentativeWithProfile extends Legal_representative {
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

const legalRepresentativeInclude = {
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

export const getLegalRepresentatives = async (): Promise<LegalRepresentativeWithProfile[]> => {
  return prisma.legal_representative.findMany({
    where: { deleted: false },
    include: legalRepresentativeInclude,
  })
}

export const getLegalRepresentativeById = async (
  id_legal_representatives: number,
): Promise<LegalRepresentativeWithProfile | null> => {
  return prisma.legal_representative.findFirst({
    where: { id_legal_representatives, deleted: false },
    include: legalRepresentativeInclude,
  })
}

export const createLegalRepresentative = async (
  data: CreateLegalRepresentativeInput,
): Promise<LegalRepresentativeWithProfile> => {
  // Verificar si ya existe un representante legal con el mismo id_profile
  const existingLegalRepresentative = await prisma.legal_representative.findFirst({
    where: { id_profile: data.id_profile, deleted: false },
  })

  if (existingLegalRepresentative) {
    throw new Error('El perfil ya está asociado a otro representante legal')
  }

  // Verificar si el perfil existe y no está eliminado
  const profile = await prisma.profile.findFirst({
    where: { id_profiles: data.id_profile, deleted: false },
  })
  if (!profile) {
    throw new Error('El perfil asociado no existe o ha sido eliminado')
  }

  return prisma.legal_representative.create({
    data: {
      ...data,
      deleted: false,
    },
    include: legalRepresentativeInclude,
  })
}

export const updateLegalRepresentative = async (
  id_legal_representatives: number,
  data: Partial<CreateLegalRepresentativeInput>,
): Promise<LegalRepresentativeWithProfile | null> => {
  // Verificar si el representante legal existe y no está eliminado
  const existingLegalRepresentative = await prisma.legal_representative.findFirst({
    where: { id_legal_representatives, deleted: false },
    include: legalRepresentativeInclude,
  })
  if (!existingLegalRepresentative) {
    throw new Error('El representante legal no existe o ha sido eliminado')
  }
  // Verificar si el perfil existe y no está eliminado
  const profile = await prisma.profile.findFirst({
    where: { id_profiles: data.id_profile, deleted: false },
  })
  if (!profile) {
    throw new Error('El perfil asociado no existe o ha sido eliminado')
  }
  return prisma.legal_representative.update({
    where: { id_legal_representatives },
    data: {
      ...data,
      deleted: false,
    },
    include: legalRepresentativeInclude,
  })
}

export const deleteLegalRepresentative = async (
  id_legal_representatives: number,
): Promise<Legal_representative | null> => {
  const existingLegalRepresentative = await prisma.legal_representative.findFirst({
    where: { id_legal_representatives, deleted: false },
  })
  if (!existingLegalRepresentative) return null

  return prisma.legal_representative.update({
    where: { id_legal_representatives },
    data: { deleted: true },
  })
}
