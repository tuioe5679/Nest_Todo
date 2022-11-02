import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Todo } from '@prisma/client';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  //전체 조회 (시간이 걸리는것 async)
  async fetchAllTodos(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  //단일 조회(id)
  async fetchTodoItem(id: number): Promise<Todo | null> {
    return this.prismaService.todo.findUnique({ where: { id: Number(id) } });
  }

  //단일 삭제(id)
  async deleteTodoItem(id: number): Promise<Todo | null> {
    return this.prismaService.todo.delete({ where: { id: Number(id) } });
  }

  //추가(data)
  async addTodoItem(data: Todo): Promise<Todo> {
    return this.prismaService.todo.create({ data: data });
  }

  //수정(data)
  async updateTodoItem(
    id: number,
    title: string,
    content: string,
    is_done: boolean,
  ): Promise<Todo | null> {
    return this.prismaService.todo.update({
      where: { id: Number(id) },
      data: {
        title: title,
        content: content,
        is_done: is_done,
      },
    });
  }
}
