import { Component, OnInit } from '@angular/core';
import { Instruction, InstructionScenario, InstructionState, Operation } from 'src/app/models/Models';
import { ContextManagerService } from 'src/app/services/context-manager.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  currentIndex: number = -1;
  scenario: { instruction: Instruction, scenario: InstructionScenario } | null = null;
  interval: any = null;
  running: boolean = false;

  constructor(private contextManager: ContextManagerService) { }

  ngOnInit(): void {
    this.contextManager.instructionIndex.subscribe((index) => {
      this.currentIndex = index;
    });
  }

  nextInstruction() {
    const instruction = this.contextManager.nextInstruction().instruction;
    this.scenario = this.contextManager.getScenario(instruction);
    if (this.scenario.scenario === InstructionScenario.NO_WAIT) {
      this.contextManager.handleCalc(this.currentIndex, instruction);
    }
    else if (this.scenario.scenario === InstructionScenario.READ_HIT) {
      this.contextManager.handleReadHit(this.currentIndex, instruction);
    }
    else if (this.scenario.scenario === InstructionScenario.READ_MISS) {
      this.contextManager.handleReadMiss(this.currentIndex, instruction);
    }
    else if (this.scenario.scenario === InstructionScenario.WRITE_HIT) {
      this.contextManager.handleWriteHit(this.currentIndex, instruction);
    }
    else if (this.scenario.scenario === InstructionScenario.WRITE_MISS) {
      this.contextManager.handleWriteMiss(this.currentIndex, instruction);
    }

    //console.log(this.scenario);
  }

  continue() {
    if (!this.running) {
      this.interval = setInterval(
        () => {
          //console.log('Running');
          this.nextInstruction();
          if (this.currentIndex < 0) {
            clearInterval(this.interval);
          }
        }, 500
      )
      this.running = true;
    } else {
      this.running = false;
      clearInterval(this.interval);
    }
  }

}
