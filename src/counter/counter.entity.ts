import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('counters', { schema: 'public' })
export class CounterEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { nullable: true })
  target: string | null;

  @Column('integer', { nullable: true })
  destroyed: number | null;

  @Column('integer', { nullable: true })
  wounded: number | null;

  @Column('integer', { nullable: true })
  machinery: number | null;

  @Column('integer', { nullable: true })
  ammunition: number | null;

  @Column('character varying', { nullable: true })
  coordinates: string | null;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
