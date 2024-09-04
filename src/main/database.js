import { mongoose } from 'mongoose'

mongoose
  .connect('mongodb://localhost/clinico-app')
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.log(err))
