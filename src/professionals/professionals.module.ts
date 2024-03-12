import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professional])],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
})
export class ProfessionalsModule {}
