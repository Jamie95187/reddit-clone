import {MigrationInterface, QueryRunner} from "typeorm";

export class Name1618273031802 implements MigrationInterface {
    name = 'Name1618273031802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("_id" SERIAL NOT NULL, "createdAt" date NOT NULL, "updatedAt" date NOT NULL, "title" text NOT NULL, CONSTRAINT "PK_e4da8286ae74bb02b3856ec85a8" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "birthplace" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
