import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enums';
@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async findById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id: id } });
    if (!found) throw new NotFoundException(`task With ${id} Not Found`);
    return found;
  }
  async deleteById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`task With ${id} Not Found`);
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.tasksRepository.save(task);
    return task;
  }
}
