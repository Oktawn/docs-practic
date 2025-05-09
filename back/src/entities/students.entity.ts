import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ProfileStudyingType } from '../commons/types/types';
import { PracticsStyleEnum, PracticsTypeEnum } from '../commons/enums/practics.enum';

@Entity('students')
export class StudentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  fullName: string;

  @Column()
  profileType: ProfileStudyingType;

  @Column()
  profile: string;

  @Column()
  specialization: string;

  @Column({ type: 'varchar', nullable: false })
  groups: string;

  @Column({ type: 'varchar', nullable: false })
  kyrs: string;

  @Column({ type: "enum", enum: PracticsStyleEnum, default: PracticsStyleEnum.PR })
  practicStyle: PracticsStyleEnum;

  @Column({ type: "enum", enum: PracticsTypeEnum, default: PracticsTypeEnum.TECH })
  practicType: PracticsTypeEnum;

  @Column()
  orgName: string;

  @Column({ type: 'varchar', nullable: false })
  dateStart: string;

  @Column({ type: 'varchar', nullable: false })
  dateEnd: string;
}