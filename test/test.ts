import { GMError } from '../src'

import chai, { expect } from 'chai'
import spies from 'chai-spies'
chai.config.includeStack = true
chai.use(spies)

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
    it('should show base error message when stringified', () => {
        const message = 'Base error message'
        const baseError = SyntaxError(message)
        const error = GMError({ baseError })
        expect(String(error)).to.contain(message)
    })
    it('should concatenate message with base error message', () => {
        const baseErrorMessage = 'Base error message'
        const baseError = SyntaxError(baseErrorMessage)
        const error = GMError({ message: 'Before the base.', baseError })
        expect(String(error)).to.contain('Before the base.')
        expect(String(error)).to.contain(baseErrorMessage)
    })
})
