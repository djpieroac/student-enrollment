import type { NextFunction, Request, Response } from 'express'
import { type TokenPayload, validAccessToken } from '../auth/auth.credential'
import { UnauthorizedError } from '../shared/shared.http.error'

const EXEMPT_ENDPOINTS = ['/api/auth/login', '/api/auth/refresh', '/api/auth/signup']

interface RequestWithUser extends Request {
  user?: TokenPayload
}

export function authBearer(req: RequestWithUser, _res: Response, next: NextFunction): void {
  if (EXEMPT_ENDPOINTS.includes(req.path)) {
    next()
    return
  }

  const { accessToken } = req.cookies
  console.log(accessToken)
  if (!accessToken) {
    throw new UnauthorizedError('No token provided')
  }

  const user = validAccessToken(accessToken)

  if (!user) {
    throw new UnauthorizedError('Invalid token')
  }

  req.user = user
  next()
}
