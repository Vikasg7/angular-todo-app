import { Injectable } from "@angular/core";
import { List } from "immutable"
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Todo } from "../models/models";
import { StorageSrv } from "./storage";

@Injectable()
export class TodoSrv {
   public todoList: Observable<List<Todo>>
   private _todoList: BehaviorSubject<List<Todo>>

   constructor(private _storage: StorageSrv) {
      this._todoList = new BehaviorSubject(List([]))
      this.todoList = this._todoList.asObservable()
      this._loadInitialData().catch(console.log)
   }

   private async _loadInitialData() {
      await this._storage.initDb()
      const todos = await this._storage.getAllTodos()
      this._todoList.next(todos)
   }

   public async add(todo: Todo) {
      await this._storage.add(todo)
      const l = this._todoList.getValue()
      const n = l.unshift(todo)
      this._todoList.next(n)
   }

   public async del(todo: Todo) {
      await this._storage.del(<number>todo.id)
      const l = this._todoList.getValue()
      const n = l.delete(l.findIndex((v, i) => v.id === todo.id))
      this._todoList.next(n)
   }

   public async update(todo: Todo) {
      await this._storage.update(todo)
      const l = this._todoList.getValue()
      const n = l.update(l.findIndex((v, i) => v.id === todo.id), (v) => todo)
      this._todoList.next(n)
   }
}