module.exports = {
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "jamie",
   "password": "test",
   "database": "lireddit",
   "synchronize": true,
   "logging": false,
   "entities": [
      "dist/entity**/*.entity.js"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
