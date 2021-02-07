import * as chai from 'chai'

export default {
    configure(): void {
        chai.config.includeStack = true
    },
    expect: chai.expect,
}
