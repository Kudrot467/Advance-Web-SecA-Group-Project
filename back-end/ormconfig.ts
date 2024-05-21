import { AllUser } from './src/all-user/entities/all-user.entity';
import { Room, Flight, Vehicle } from './src/agency/entities/agency.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Booking } from 'src/booking/entities/booking.entity';
import { faq } from 'src/faq/entities/faq.entity';
import { review } from 'src/review/entities/review.entity';
import { Rooms } from 'src/admin/entities/admin.entity';
import { DepositMoney } from 'src/deposit-money/entities/deposit-money.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { Payment } from 'src/payment/entities/payment.entity';


const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  entities: [
    AllUser,
    Room,
    Rooms,
    Flight,
    Vehicle,
    Booking,
    faq,
    review,
    DepositMoney,
    Post,
    Comment,
    Wishlist,
    Payment,
  ],
  synchronize: true,
};

export default config;
