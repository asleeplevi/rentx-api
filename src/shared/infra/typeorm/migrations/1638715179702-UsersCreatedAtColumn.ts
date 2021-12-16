import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UsersCreatedAtColumn1638715179702 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'datetime')
  }
}
