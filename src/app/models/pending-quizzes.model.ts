import {StatusType} from './status-type.enum';

export interface Quiz {
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
  moderatorComment: string;
}

