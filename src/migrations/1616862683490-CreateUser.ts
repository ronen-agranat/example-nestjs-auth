import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1616862683490 implements MigrationInterface {
  name = 'CreateUser1616862683490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(50) NOT NULL, `hashedPassword` varchar(500) NOT NULL, `currentHashedRefreshToken` varchar(255) NULL, `name` varchar(50) NOT NULL, `isAdmin` tinyint NOT NULL, `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`',
    );
    await queryRunner.query('DROP TABLE `user`');
  }
}
