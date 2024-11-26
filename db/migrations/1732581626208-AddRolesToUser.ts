import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesToUser1732581626208 implements MigrationInterface {
    name = 'AddRolesToUser1732581626208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "roles" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "roles"`);
    }

}
