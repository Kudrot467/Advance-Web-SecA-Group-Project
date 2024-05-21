import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    capacity: number;

    @Column()
    pricePerNight: number;

    @Column()
    username: string;
}

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    airline: string;

    @Column()
    departureDateTime: Date;

    @Column()
    arrivalDateTime: Date;

    @Column()
    origin: string;

    @Column()
    destination: string;

    @Column()
    price: number;

    @Column()
    username: string;
}

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    type: string;

    @Column()
    pricePerDay: number;

    @Column()
    username: string;
}
