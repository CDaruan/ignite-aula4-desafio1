import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterColumnStatementType1622513102919 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn("statements", "type", new TableColumn({
      name: 'type',
      type: 'enum',
      enum: ['deposit', 'withdraw', 'transfer', 'transfer_received']
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn("statements", "type", new TableColumn({
      name: 'type',
      type: 'enum',
      enum: ['deposit', 'withdraw']
    }))
  }

}
