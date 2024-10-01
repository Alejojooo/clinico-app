import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/clinico-app')
/**
 * @type {mongoose.mongo.GridFSBucket}
 */
export let gridfsBucket
mongoose.connection.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  })
})
