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
    this.logs = this.getFromLocalStorage();
    if(this.logs.length > 0) {
      this.sortLogs();
    } else {
      this.logs = [];
    }
    return of(this.logs)
  }

  setFormLog(log: Log) {
    return this.logSource$.next(log);
  }

  getSelectedLog():Observable<Log> {
    return this.logSource$.asObservable();
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    this.saveToLocalStorage();
  }

  updateLog(log: Log) {
    const index = this.logs.findIndex(cur => cur.id === log.id);
    if (index !== -1) {
      this.logs.splice(index, 1, log);
      this.sortLogs();
      this.saveToLocalStorage();
    } else {
      alert('Someone is updating this log, please try again later');
    }
  }

  deleteLog(log: Log) {
    const index = this.logs.findIndex(cur => cur.id === log.id);
    if (index !== -1) {
      this.logs.splice(index, 1);
      this.saveToLocalStorage();
    } else {
      alert('Someone is updating this log, please try again later');
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('logs'));
  }

  sortLogs() {
    this.logs.sort((a, b) => {
      return (Date.parse(b.date) - Date.parse(a.date));
    });
  }

}
