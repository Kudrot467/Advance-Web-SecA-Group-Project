import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { DepositMoneyService } from 'src/deposit-money/deposit-money.service';
import { AllUser } from 'src/all-user/entities/all-user.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Deposits')
@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositMoneyService) {}

  @Post()
  async deposit(
    @Body()
    body: {
      email: string;
      amount: number;
      method: string;
      trxId: string;
      // action: string;
    },
    @CurrentUser() currentUser: AllUser,
  ) {
    const { email, amount, method, trxId } = body;
    const allowedMethods = ['bKash', 'Nagad', 'Bank account'];
    if (method && !allowedMethods.includes(method)) {
      throw new BadRequestException('Wrong method selected');
    }
    try {
      const deposit = await this.depositService.deposit(
        email,
        amount,
        method,
        trxId,
        // action,
      );
      return { message: 'Deposit successful', deposit };
    } catch (error) {
      return { error: error.message };
    }
  }
}
