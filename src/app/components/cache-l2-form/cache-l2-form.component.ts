import { Component, OnInit } from '@angular/core';
import { CacheL2BlockState } from 'src/app/models/Models';

@Component({
  selector: 'app-cache-l2-form',
  templateUrl: './cache-l2-form.component.html',
  styleUrls: ['./cache-l2-form.component.scss']
})
export class CacheL2FormComponent implements OnInit {
  blockSelected: string | null = null;
  stateSelected: string | null = null;
  addressSelected: string | null = null;
  dataInput: string | null = null;
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
      id: '0',
      value: '0x0'
    },
    {
      id: '1',
      value: '0x1'
    },
    {
      id: '2',
      value: '0x2'
    },
    {
      id: '3',
      value: '0x3'
    },
    {
      id: '4',
      value: '0x4'
    },
    {
      id: '5',
      value: '0x5'
    },
    {
      id: '6',
      value: '0x6'
    },
    {
      id: '7',
      value: '0x7'
    }];
  constructor() { }

  ngOnInit(): void {
  }

}
