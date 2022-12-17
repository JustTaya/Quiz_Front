import { Tag } from './tag.model';
import { Question } from './question.model';

export interface Quiz {
    id: number;
    name: string;
    author: number;
    category_id: number;
    date: string;
    description: string;
    status: string;
    modification_time: string;
    questions: Question[];
    image: string;
    tags: Tag[];
    changed: boolean;
}