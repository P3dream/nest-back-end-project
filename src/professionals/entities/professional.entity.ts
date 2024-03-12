import { UUID } from "crypto"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('Professional')
export class Professional {
    @PrimaryGeneratedColumn('uuid')
    id : UUID

    @Column()
    name : string
    
    @Column()
    telephone? : string

    @Column({ unique: true })
    documentNumber : string

    @Column({ unique: true })
    cpf : string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deletedAt :  Date;
}
