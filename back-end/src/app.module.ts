import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AllUsersModule } from './all-user/all-user.module';
import config from '../ormconfig'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyModule } from './agency/agency.module';
import { BookingModule } from './booking/booking.module';
import { FaqModule } from './faq/faq.module';
import { ReviewModule } from './review/review.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CurrencyConverterModule } from './currency-converter/currency-converter.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { DepositMoneyModule } from './deposit-money/deposit-money.module';
import { PaymentModule } from './payment/payment.module';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import { AboutModule } from './about/about.module';

@Module({
  imports: [
    AuthModule,
    AllUsersModule,
    TypeOrmModule.forRoot(config),
    AgencyModule,
    BookingModule,
    FaqModule,
    ReviewModule,
    CommentsModule,
    PostsModule,
    WishlistModule,
    CurrencyConverterModule,
    AdminModule,
    UsersModule,
    DepositMoneyModule,
    PaymentModule,
    TransactionHistoryModule,
    AboutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
