import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [
    {
      id: '1',
      title: 'Test task',
      description: 'This is a test task',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks(): Array<Task> {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return id;
  }

  updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto): Task {
    const { status } = updateTaskDto;
    console.log({ status });

    const task = this.getTaskById(id);
    task.status = TaskStatus[status];
    return task;
  }
}
