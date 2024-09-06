import { mongoose } from 'mongoose'

mongoose.connect('mongodb://localhost/clinico-app').catch((err) => console.log(err))
