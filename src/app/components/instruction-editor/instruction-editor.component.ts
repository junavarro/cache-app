import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstructionScenario, InstructionState, Operation } from 'src/app/models/Models';
import { ContextManagerService } from 'src/app/services/context-manager.service';

@Component({
  selector: 'app-instruction-editor',
  templateUrl: './instruction-editor.component.html',
  styleUrls: ['./instruction-editor.component.scss']
})
export class InstructionEditorComponent implements OnInit {
  nodeId: string = '';
  addressSelected: string | null = null;
  operationSelected: string | null = null;
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
  operationList: { id: string, value: string }[] = [
    {
      id: Operation.CALC,
      value: Operation.CALC
    },
    {
      id: Operation.READ,
      value: Operation.READ
    },
    {
      id: Operation.WRITE,
      value: Operation.WRITE
    }]
  constructor(
    public dialogRef: MatDialogRef<InstructionEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nodeId: string },
    private contextManager: ContextManagerService) { }

  ngOnInit(): void {
    this.nodeId = this.data.nodeId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  setBlock() {
    this.dialogRef.close({
      nodeId: this.nodeId,
      address: this.addressSelected,
      operation: this.operationSelected,
      value: this.dataInput,
      state: InstructionState.PENDING
    });
  }

}
