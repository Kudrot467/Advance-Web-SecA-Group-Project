import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async payment(
    email: string,
    amount: number,
    method: string,
    trxId: string,
    // action: string,
  ): Promise<Payment> {
    const payment = new Payment();
    payment.email = email;
    payment.amount = amount;
    payment.method = method;
    payment.trxId = trxId;
    // deposit.action = action;
    return await this.paymentRepository.save(payment);
  }
}
