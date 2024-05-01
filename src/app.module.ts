import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard'; // A importação da sua guarda personalizada está correta
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule, UsersModule, ProfessionalsModule],
  controllers: [],
  providers: [
    AppService,
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
   }
  ],
})
export class AppModule {}