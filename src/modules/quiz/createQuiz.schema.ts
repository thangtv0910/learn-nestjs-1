import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const QUIZES = 'quizes';

@Schema()
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, length: 3 })
  description: string;
}

export type QuizDocument = Quiz & Document;
export const QuizSchema = SchemaFactory.createForClass(Quiz);
