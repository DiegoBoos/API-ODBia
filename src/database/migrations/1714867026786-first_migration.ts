import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1714867026786 implements MigrationInterface {
    name = 'FirstMigration1714867026786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business"."services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "rate" double precision NOT NULL, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "tenant_id" uuid NOT NULL, "created_at" date NOT NULL, "last_password_changed_date" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(100) NOT NULL, "created_at" date NOT NULL, CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "business"."suscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cash" double precision NOT NULL DEFAULT '0', "received_date" date, "expiration_date" date, "tenant_id" uuid NOT NULL, CONSTRAINT "PK_bd4d306710ee28dcca9a84638aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "business"."usages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "service_id" uuid NOT NULL, "suscription_id" uuid NOT NULL, "units" integer NOT NULL, "cost" double precision NOT NULL, CONSTRAINT "PK_75c9a59a186b326ad102170e0a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_109638590074998bb72a2f2cf08" FOREIGN KEY ("tenant_id") REFERENCES "auth"."tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business"."suscriptions" ADD CONSTRAINT "FK_d0d41e36d8b7dc2d43ba0600497" FOREIGN KEY ("tenant_id") REFERENCES "auth"."tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business"."usages" ADD CONSTRAINT "FK_cd9a85cea5c6ea918a3a225aff6" FOREIGN KEY ("service_id") REFERENCES "business"."services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business"."usages" ADD CONSTRAINT "FK_fd8b77efffd435d29a99c7d0085" FOREIGN KEY ("suscription_id") REFERENCES "business"."suscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business"."usages" DROP CONSTRAINT "FK_fd8b77efffd435d29a99c7d0085"`);
        await queryRunner.query(`ALTER TABLE "business"."usages" DROP CONSTRAINT "FK_cd9a85cea5c6ea918a3a225aff6"`);
        await queryRunner.query(`ALTER TABLE "business"."suscriptions" DROP CONSTRAINT "FK_d0d41e36d8b7dc2d43ba0600497"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_109638590074998bb72a2f2cf08"`);
        await queryRunner.query(`DROP TABLE "business"."usages"`);
        await queryRunner.query(`DROP TABLE "business"."suscriptions"`);
        await queryRunner.query(`DROP TABLE "auth"."tenants"`);
        await queryRunner.query(`DROP TABLE "auth"."users"`);
        await queryRunner.query(`DROP TABLE "business"."services"`);
    }

}
