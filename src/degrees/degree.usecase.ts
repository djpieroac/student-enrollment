import type { Degree } from '../../prisma/generated/client'
import prisma from '../lib/prisma'

export interface CreateDegreeInput {
  name: string // @unique en la DB
  level: string
}

export const createDegree = async (data: CreateDegreeInput): Promise<Degree> => {
  return prisma.degree.create({
    data: { ...data, deleted: false },
  })
}
export const getDegrees = async (): Promise<Degree[]> => {
  return prisma.degree.findMany({
    where: { deleted: false },
  })
}

export const getDegreeById = async (id_degrees: number): Promise<Degree | null> => {
  return prisma.degree.findFirst({
    where: { id_degrees, deleted: false },
  })
}
export const updateDegree = async (
  id_degrees: number,
  data: Partial<CreateDegreeInput>,
): Promise<Degree | null> => {
  const degree = await prisma.degree.findFirst({
    where: { id_degrees, deleted: false },
  })
  if (!degree) {
    throw new Error('Degree not found')
  }
  return prisma.degree.update({
    where: { id_degrees },
    data,
  })
}
export const deleteDegree = async (id_degrees: number): Promise<Degree | null> => {
  const degree = await prisma.degree.findFirst({
    where: { id_degrees, deleted: false },
  })
  if (!degree) return null
  return prisma.degree.update({
    where: { id_degrees },
    data: { deleted: true },
  })
}
