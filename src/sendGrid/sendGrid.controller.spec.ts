import { Test, TestingModule } from '@nestjs/testing';
import { SendGridController } from './sendGrid.controller';

describe('SendGridController', () => {
  let controller: SendGridController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendGridController],
    }).compile();

    controller = module.get<SendGridController>(SendGridController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
