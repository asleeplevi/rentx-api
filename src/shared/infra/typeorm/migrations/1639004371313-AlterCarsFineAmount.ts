import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterCarsFineAmount1639004371313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('cars', 'file_amount', 'fine_amount')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('cars', 'fine_amount', 'file_amount')
  }
}
