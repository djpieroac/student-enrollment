import type { NextFunction, Request, Response } from 'express'

interface CustomError extends Error {
  status?: number
}

const errorMiddleware = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  res.status(status).json({
    message,
    status,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })
}

export default errorMiddleware
