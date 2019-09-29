import { LogService } from './../../services/log.service';
import { Log } from './../../models/log';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  log: Log = {
    id: '',
    title: '',
    date: null
  };
  isNew: boolean = true;
  @ViewChild('logForm', {static: false}) form: any;


  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getSelectedLog().subscribe(log => {
      if(!!log.id) {
        this.log = {
          id: log.id,
          title: log.title,
          date: null,
        };
        this.isNew = false;
      } else {
        this.log = {
          id: '',
          title: '',
          date: null
        };
        this.isNew = true;
      }
    })
  }

  onSubmit() {
    if (this.isNew) {
      const newLog = {
        id: this.generateId(),
        title: this.log.title,
        date: new Date()
      }
      this.logService.addLog(newLog);
    } else {
      const updatedLog = {
        id: this.log.id,
        title: this.log.title,
        date: new Date()
      }
      this.logService.updateLog(updatedLog);
      this.isNew = true;
    }
    this.form.reset();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

}
