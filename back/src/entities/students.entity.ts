import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('students')
export class StudentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  fullName: string;

  @Column()
  profileType: string;

  @Column()
  profile: string;

  @Column()
  specialization: string;

  @Column()
  groups: string;

  @Column({ type: 'varchar', nullable: false })
  kyrs: string;

  @Column()
  practicStyle: string;

  @Column()
  practicType: string;

  @Column()
  orgName: string;

  @Column()
  dateStart: string;

  @Column()
  dateEnd: string;
}