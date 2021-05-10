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
     "dist/entity/**/*.{ts,js}"
   ],
   "migrations": [
      "dist/migration/**/*.js"
   ],
   "subscribers": [
      "dist/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
