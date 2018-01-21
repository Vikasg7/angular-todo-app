/// <reference types="websql" />
import { Todo } from "../models/models";
import { Injectable } from "@angular/core";
import { List } from "immutable";

@Injectable()
export class StorageSrv {
   private _db: Database

   constructor() { }

   private _executeSql(query: string, values: Array<any> = []): Promise<SQLResultSet> {
      return new Promise<any>((resolve, reject) => {
         this._db.transaction((tx: SQLTransaction) => {
            tx.executeSql(query, values, (tx, results) => resolve(results), (tx, error) => reject(error))
         })
      })
   }

   public async initDb() {
      const dbSize = 500 * 1024 * 1024 // 500 Mbs as I am using unlimited storage
      this._db = window.openDatabase("todoApp", "1.0", "TodoApp Database", dbSize)
      await this._executeSql("CREATE TABLE IF NOT EXISTS todoTbl (id INTEGER, todo TEXT, isDone INTEGER, UNIQUE(id))")
   }

   public async add(todo: Todo) {
      const query = `INSERT INTO todoTbl (id, todo, isDone) VALUES (?, ?, ?)`
      const values = [todo.id, todo.todo, todo.isDone]
      return await this._executeSql(query, values)
   }

   public async del(id: number) {
      const query = `DELETE FROM todoTbl WHERE id = ?`
      const values = [id]
      return await this._executeSql(query, values)
   }

   public async update(todo: Todo) {
      const query = `UPDATE todoTbl SET todo = ?, isDone = ? WHERE id = ?`
      const values = [todo.todo, todo.isDone, todo.id]
      return await this._executeSql(query, values)
   }

   public async getAllTodos(): Promise<List<Todo>> {
      const query = "SELECT * FROM todoTbl"
      const results = await this._executeSql(query)
      let rows: Array<Todo> = []
      const rLen = results.rows.length
      for (let i = 0; i < rLen; i++) {
         rows.unshift(<Todo>results.rows.item(i))
      }
      return List(rows)
   }
}