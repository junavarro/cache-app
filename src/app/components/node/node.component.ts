import { Component, Input, OnInit } from '@angular/core';
import { CacheL1BlockState, ClusterNode } from 'src/app/models/Models';
import { ContextManagerService } from 'src/app/services/context-manager.service';
import InitData from '../../data/initData';
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
    ],
    currentInstruction: null
  };
  displayedColumns: string[] = ['blockId', 'state', 'address', 'data'];
  constructor(private contextManagerService: ContextManagerService) {
    
  }

  ngOnInit(): void {
    this.contextManagerService.nodes.subscribe((nodes) => {
      // Null check
      this.clusterNode = nodes.find(node => node.nodeId === this.nodeId) as ClusterNode;
    });
  }

}
