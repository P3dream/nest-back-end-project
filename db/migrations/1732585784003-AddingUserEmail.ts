import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingUserEmail1732585784003 implements MigrationInterface {
    name = 'AddingUserEmail1732585784003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "email"`);
    }

}
