import dotenv from 'dotenv'

dotenv.config()
const keys = Object.keys(process.env)
let parsedEnvConfig = {}
for (const key of keys) {
    const value = process.env[key]
    let parsedValue: any
    if (value?.toLowerCase() === 'true') {
        // true
        parsedValue = true
    } else if (value?.toLowerCase() === 'false') {
        // false
        parsedValue = false
    } else {
        parsedValue = value
    }

    parsedEnvConfig = { ...parsedEnvConfig, [key]: parsedValue }
}
export default parsedEnvConfig as typeof process.env
