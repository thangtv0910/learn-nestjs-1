import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './createQuiz.dto';
import { Quiz, QuizDocument, QUIZES } from './createQuiz.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(QUIZES)
    private createQuizModel: Model<QuizDocument>,
  ) {}
  async getAllQuiz(): Promise<Quiz[]> {
    return await this.createQuizModel.find().exec();
  }

  async getQuiz(id: string): Promise<Quiz> {
    return await this.createQuizModel.findOne({ _id: id }).exec();
  }

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const createQuiz = new this.createQuizModel(createQuizDto);
    return await createQuiz.save();
  }

  async updateQuiz(id: string, updateQuizDto: CreateQuizDto): Promise<Quiz> {
    return await this.createQuizModel.findByIdAndUpdate(id, updateQuizDto);
  }

  async deleteQuiz(id: string): Promise<Quiz> {
    return await this.createQuizModel.findByIdAndRemove(id);
  }
}
