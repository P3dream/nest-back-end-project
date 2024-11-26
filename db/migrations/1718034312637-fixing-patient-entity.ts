import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingPatientEntity1718034312637 implements MigrationInterface {
    name = 'FixingPatientEntity1718034312637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "socialName" character varying NOT NULL, "age" integer NOT NULL, "civilStatus" character varying NOT NULL, "nationality" character varying NOT NULL, "gender" character varying NOT NULL, "profession" character varying NOT NULL, "homeAddress" character varying NOT NULL, "covenantName" character varying NOT NULL, "covenantNumber" character varying NOT NULL, "professionalName" character varying NOT NULL, "color" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_c4f8df6be1b44e92e9d29b7e7f9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Patient"`);
    }

}
