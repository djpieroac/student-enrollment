import type { Request, Response } from 'express'
import { NotFoundError } from '../shared/shared.http.error'
import * as legalRepresentativeUseCase from './legalrepresentative.usecase'

const getLegalRepresentatives = async (_req: Request, res: Response): Promise<void> => {
  const legalRepresentatives = await legalRepresentativeUseCase.getLegalRepresentatives()
  res.status(200).json(legalRepresentatives)
}

const getLegalRepresentativeById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const legalRepresentative = await legalRepresentativeUseCase.getLegalRepresentativeById(
    Number(id),
  )
  if (!legalRepresentative) throw new NotFoundError('Representante legal no encontrado')
  res.status(200).json(legalRepresentative)
}

const createdLegalRepresentative = async (req: Request, res: Response): Promise<void> => {
  const { family_relationship, id_profile } = req.body
  const legalRepresentative = await legalRepresentativeUseCase.createLegalRepresentative({
    family_relationship,
    id_profile,
  })
  res.status(201).json(legalRepresentative)
}

const updateLegalRepresentative = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { family_relationship, id_profile } = req.body
  const legalRepresentative = await legalRepresentativeUseCase.updateLegalRepresentative(
    Number(id),
    {
      family_relationship,
      id_profile,
    },
  )
  if (!legalRepresentative) throw new NotFoundError('Representante legal no encontrado')
  res.status(200).json(legalRepresentative)
}

const deleteLegalRepresentative = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const legalRepresentative = await legalRepresentativeUseCase.deleteLegalRepresentative(Number(id))
  if (!legalRepresentative) throw new NotFoundError('Representante legal no encontrado')
  res.status(200).json(legalRepresentative)
}

export {
  getLegalRepresentatives,
  getLegalRepresentativeById,
  createdLegalRepresentative,
  updateLegalRepresentative,
  deleteLegalRepresentative,
}
