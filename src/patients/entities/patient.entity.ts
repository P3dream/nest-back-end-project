import { UUID } from "crypto"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('Patient')
export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id : UUID

    @Column()
    name : string
    
    @Column()
    socialName? : string

    @Column()
    age : number

    @Column()
    civilStatus : string

    @Column()
    nationality : string

    @Column()
    gender : string

    @Column()
    profession : string  

    @Column()
    homeAddress : string  

    @Column()
    covenantName : string  

    @Column()
    covenantNumber : string  

    @Column()
    professionalName : string  

    @Column()
    color : string  

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deletedAt :  Date;
}
