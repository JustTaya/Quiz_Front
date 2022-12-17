import { StatusType } from "./status-type.enum";
import { Question } from './question.model';

export class Quiz {
  id: string;
  name: string;
  author: string;
  category_id: string;
  date: Date;
  image: String;//byte array
  description: string;
  status: StatusType;
  modificationTime: Date;
  category: string;
  modification_time: Date;
  favorite: boolean;
  tags: string[];
  questions: Question[];
}
