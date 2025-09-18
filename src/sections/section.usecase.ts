import type { Section } from '../../prisma/generated/client'
import prisma from '../lib/prisma'

export interface CreateSectionInput {
  name: string // @unique en la DB
  shift: string
  id_degree: number
}

export interface SectionWithDegree extends Section {
  degree: {
    id_degrees: number
    name: string
    level: string
  }
}

const sectionInclude = {
  degree: {
    select: {
      id_degrees: true,
      name: true,
      level: true,
    },
  },
}

export const createSection = async (data: CreateSectionInput): Promise<SectionWithDegree> => {
  return prisma.section.create({
    data: { ...data, deleted: false },
    include: sectionInclude,
  })
}

export const getSections = async (): Promise<SectionWithDegree[]> => {
  return prisma.section.findMany({
    where: { deleted: false },
    include: sectionInclude,
  })
}

export const getSectionById = async (id_sections: number): Promise<SectionWithDegree | null> => {
  return prisma.section.findFirst({
    where: { id_sections, deleted: false },
    include: sectionInclude,
  })
}
export const updateSection = async (
  id_sections: number,
  data: Partial<CreateSectionInput>,
): Promise<SectionWithDegree | null> => {
  return prisma.section.update({
    where: { id_sections },
    data: { ...data, deleted: false },
    include: sectionInclude,
  })
}
export const deleteSection = async (id_sections: number): Promise<Section | null> => {
  const section = await prisma.section.findFirst({
    where: { id_sections, deleted: false },
  })
  if (!section) return null
  return prisma.section.update({
    where: { id_sections },
    data: { deleted: true },
  })
}
