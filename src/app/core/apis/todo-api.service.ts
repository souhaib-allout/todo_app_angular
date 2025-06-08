import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Todo, TodosList} from '../types/todo.type';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


export class TodoApiService {

  private http = inject(HttpClient);

  getTodoApi(): Observable<Todo[]> {
    const fetchUrl = 'http://localhost:8080/todo/api/todos/get-all-todos';
    return this.http.get<Todo[]>(fetchUrl,{withCredentials: true});
  }
  getTodoByIdApi(id: number): Observable<Todo> {
    const fetchUrl: string = 'http://localhost:8080/todo/api/todos/get-todo-by-id';
    const params:HttpParams = new HttpParams().set('id', id.toString());
    return this.http.get<Todo>(fetchUrl,{params, withCredentials: true});
  }
  addTodoApi(todo: Todo): Observable<void> {
    const fetchUrl = 'http://localhost:8080/todo/api/todos/add-todo';
    return this.http.post<void>(fetchUrl, todo, {withCredentials: true});
  }
  updateTodoApi(todo: Todo): Observable<void> {
    const fetchUrl = 'http://localhost:8080/todo/api/todos/update-todo';
    return this.http.put<void>(fetchUrl, todo,{withCredentials: true});
  }
  deleteTodoApi(id: number): Observable<void> {
    const fetchUrl = 'http://localhost:8080/todo/api/todos/delete-todo';
    const params:HttpParams = new HttpParams().set('id', id.toString());
    return this.http.delete<void>(fetchUrl, {params,withCredentials: true});
  }
  changeTodoCompletedApi(id: number,newStatus: boolean): Observable<void> {
    const fetchUrl = 'http://localhost:8080/todo/api/todos/change-todo-completed';
    const params:HttpParams = new HttpParams()
      .append('id', id.toString())
      .append('status',newStatus);
    return this.http.put<void>(fetchUrl, params,{withCredentials: true});
  }

  constructor() {
  }
}
