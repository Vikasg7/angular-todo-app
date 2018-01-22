import { Component, Input, HostBinding, HostListener } from "@angular/core";
import { Todo } from "../models/models";
import { TodoSrv } from "../services/todo";

@Component({
   selector: "todo-text",
   template: `
      <div class="todoText" #todoText [class.done]="todo.isDone" content-editable-on-hover (click)="isEditing=true" [innerHTML]="todo.todo | safeHtml"></div>
      <div class="editing" *ngIf="isEditing">
         <button (click)="updateTodo(todoText.innerHTML)">&nbsp;&#10004;&nbsp;</button>
         &nbsp;
         <button (click)="cancel(todoText)">&nbsp;&#10008;&nbsp;</button>
      </div>
   `
})
export class TodoText {
   
   @Input("todo") todo: Todo
   public isEditing: boolean

   constructor(public todoSrv: TodoSrv) { }

   public async updateTodo(editedText: string) {
      const newTodo = Object.assign({}, this.todo)
      newTodo.todo = editedText
      this.isEditing = false
      await this.todoSrv.update(newTodo).catch(console.log)
   }

   // It will hide div.editing on todoList update
   public ngOnChanges() {
      this.isEditing = false
   }

   public cancel(ele: HTMLDivElement) {
      ele.innerHTML = this.todo.todo
      this.isEditing = false
   }

}