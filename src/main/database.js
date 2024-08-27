export default function dbConnection() {
  const mongoose = require('mongoose')

  mongoose
    .connect('mongodb://localhost/clinico-app')
    .then((db) => console.log('DB is connected'))
    .catch((err) => console.log(err))
}
