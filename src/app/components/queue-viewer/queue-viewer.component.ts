import { Component, OnInit } from '@angular/core';
import { Instruction } from 'src/app/models/Models';
import { ContextManagerService } from 'src/app/services/context-manager.service';

@Component({
  selector: 'app-queue-viewer',
  templateUrl: './queue-viewer.component.html',
  styleUrls: ['./queue-viewer.component.scss']
})
export class QueueViewerComponent implements OnInit {
  list: Instruction[] = [];
  constructor(private contextManager: ContextManagerService) {

  }
  ngOnInit(): void {
    this.contextManager.queue.subscribe(queue => this.list = queue);
  }

}
