import { Component, OnInit } from '@angular/core';
import { Instruction, InstructionState, Operation } from 'src/app/models/Models';
import { ContextManagerService } from 'src/app/services/context-manager.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  instruction: Instruction = { address: '', nodeId: '-1', operation: Operation.NOP, state: InstructionState.NULL, value: '' };
  currentIndex: number = -1;
  constructor(private contextManager: ContextManagerService) { }

  ngOnInit(): void {
    this.contextManager.instructionIndex.subscribe((index) => {
      this.currentIndex = index;
    });
  }

  nextInstruction() {
    this.instruction = this.contextManager.nextInstruction().instruction;
  }

}
