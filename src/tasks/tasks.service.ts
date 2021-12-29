import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
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

  getTasksWithFilters(filterDto: GetTasksFilterDto): Array<Task> {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
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
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  deleteTask(id: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return id;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
