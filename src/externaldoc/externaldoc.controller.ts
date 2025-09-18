import type { Request, Response } from 'express'
import { NotFoundError } from '../shared/shared.http.error'
import * as externalDocUseCase from './externaldoc.usecase'

const getExternalDocs = async (_req: Request, res: Response): Promise<void> => {
  const externalDocs = await externalDocUseCase.getExternalDocs()
  res.status(200).json(externalDocs)
}

const getExternalDocById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const externalDoc = await externalDocUseCase.getExternalDocById(Number(id))
  if (!externalDoc) throw new NotFoundError('External Document not found')
  res.status(200).json(externalDoc)
}

const createExternalDoc = async (req: Request, res: Response): Promise<void> => {
  const { tipe_document, url_file, status } = req.body
  const externalDoc = await externalDocUseCase.createExternalDoc({
    tipe_document,
    url_file,
    status,
  })
  res.status(201).json(externalDoc)
}

const updateExternalDoc = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { tipe_document, url_file, status } = req.body
  const externalDoc = await externalDocUseCase.updateExternalDoc(Number(id), {
    tipe_document,
    url_file,
    status,
  })
  if (!externalDoc) throw new NotFoundError('External Document not found')
  res.status(200).json(externalDoc)
}

const deleteExternalDoc = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const externalDoc = await externalDocUseCase.deleteExternalDoc(Number(id))
  if (!externalDoc) throw new NotFoundError('External Document not found')
  res.status(200).json(externalDoc)
}

export {
  getExternalDocs,
  getExternalDocById,
  createExternalDoc,
  updateExternalDoc,
  deleteExternalDoc,
}
