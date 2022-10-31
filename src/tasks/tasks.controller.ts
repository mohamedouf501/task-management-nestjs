import { TaskStatus } from './task.status.enums';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.drcorator';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  private logger = new Logger(' TasksController');

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser()
    user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} Retrieving All Tasks`);
    return this.tasksService.getAllTasks(filterDto, user);
  }
  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser()
    user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser()
    user: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Post()
  createTask(
    @Body()
    createTaskDto: CreateTaskDto,
    @GetUser()
    user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }
}
