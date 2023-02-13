import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatusDocument = HydratedDocument<Status>;

@Schema({
  timestamps: true,
})
export class Status {
  @Prop()
  user: string;

  @Prop()
  status: string;

  @Prop()
  password: number;

  @Prop()
  code: string;

  @Prop()
  report: number;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
