import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../task.entity';
import { TaskStatus } from '../task-status.enum';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto) {
    const query = this.createQueryBuilder('task'); // task entity query
    const tasks = await query.getMany();
    return tasks;
  }
}
