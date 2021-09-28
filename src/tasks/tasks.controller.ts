import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { filterTaskDto } from './dtos/filter-listTask.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  getTasks(@Query() filterTaskDto: filterTaskDto): Task[] {
    if (Object.keys(filterTaskDto).length) {
      return this.tasksService.filterListTask(filterTaskDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Get('/:id')
  findTaskById(@Param('id') id: string) {
    return this.tasksService.findTaskById(id);
  }

  @Get('delete/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }

  @Post('/:id')
  @HttpCode(200)
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  @Post('status/:id')
  @HttpCode(200)
  updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.updateStatut(id, status);
  }
}
