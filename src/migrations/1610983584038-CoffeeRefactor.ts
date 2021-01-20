import {MigrationInterface, QueryRunner} from "typeorm";

export class CoffeeRefactor1610983584038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        alter table coffees RENAME column name to title;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
