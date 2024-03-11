import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}