import { Module } from '@nestjs/common';
import { ShopeeService } from './shopee.service';
import { ShopeeController } from './shopee.controller';

@Module({
  exports:[ShopeeService],
  providers: [ShopeeService],
  controllers: [ShopeeController]
})
export class ShopeeModule {}
