module.exports = {
   type: "postgres",
   host: "localhost",
   port: 5432,
   username: "jamie",
   password: "test",
   database: "lireddit",
   synchronize: true,
   logging: false,
   entities: [
      'src/entity/*.ts'
   ],
   migrations: [
      'src/database/migrations/*.ts'
   ],
   subscribers: [
      "'src/entity/*.ts'"
   ],
   cli: {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/database/migrations",
      "subscribersDir": "src/subscriber"
   }
}
