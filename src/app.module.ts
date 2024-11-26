// app.module.ts
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard'; // Importe o AuthGuard aqui
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    ProfessionalsModule,
    PatientsModule,
    AppointmentsModule
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Aplica o AuthGuard globalmente
    }
  ],
})
export class AppModule {}
