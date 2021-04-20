import { Component, OnInit } from '@angular/core';
import InitData from 'src/app/data/initData';
import { MainMemoryBlock } from 'src/app/models/Models';
import { ContextManagerService } from 'src/app/services/context-manager.service';

@Component({
  selector: 'app-main-memory',
  templateUrl: './main-memory.component.html',
  styleUrls: ['./main-memory.component.scss']
})
export class MainMemoryComponent implements OnInit {

  source : MainMemoryBlock[] = [];
  displayedColumns: string[] = ['blockId', 'address', 'data'];

  constructor(private contextManager: ContextManagerService) {
  }

  ngOnInit(): void {
    this.contextManager.mainMemory.subscribe(
      memory => {
        this.source = memory.blocks
      }
    )
  }

}
