import Env from '@secjs/env'

import { Car, CarSchema } from 'app/Schemas/Car'
import { User, UserSchema } from 'app/Schemas/User'

const schemasPath = [
  { name: Car.name, schema: CarSchema },
  { name: User.name, schema: UserSchema },
]

const configurations = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env('DB_CONNECTION', 'mongo'),

  /*
  |--------------------------------------------------------------------------
  | MongoDb
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for Mongo database.
  |
  | npm i --save mongoose
  |
  */
  mongo: {
    connection: {
      url: `mongodb+srv://${Env('DB_USERNAME', 'root')}:${Env(
        'DB_PASSWORD',
        'root',
      )}@${Env('DB_HOST', '@cluster0.aejvg.mongodb.net')}/${Env(
        'DB_DATABASE',
        'mongodb',
      )}?retryWrites=true&w=majority`,
      options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    },
    schemas: schemasPath,
  },
}

const connection = configurations[configurations.connection].connection
const schemas = configurations[configurations.connection].schemas

export default { connection, schemas }
