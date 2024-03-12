import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProfessionalsModule } from './professionals/professionals.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, ProfessionalsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}