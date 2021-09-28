import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';
import { exists } from 'fs';
import { filterTaskDto } from './dtos/filter-listTask.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  findTaskById(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    if (task == null) {
      return { code: 404, message: 'Task not found' };
    }
    return task;
  }

  deleteTaskById(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index < 0) {
      return { code: 404, message: 'Task not found' };
    }
    this.tasks.splice(index, 1);
    return { code: 200, message: 'Deleted done' };
  }

  updateTaskById(id: string, updateTaskDto: CreateTaskDto) {
    const { title, description } = updateTaskDto;

    const task = this.tasks.find((task) => task.id === id);

    if (task == null) {
      return { code: 404, message: 'Task not found' };
    }
    task.title = title;
    task.description = description;
    return task;
  }

  updateStatut(id: string, status: TaskStatus) {
    const task = this.tasks.find((task) => task.id === id);

    if (task == null) {
      return { code: 404, message: 'Task not found' };
    }

    task.status = status;

    return task;
  }

  filterListTask(filterListTask: filterTaskDto): Task[] {
    const { status, search } = filterListTask;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
}
