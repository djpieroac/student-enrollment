import { comparePassword } from '../lib/password'
import prisma from '../lib/prisma'
import { UnauthorizedError } from '../shared/shared.http.error'
import { type CreateUserInput, createUser } from '../users/user.usecase'
import { getAccessToken, getRefreshToken, validRefreshToken } from './auth.credential'

const messageError = 'Credenciales no validas'

const login = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) throw new UnauthorizedError(messageError)

  const valid = await comparePassword(password, user.password)
  if (!valid) throw new UnauthorizedError(messageError)

  return {
    userId: user.id,
    email: user.email,
    accessToken: getAccessToken(user),
    refreshToken: getRefreshToken(user),
  }
}

const refreshToken = async (refreshToken: string) => {
  const user = validRefreshToken(refreshToken)
  if (!user) throw new UnauthorizedError(messageError)

  const userAuth = { id: user.userId, email: user.email, role: user.role }

  return {
    accessToken: getAccessToken(userAuth),
    refreshToken: getRefreshToken(userAuth),
    userId: user.userId,
  }
}

const signup = async (data: CreateUserInput) => {
  await createUser(data)
}

export { login, refreshToken, signup }
