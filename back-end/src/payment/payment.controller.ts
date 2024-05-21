import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async payment(
    @Body()
    body: {
      email: string;
      amount: number;
      method: string;
      trxId: string;
      // action: string;
    },
  ) {
    const { email, amount, method, trxId } = body;
    const allowedMethods = [''];
    if (method && !allowedMethods.includes(method)) {
      throw new BadRequestException('Wrong method selected');
    }
    try {
      const payment = await this.paymentService.payment(
        email,
        amount,
        method,
        trxId,
        // action,
      );
      return { message: 'Payment successful', payment };
    } catch (error) {
      return { error: error.message };
    }
  }
}
