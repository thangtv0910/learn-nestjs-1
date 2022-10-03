import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuizDto } from './createQuiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}
  @Get()
  getAllQuiz() {
    return this.quizService.getAllQuiz();
  }

  @Get(':id')
  getQuiz(@Param('id') id: string) {
    return this.quizService.getQuiz(id);
  }

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  createQuiz(@Body() quizData: CreateQuizDto) {
    return this.quizService.createQuiz(quizData);
  }

  @Put(':id')
  updateQuiz(@Param('id') id: string, @Body() quizData: CreateQuizDto) {
    return this.quizService.updateQuiz(id, quizData);
  }

  @Delete(':id')
  deleteQuiz(@Param('id') id: string) {
    return this.quizService.deleteQuiz(id);
  }
}
