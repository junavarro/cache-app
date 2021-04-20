import { Component, OnInit } from '@angular/core';
import InitData from 'src/app/data/initData';
import { CacheL2Block } from 'src/app/models/Models';

@Component({
  selector: 'app-cache-l2',
  templateUrl: './cache-l2.component.html',
  styleUrls: ['./cache-l2.component.scss']
})
export class CacheL2Component implements OnInit {
  initData = InitData;
  source: (CacheL2Block & {P0: boolean,P1: boolean, P2: boolean, P3: boolean})[] = [];
  displayedColumns: string[] = ['blockId', 'state', 'P0', 'P1', 'P2', 'P3', 'address', 'data'];

  constructor() {
    this.source = this.initData.CacheL2.blocks.map(block => {
      return { ...block ,P0: block.list[0], P1: block.list[1], P2: block.list[2], P3: block.list[3]}
    })
  }

  ngOnInit(): void {
  }

}
