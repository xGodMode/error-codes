interface CustomError {
    timestamp: Date
    name: string
    code: string
    metadata?: { [key: string]: any }
    message?: string
    stack: any
}

function CustomError(
    name: string,
    code: string,
    metadata?: { [key: string]: any },
    message?: string
): CustomError {
    const instance = metadata?.baseError || new Error(message)

    instance.name = name
    instance.code = code
    instance.timestamp = new Date()
    instance.metadata = metadata
    if (metadata?.baseError) {
        // Remove circular object
        delete instance.metadata.baseError
    }

    Object.setPrototypeOf(instance, Object.getPrototypeOf(instance))
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, CustomError)
    }

    return instance
}

CustomError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true,
    },
})

if (Object.setPrototypeOf) {
    Object.setPrototypeOf(CustomError, Error)
} else {
    CustomError.__proto__ = Error
}

export const GMError = (options: {
    subCode?: string
    message?: string
    baseError?: Error
}): CustomError => {
    return CustomError(
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
    return CustomError('HTTPError', code, { statusCode }, message)
}

export const CAIPNetworkError = (options: {
    subCode?: string
    message?: string
}): CustomError => {
    return CustomError(
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
    return CustomError(
        'ProtocolError',
        `PROTO${options.subCode || ''}`,
        null,
        options.message
    )
}
