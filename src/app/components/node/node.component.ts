import { Component, Input, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['blockId', 'state', 'address', 'data'];
  constructor() { }

  ngOnInit(): void {
  }

}
