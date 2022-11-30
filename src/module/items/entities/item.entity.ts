import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { Vote } from 'src/module/vote/entities/vote.entity'
import { Poll } from 'src/module/poll/entity/poll.entity'
 
@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar'})
    image: string

    @Column()
    age: number

    @Column({ type: 'text'})
    content: string

    @Column({ type: 'varchar'})
    adress: string

    @Column({ type: 'text', nullable: true})
    other: string

    @Column({unique: true})
    phone: number

    @Column({ type: 'tinyint'})
    status: number

    @ManyToOne(()=>  Poll, (poll) => poll.id)
    poll: Poll;
    
    @OneToMany(()=> Vote, (vote) => vote.id)
    vote: Vote[];
    
    @Column({ type: 'datetime',   default: () => 'NOW()' })
    created_at: Date; 

    @Column({ type: 'datetime', nullable: true })
    update_at: Date;

    @Column({ type: 'datetime', nullable: true })
    delete_at: Date;

}
 