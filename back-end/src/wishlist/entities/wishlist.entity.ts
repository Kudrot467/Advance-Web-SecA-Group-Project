import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AllUser } from 'src/all-user/entities/all-user.entity';

@Entity('wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    type: 'room' | 'flight' | 'vehicle';

    @Column({nullable:false})
    itemId: number;

    @ManyToOne(() => AllUser)
    @JoinColumn({ name: 'userId' })
    user: AllUser;

    @Column({nullable:false})
    userId: number;
}
