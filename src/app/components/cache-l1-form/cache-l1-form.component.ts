import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContextManagerService } from 'src/app/services/context-manager.service';
import { CacheL1BlockState } from './../../models/Models';

@Component({
  selector: 'app-cache-l1-form',
  templateUrl: './cache-l1-form.component.html',
  styleUrls: ['./cache-l1-form.component.scss']
})
export class CacheL1FormComponent implements OnInit {
  processorSelected: string = '';
  blockSelected: string = '';
  stateSelected: CacheL1BlockState | null = null;
  addressSelected: string = '';
  dataInput: string = '';
  processorList: { id: string, value: string }[] = [{ id: '0', value: 'P0' }, { id: '1', value: 'P1' }, { id: '2', value: 'P2' }, { id: '3', value: 'P3' }];
  blockList: { id: string, value: string }[] = [{ id: '0', value: 'Block 0' }, { id: '1', value: 'Block 1' }];
  stateList: { id: CacheL1BlockState, value: string }[] = [
    { id: CacheL1BlockState.MODIFIED, value: 'Modified' },
    { id: CacheL1BlockState.SHARED, value: 'Shared' },
    { id: CacheL1BlockState.INVALID, value: 'Invalid' }]
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
    const block = {
      address: this.addressSelected,
      blockId: this.blockSelected,
      data: this.dataInput,
      processorId: this.processorSelected,
      state: this.stateSelected
    };
    this.contextManager.setCacheL1Block(block);
  }

}
