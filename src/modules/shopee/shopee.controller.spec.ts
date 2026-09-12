import { Test, TestingModule } from '@nestjs/testing';
import { ShopeeController } from './shopee.controller';

describe('ShopeeController', () => {
  let controller: ShopeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopeeController],
    }).compile();

    controller = module.get<ShopeeController>(ShopeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
