import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.status.enums';
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
