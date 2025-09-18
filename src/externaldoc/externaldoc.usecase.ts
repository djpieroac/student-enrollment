import type { External_document } from '../../prisma/generated/client'
import prisma from '../lib/prisma'

export interface CreateExternalDocInput {
  tipe_document: string // @unique en la DB
  url_file: string
  status: string
}

export const createExternalDoc = async (
  data: CreateExternalDocInput,
): Promise<External_document> => {
  return prisma.external_document.create({
    data: { ...data, deleted: false },
  })
}

export const getExternalDocs = async (): Promise<External_document[]> => {
  return prisma.external_document.findMany({
    where: { deleted: false },
  })
}

export const getExternalDocById = async (
  id_external_doc: number,
): Promise<External_document | null> => {
  return prisma.external_document.findFirst({
    where: { id_external_doc, deleted: false },
  })
}

export const updateExternalDoc = async (
  id_external_doc: number,
  data: Partial<CreateExternalDocInput>,
): Promise<External_document | null> => {
  return prisma.external_document.update({
    where: { id_external_doc },
    data: { ...data, deleted: false },
  })
}

export const deleteExternalDoc = async (
  id_external_doc: number,
): Promise<External_document | null> => {
  const externalDoc = await prisma.external_document.findFirst({
    where: { id_external_doc, deleted: false },
  })
  if (!externalDoc) return null

  return prisma.external_document.delete({
    where: { id_external_doc },
  })
}
