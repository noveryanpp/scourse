import mongoose from 'mongoose'

const uri = "mongodb+srv://zhendevss:atrOF5EhdxsUN7Pb@scourse.f4ls5.mongodb.net/scourse?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...')
    
    const conn = await mongoose.connect(uri)
    
    await new Promise((resolve) => {
      mongoose.connection.once('connected', () => {
        console.log('MongoDB Connected!')
        resolve()
      })
    })

    const db = mongoose.connection.db
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["username", "email", "password", "fullName"],
          properties: {
            username: { bsonType: "string" },
            email: { bsonType: "string" },
            password: { bsonType: "string" },
            fullName: { bsonType: "string" }
          }
        }
      }
    })

    console.log('Users collection created')
    return conn
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

export { connectDB }