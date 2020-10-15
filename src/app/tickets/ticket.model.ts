import { Project } from '../projects/project.model';
import {User} from '../users/user.model'

export class Ticket {
    id?: number;
    title: string;
    bugDescription: string;
    resolutionSummary: string;
    createdDate: Date;
    status: string;
    priority: string;
    assignee?: User = new User();
    assigner?: User = new User();
    project: Project = new Project();
    comments?: any;
}