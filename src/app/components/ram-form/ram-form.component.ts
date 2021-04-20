import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ram-form',
  templateUrl: './ram-form.component.html',
  styleUrls: ['./ram-form.component.scss']
})
export class RamFormComponent implements OnInit {
  addressSelected: string | null = null;
  dataInput: string | null = null;
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
