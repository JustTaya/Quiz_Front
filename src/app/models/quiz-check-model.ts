import {StatusType} from './status-type.enum';
import {QuestionCheckModel} from './question-check.model';

export class QuizCheckModel {
  id: number;
  name: string;
  author: number;
  category: string;
  date: string;
  description: string;
  status: StatusType;
  modificationTime: string;
  authorName: string;
  authorSurname: string;
  authorEmail: string;
  questions: QuestionCheckModel [];
}
