import { Component, OnInit } from '@angular/core';
import { Instruction, InstructionState } from 'src/app/models/Models';
import { ContextManagerService } from 'src/app/services/context-manager.service';
import { map, filter } from 'rxjs/operators';
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
    this.contextManager.queue.pipe(
      map((queue) => {
        return queue.filter(item => item.state === InstructionState.PENDING)
      })
    ).subscribe(queue => this.list = queue);
  }

}
