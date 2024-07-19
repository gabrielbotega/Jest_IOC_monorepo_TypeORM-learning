import { MigrationInterface, QueryRunner } from "typeorm";

export class UserImproveRequirements1721258706681 implements MigrationInterface {
    name = 'UserImproveRequirements1721258706681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
