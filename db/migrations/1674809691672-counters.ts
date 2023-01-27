import { MigrationInterface, QueryRunner } from 'typeorm';

export class counters1674809691672 implements MigrationInterface {
  name = 'counters1674809691672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "counters" ("id" SERIAL NOT NULL, "target" character varying, "destroyed" integer, "wounded" integer, "machinery" integer, "ammunition" integer, "coordinates" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_910bfcbadea9cde6397e0daf996" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "counters"`);
  }
}
