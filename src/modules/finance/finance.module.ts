import { Module } from '@nestjs/common'
import { FinanceService } from './finance.service'

@Module({
  providers: [FinanceService],
})
export class FinanceModule {}
