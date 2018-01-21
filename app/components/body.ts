import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TodoSrv } from '../services/todo';
import { Todo } from '../models/models';

@Component({
   selector: 'todo-body',
   template: `
      <div class="todos" *ngFor="let todo of (todoSrv.todoList | async); trackBy: trackFunc">
         <div class="checkbox">
            <input type="checkbox" [checked]="todo.isDone" (change)="toggleDone(todo)" />   
         </div>
         <todo-text [todo]="todo"></todo-text>
         <div class="del">
            <span (click)="delTodo(todo)">&nbsp;&#10005;&nbsp;</span>
         </div>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent {

   constructor(public todoSrv: TodoSrv) { }

   public toggleDone(todo: Todo) {
      todo.isDone = todo.isDone === 0 ? 1 : 0
      this.todoSrv.update(todo).catch(console.log)
   }

   public delTodo(todo: Todo) {
      this.todoSrv.del(todo).catch(console.log)
   }

   public trackFunc(v: Todo) {
      return v.id
   }
}