import { Controller, Get } from '@nestjs/common';
import { ShopeeService } from './shopee.service';

@Controller({
    path: 'shopee',
    version: '1'
})


export class ShopeeController {
    constructor(
        private readonly shopeeService: ShopeeService,
    ) {}

    @Get('test-conversions')
  async testConversions() {
   const endDate = new Date();

const startDate = new Date();
startDate.setDate(startDate.getDate() - 3);

const conversions = await this.shopeeService.getConversions(
  startDate,
  endDate,
);

return conversions;
  }
}
