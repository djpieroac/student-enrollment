import jwt from 'jsonwebtoken'
import type { User } from '../../prisma/generated/client/index.js'
import {
  ACCESS_TOKEN_MINUTE_SIGN_RELATIVE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_MINUTE_SIGN_RELATIVE,
  REFRESH_TOKEN_SECRET,
} from '../shared/shared.constants'

type UserAuth = Pick<User, 'id' | 'email' | 'role'>

export interface TokenPayload {
  userId: number
  email: string
  role: string
}

const getAccessToken = (user: UserAuth): string => {
  if (!user) throw new Error('usuario requerido')

  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_MINUTE_SIGN_RELATIVE,
    },
  )

  return accessToken
}

const validAccessToken = (accessToken: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as TokenPayload
    return decoded
  } catch {
    return null
  }
}

const getRefreshToken = (user: UserAuth): string => {
  if (!user) throw new Error('usuario requerido')

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_MINUTE_SIGN_RELATIVE,
    },
  )

  return refreshToken
}

const validRefreshToken = (refreshToken: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as TokenPayload
    return decoded
  } catch {
    return null
  }
}

export { getAccessToken, getRefreshToken, validAccessToken, validRefreshToken }
