import type { Request, Response } from 'express'

import {
  ACCESS_TOKEN_MINUTE_SIGN_NOMINAL,
  REFRESH_TOKEN_MINUTE_SIGN_NOMINAL,
} from '../shared/shared.constants'
import type { CreateUserInput } from '../users/user.usecase'
import * as authUserCase from './auth.usecase'

interface TokenData {
  accessToken: string
  refreshToken: string
  userId: number
}

interface LoginRequest {
  email: string
  password: string
}

type SignupRequest = Omit<CreateUserInput, 'role'>

interface MessageResponse {
  message: string
}

const applyTokens = (res: Response, { accessToken, refreshToken, userId }: TokenData): void => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: ACCESS_TOKEN_MINUTE_SIGN_NOMINAL,
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: REFRESH_TOKEN_MINUTE_SIGN_NOMINAL,
  })

  res.cookie('userId', userId, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: REFRESH_TOKEN_MINUTE_SIGN_NOMINAL,
  })
}

const login = async (
  req: Request<Record<string, never>, Record<string, unknown>, LoginRequest>,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body
  const user = await authUserCase.login(email, password)
  const { accessToken, refreshToken, ...userData } = user

  applyTokens(res, { accessToken, refreshToken, userId: userData.userId })

  res.json(userData)
}

const refresh = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken: refreshTokenBefore } = req.cookies

  const { accessToken, refreshToken, userId } = await authUserCase.refreshToken(refreshTokenBefore)

  applyTokens(res, { accessToken, refreshToken, userId })

  res.json({ message: 'ok' } as MessageResponse)
}

const logout = (_req: Request, res: Response): void => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.clearCookie('userId')

  res.json({ message: 'ok' } as MessageResponse)
}

const signup = async (
  req: Request<Record<string, never>, Record<string, unknown>, SignupRequest>,
  res: Response,
): Promise<void> => {
  const userData: CreateUserInput = {
    ...req.body,
    role: 'user',
  }
  await authUserCase.signup(userData)

  res.json({ message: 'ok' } as MessageResponse)
}

export { login, refresh, logout, signup }
