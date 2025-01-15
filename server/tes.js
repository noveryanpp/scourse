import mongoose from 'mongoose'

const uri = "mongodb+srv://zhendevss:atrOF5EhdxsUN7Pb@scourse.f4ls5.mongodb.net/scourse?retryWrites=true&w=majority"

async function testConnection() {
  try {
    console.log('Attempting to connect...')
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected successfully!')
    
    const testSchema = new mongoose.Schema({ name: String })
    const Test = mongoose.model('Test', testSchema)
    
    const test = new Test({ name: 'test' })
    await test.save()
    console.log('Test document created!')
    
    const found = await Test.findOne({ name: 'test' })
    console.log('Found document:', found)
    
    await mongoose.connection.close()
    console.log('Connection closed')
  } catch (error) {
    console.error('Error:', error)
  }
}

testConnection()