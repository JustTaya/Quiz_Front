import {Role} from "./role.enum";
import {Gender} from "./gender.enum";
import {NotificationStatus} from "./notification-status.enum";


export class User {
  token?: string;

  id: string;
  email: string;
  password: string;
  role: Role;
  name: string;
  surname: string;
  image: any;
  birthdate: Date;
  gender: Gender;
  countryId: string;
  city: string;
  rating: string;
  about: string;
  notificationStatus: NotificationStatus;


  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }
}
