import { MigrationInterface, QueryRunner } from "typeorm";

export class Invoice1714943631023 implements MigrationInterface {
    name = 'Invoice1714943631023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business"."invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying(1) NOT NULL, "session_id" character varying NOT NULL, "price" double precision NOT NULL, "tenant_id" uuid NOT NULL, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "business"."invoices" ADD CONSTRAINT "FK_440f531f452dcc4389d201b9d4b" FOREIGN KEY ("tenant_id") REFERENCES "auth"."tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business"."invoices" DROP CONSTRAINT "FK_440f531f452dcc4389d201b9d4b"`);
        await queryRunner.query(`DROP TABLE "business"."invoices"`);
    }

}
