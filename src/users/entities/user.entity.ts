import { ApiTags } from "@nestjs/swagger";
import { UUID } from "crypto";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('User')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    username : string;
    
    @Column()
    password : string;

    @Column({ type: 'simple-array' })
    roles: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deletedAt :  Date;
}
