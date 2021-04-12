import "reflect-metadata";
import { createConnection, QueryRunner } from "typeorm";

async () => {
     const connection = await createConnection();
     const queryRunner: QueryRunner = connection.createQueryRunner();

     await queryRunner.connect();
};
