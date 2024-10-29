import mongoose from 'mongoose'

const uri =
  'mongodb+srv://ClinicoApp:nUhejEkPu4VwOT63@cluster.tgawk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster'
// const uri = 'mongodb://localhost/clinico-app'
mongoose.connect(uri)
/**
 * @type {mongoose.mongo.GridFSBucket}
 */
export let gridfsBucket
mongoose.connection.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  })
})
