import { Test, TestingModule } from '@nestjs/testing';
import { ShopeeService } from './shopee.service';

describe('ShopeeService', () => {
  let service: ShopeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopeeService],
    }).compile();

    service = module.get<ShopeeService>(ShopeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
