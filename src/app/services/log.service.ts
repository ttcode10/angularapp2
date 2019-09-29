import { Log } from './../models/log';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  log: Log;
  logs: Log[];
  private logSource$ = new BehaviorSubject<Log>({id: '', title: '', date: null});

  constructor() {
    this.logs = [
      {
        id: 'afdfdsfds',
        title: 'log2',
        date: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'dafdfdsf',
        title: 'log1',
        date: new Date('2019-03-27, 10:03:38')
      }
    ]
  }

  getLogs():Observable<Log[]> {
    return of(this.logs)
  }

  setFormLog(log: Log) {
    return this.logSource$.next(log);
  }

  getSelectedLog():Observable<Log> {
    return this.logSource$.asObservable();
  }

  addLog(log: Log) {
    this.logs.unshift(log)
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (cur.id == log.id) {
        this.logs.splice(index, 1);
        this.logs.unshift(log);
      };
    });
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (cur.id == log.id) {
        this.logs.splice(index, 1);
      };
    });
  }

  saveToLocalStorage() {
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

}
