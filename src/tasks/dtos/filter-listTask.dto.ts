import { TaskStatus } from '../tasks.model';

export class filterTaskDto {
  status?: TaskStatus;
  search?: string;
}
