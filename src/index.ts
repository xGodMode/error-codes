class CustomError extends Error {
    public readonly code: string
    public readonly timestamp: number
    public readonly metadata: { [key: string]: any }

    constructor(name: string, code: string, metadata?: any, ...params: any) {
        super(...params)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.name = name
        this.code = code
        this.timestamp = Date.now()
        this.metadata = metadata
    }
}

export const GMError = (options: {
    subCode?: string
    message?: string
    baseError?: Error
}): CustomError => {
    return new CustomError(
        'GMError',
        `GM${options.subCode || ''}`,
        { baseError: options.baseError },
        options.message
    )
}

export const HTTPError = (
    statusCode?: number,
    message?: string
): CustomError => {
    const code = statusCode ? `HTTP${statusCode}` : `HTTP0`
    return new CustomError('HTTPError', code, { statusCode }, message)
}

export const CAIPNetworkError = (options: {
    subCode?: string
    message?: string
}): CustomError => {
    return new CustomError(
        'CAIPNetworkError',
        `CAIP_N${options.subCode || ''}`,
        null,
        options.message
    )
}

export const ProtocolError = (options: {
    subCode?: string
    message?: string
}): CustomError => {
    return new CustomError(
        'ProtocolError',
        `PROTO${options.subCode || ''}`,
        null,
        options.message
    )
}
