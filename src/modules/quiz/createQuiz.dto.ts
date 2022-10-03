import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @Length(3)
  description: string;
}
