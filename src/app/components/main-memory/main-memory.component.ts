import { Component, OnInit } from '@angular/core';
import InitData from 'src/app/data/initData';

@Component({
  selector: 'app-main-memory',
  templateUrl: './main-memory.component.html',
  styleUrls: ['./main-memory.component.scss']
})
export class MainMemoryComponent implements OnInit {

  source = InitData.MainMemory.blocks;
  displayedColumns: string[] = ['blockId', 'address', 'data'];

  constructor() {

  }

  ngOnInit(): void {
  }

}
