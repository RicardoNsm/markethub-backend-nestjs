import { Test, TestingModule } from '@nestjs/testing';
import { ShopeeController } from './shopee.controller';
import { ShopeeService } from './shopee.service';

describe('ShopeeController', () => {
  let controller: ShopeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopeeController],
      providers: [
        {
          provide: ShopeeService,
          useValue: {
            getConversions: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShopeeController>(ShopeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
