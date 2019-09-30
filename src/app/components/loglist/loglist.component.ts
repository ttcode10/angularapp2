import { LogService } from './../../services/log.service';
import { Log } from './../../models/log';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-loglist',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.css']
})
export class LoglistComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  selectLog(log: Log) {
    this.logService.setFormLog(log);
  }

  deleteLog(log: Log) {
    this.logService.deleteLog(log);
  }

}
