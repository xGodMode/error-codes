import { GMError } from '../src'

import chai from './utils/chai'

chai.configure()
const { expect } = chai

describe('GMError', () => {
    it('should include name, code, timestamp, and metadata', () => {
        const baseError = TypeError('Base error')
        const error = GMError({ baseError })
        expect(error.name).to.equal('GMError')
        expect(error.code).to.equal('GM')
        // The error timestamp should be within the same second as the test
        const now = new Date()
        expect(error.timestamp.getSeconds()).to.equal(now.getSeconds())
        expect(error.metadata).to.deep.equal({})
    })
    it('should optionally include message', () => {
        const message = 'This is an error'
        const error = GMError({ message })
        expect(error.message).to.equal(message)
    })
    it('should include stacktrace of base error', () => {
        const baseError = TypeError('The base error')
        const error = GMError({ message: 'The not base error', baseError })
        expect(error.stack).to.deep.equal(baseError.stack)
    })
})
