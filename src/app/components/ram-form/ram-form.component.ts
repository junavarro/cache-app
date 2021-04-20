import { Component, OnInit } from '@angular/core';
import { ContextManagerService } from 'src/app/services/context-manager.service';

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
  constructor(private contextManager: ContextManagerService) {

  }


  ngOnInit(): void {
  }

  setBlock() {
    const block = {
      address: this.addressSelected as string,
      data: this.dataInput  as string,
    };
    console.log(block);
    this.contextManager.setMainMemoryBlock(block);
  }

}
