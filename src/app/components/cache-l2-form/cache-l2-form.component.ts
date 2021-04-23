import { Component, OnInit } from '@angular/core';
import { CacheL2Block, CacheL2BlockState, CacheL2Params } from 'src/app/models/Models';
import { ContextManagerService } from 'src/app/services/context-manager.service';

@Component({
  selector: 'app-cache-l2-form',
  templateUrl: './cache-l2-form.component.html',
  styleUrls: ['./cache-l2-form.component.scss']
})
export class CacheL2FormComponent implements OnInit {
  blockSelected: string = '';
  stateSelected: CacheL2BlockState | null = null;
  addressSelected: string = '';
  dataInput: string = '';
  presenceList: boolean[] = [false, false, false, false];
  blockList: { id: string, value: string }[] = [
    { id: '0', value: 'Block 0' },
    { id: '1', value: 'Block 1' },
    { id: '2', value: 'Block 2' },
    { id: '3', value: 'Block 3' }];
  stateList: { id: CacheL2BlockState, value: string }[] = [
    { id: CacheL2BlockState.DIRECTORY_MODIFIED, value: 'Directory Modified' },
    { id: CacheL2BlockState.DIRECTORY_SHARED, value: 'Directory Shared' },
    { id: CacheL2BlockState.DIRECTORY_INVALID, value: 'Directory Invalid' }]
  addressList: { id: string, value: string }[] = [
    {
      id: '0x0',
      value: '0x0'
    },
    {
      id: '0x1',
      value: '0x1'
    },
    {
      id: '0x2',
      value: '0x2'
    },
    {
      id: '0x3',
      value: '0x3'
    },
    {
      id: '0x4',
      value: '0x4'
    },
    {
      id: '0x5',
      value: '0x5'
    },
    {
      id: '0x6',
      value: '0x6'
    },
    {
      id: '0x7',
      value: '0x7'
    }];
  constructor(private contextManager: ContextManagerService) { }

  ngOnInit(): void {
  }

  setBlock() {
    const block: CacheL2Params = Object.assign({}, {
      address: this.addressSelected,
      blockId: this.blockSelected,
      data: this.dataInput,
      state: this.stateSelected,
      list: this.presenceList.slice()
    });
    this.contextManager.setCacheL2Block(block);
  }


}
