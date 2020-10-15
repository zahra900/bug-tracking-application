import {User} from '../users/user.model'

export class Comment{
    id?: number;
    message: string;
    createdAt: Date;
    commenter?: User = new User();
}