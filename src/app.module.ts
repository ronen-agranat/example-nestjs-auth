import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseConfig from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
