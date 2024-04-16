import dotenv from 'dotenv'

dotenv.config()
let PORT =  process.env.PORT || 3001
let MONGODB_URI = process.env.MONGODB_URI

export default {
    MONGODB_URI,
    PORT
}