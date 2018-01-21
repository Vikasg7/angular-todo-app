import { Component } from '@angular/core';
import { TodoSrv } from '../services/todo';
import { Todo } from '../models/models';

@Component({
   selector: 'todo-header',
   template: `
      <h1>Todo App</h1>
      <div>
         <input type="search" [(ngModel)]="todo" (keydown.enter)="add()" placeholder="what you wanna do...">
      </div>
  `
})
export class HeaderComponent {
   public todo: string

   constructor(public todoSrv: TodoSrv) {
      this.todo = ""
   }

   public add() {
      const todo: Todo = { id: Date.now(), todo: this.todo, isDone: 0 }
      this.todoSrv.add(todo).catch(console.log)
      this.todo = ""
   } 
}