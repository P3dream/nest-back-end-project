import { MigrationInterface, QueryRunner } from "typeorm";

export class Professionals1710202551523 implements MigrationInterface {
    name = 'Professionals1710202551523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Professional" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "telephone" character varying NOT NULL, "documentNumber" character varying NOT NULL, "cpf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_7800fb502aefe6d786fe24d1eee" UNIQUE ("documentNumber"), CONSTRAINT "UQ_f247b0ab710eb3dd533d1b1682f" UNIQUE ("cpf"), CONSTRAINT "PK_2ac6b4dd06551883863b1917114" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Professional"`);
    }

}
