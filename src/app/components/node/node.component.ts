import { Component, Input, OnInit } from '@angular/core';
import { CacheL1BlockState, ClusterNode, Instruction } from 'src/app/models/Models';
import { ContextManagerService } from 'src/app/services/context-manager.service';
import { InstructionGenerator } from 'src/app/utils/instruction-generator';
import InitData from '../../data/initData';
import { filter, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { InstructionEditorComponent } from '../instruction-editor/instruction-editor.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})

export class NodeComponent implements OnInit {
  @Input() nodeId: string | null = null; // decorate the property with @Input()
  initData = InitData;
  clusterNode: ClusterNode = {

    nodeId: this.nodeId as string,
    cacheL1: [
      { blockId: '0', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
      { blockId: '1', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
    ]
  };
  displayedColumns: string[] = ['blockId', 'state', 'address', 'data'];
  instructorGenerator: InstructionGenerator = new InstructionGenerator(Number(this.nodeId));
  currentInstruction: Instruction | null = null;
  constructor(private contextManagerService: ContextManagerService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.contextManagerService.nodes.pipe(
      map(nodes => nodes.find(node => node.nodeId === this.nodeId)),
    ).subscribe((node) => {
      // Null check
      this.clusterNode = node as ClusterNode;
    });
    this.listenInteraction();
  }
  dispatchNextInstruction() {
    const event = new CustomEvent<any>('nextInstruction', {
      detail: {
        nodeId: this.clusterNode.nodeId
      }
    });
    document.dispatchEvent(event);
  }

  listenInteraction() {
    fromEvent(document, 'nextInstruction').subscribe(eventData => {
      const { nodeId } = (eventData as CustomEvent).detail;
      if (nodeId === this.clusterNode.nodeId) {
        //console.log((eventData as CustomEvent).detail);
        this.fetch();
      }
    });
  }

  fetch() {
    this.currentInstruction = this.instructorGenerator.generateInstruction(this.nodeId as string);
    this.processInstruction();
  }

  processInstruction() {
    if(this.currentInstruction){
      this.contextManagerService.addInstruction(this.currentInstruction);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InstructionEditorComponent, {
      width: '350px',
      data: { nodeId: this.nodeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentInstruction = result;
      console.log('The dialog was closed');
      this.processInstruction();
    });
  }


}
