import { Test, TestingModule } from '@nestjs/testing';
import { AllUserController } from './all-user.controller';
import { AllUserService } from './all-user.service';

describe('AllUserController', () => {
  let controller: AllUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllUserController],
      providers: [AllUserService],
    }).compile();

    controller = module.get<AllUserController>(AllUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
