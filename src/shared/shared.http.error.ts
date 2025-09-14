class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    Error.captureStackTrace(this, this.constructor)
  }
}

class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
  }
}

class NotFoundError extends HttpError {
  constructor(message: string = 'Not Found') {
    super(message, 404)
  }
}

export { HttpError, UnauthorizedError, NotFoundError }
