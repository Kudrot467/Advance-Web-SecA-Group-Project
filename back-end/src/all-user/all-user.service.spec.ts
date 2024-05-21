import { Test, TestingModule } from '@nestjs/testing';
import { AllUserService } from './all-user.service';

describe('AllUserService', () => {
  let service: AllUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllUserService],
    }).compile();

    service = module.get<AllUserService>(AllUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
