import { PartialType } from '@nestjs/swagger';
import { CreateDepositMoneyDto } from './create-deposit-money.dto';

export class UpdateDepositMoneyDto extends PartialType(CreateDepositMoneyDto) {}
