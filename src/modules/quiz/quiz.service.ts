import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Quiz with ${id} is not valid!`);
    }

    const getQuiz = await this.createQuizModel.findOne({ _id: id }).exec();

    if (!getQuiz) {
      throw new NotFoundException(`Quiz with ${id} not found`);
    }

    return getQuiz;
  }

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const createQuiz = new this.createQuizModel(createQuizDto);
    return await createQuiz.save();
  }

  async updateQuiz(id: string, updateQuizDto: CreateQuizDto): Promise<Quiz> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Quiz with ${id} is not valid!`);
    }

    const updateQuiz = await this.createQuizModel.findByIdAndUpdate(
      id,
      updateQuizDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateQuiz) {
      throw new NotFoundException(`Quiz with ${id} not found`);
    }

    return updateQuiz;
  }

  async deleteQuiz(id: string): Promise<Quiz> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Quiz with ${id} is not valid!`);
    }

    const deleteQuiz = await this.createQuizModel.findByIdAndRemove(id);

    if (!deleteQuiz) {
      throw new NotFoundException(`Quiz with ${id} not found`);
    }

    return deleteQuiz;
  }
}
