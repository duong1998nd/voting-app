import { BaseEntity } from 'typeorm';
import { Vote } from '../../vote/entities/vote.entity';
import { UserRoles } from '../enum/user.enum';
export declare class User extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    image: string;
    phone: string;
    role: UserRoles;
    address: string;
    money: string;
    vote: Vote[];
    created_at: Date;
    update_at: Date;
    delete_at: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
