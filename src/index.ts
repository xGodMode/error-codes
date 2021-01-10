class CustomError extends Error {
  public readonly code: string
  public readonly timestamp: number

  constructor(name: string, code: string, ...params: any) {
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.name = name
    this.code = code
    this.timestamp = Date.now()
  }
}

export const HTTPError = (statusCode?: number): CustomError => {
  const code = statusCode ? `HTTP${statusCode}` : `HTTP0`
  return new CustomError('HTTPError', code)
}
