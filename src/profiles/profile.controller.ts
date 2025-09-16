import type { Request, Response } from 'express'
import { NotFoundError } from '../shared/shared.http.error'
import * as profileUseCase from './profiles.usercase'

const getProfiles = async (_req: Request, res: Response): Promise<void> => {
  const profiles = await profileUseCase.getProfiles()
  res.status(200).json(profiles)
}
const getProfileById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const profile = await profileUseCase.getProfileById(Number(id))
  if (!profile) {
    throw new NotFoundError('Profile not found')
  }
  res.status(200).json(profile)
}

const createdProfile = async (req: Request, res: Response): Promise<void> => {
  const { DNI, name, lastname, date_birthday, national, phone, addres, sex, status, id_user } =
    req.body
  const profile = await profileUseCase.createProfile({
    DNI,
    name,
    lastname,
    date_birthday,
    national,
    phone,
    addres,
    sex,
    status,
    id_user,
  })
  res.status(201).json(profile)
}

const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { DNI, name, lastname, date_birthday, national, phone, addres, sex, status, id_user } =
    req.body
  const profile = await profileUseCase.updateProfile(Number(id), {
    DNI,
    name,
    lastname,
    date_birthday,
    national,
    phone,
    addres,
    sex,
    status,
    id_user,
  })
  if (!profile) {
    throw new NotFoundError('Profile not found')
  }
  res.status(200).json(profile)
}
const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const profile = await profileUseCase.deleteProfile(Number(id))
  if (!profile) {
    throw new NotFoundError('Profile not found')
  }
  res.status(200).json({ message: 'Profile deleted successfully' })
}

export { getProfiles, getProfileById, createdProfile, updateProfile, deleteProfile }
