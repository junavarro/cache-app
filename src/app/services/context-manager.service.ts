import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import InitData from '../data/initData';
import { CacheL1BlockState, CacheL1Params, CacheL2Block, CacheL2BlockState, CacheL2Params, CEContext, ClusterNode, Instruction, InstructionState, MainMemoryBlock, MainMemoryParam, Operation } from '../models/Models';

@Injectable({
  providedIn: 'root'
})
export class ContextManagerService {
  private nodes$: BehaviorSubject<ClusterNode[]> = new BehaviorSubject<ClusterNode[]>(InitData.NODES);
  public readonly nodes: Observable<ClusterNode[]> = this.nodes$.asObservable();

  private cacheL2$: BehaviorSubject<{ blocks: CacheL2Block[] }> = new BehaviorSubject<{ blocks: CacheL2Block[] }>(InitData.CacheL2);
  public readonly cacheL2: Observable<{ blocks: CacheL2Block[] }> = this.cacheL2$.asObservable();

  private mainMemory$: BehaviorSubject<{ blocks: MainMemoryBlock[] }> = new BehaviorSubject<{ blocks: MainMemoryBlock[] }>(InitData.MainMemory);
  public readonly mainMemory: Observable<{ blocks: MainMemoryBlock[] }> = this.mainMemory$.asObservable();

  private queue$: BehaviorSubject<Instruction[]> = new BehaviorSubject<Instruction[]>([]);
  public readonly queue: Observable<Instruction[]> = this.queue$.asObservable();

  private instructionIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  public readonly instructionIndex: Observable<number> = this.instructionIndex$.asObservable();

  constructor() { }

  setCacheL1Block(cacheL1Params: CacheL1Params): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const nodes = this.nodes$.getValue();
      const block = nodes.find(node => node.nodeId === cacheL1Params.processorId)?.cacheL1.
        find(block => block.blockId === cacheL1Params.blockId);
      if (block) {
        block.state = cacheL1Params.state as CacheL1BlockState;
        block.address = cacheL1Params.address;
        block.data = cacheL1Params.data;
      }
      this.nodes$.next(nodes);
      resolve(true);
    });
  }
  setCacheL2Block(cacheL2Params: CacheL2Params): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const cacheL2 = this.cacheL2$.getValue();
      const block = cacheL2.blocks.find(block => block.blockId === cacheL2Params.blockId);
      if (block) {
        block.address = cacheL2Params.address;
        block.list = cacheL2Params.list;
        block.data = cacheL2Params.data;
        block.state = cacheL2Params.state as CacheL2BlockState;
      }
      this.cacheL2$.next(cacheL2);
      resolve(true);

    });
  }
  setMainMemoryBlock(mainMemoryParam: MainMemoryParam): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const mainMemory = this.mainMemory$.getValue();
      const block = mainMemory.blocks.find(block => block.address === mainMemoryParam.address)
      if (block) {
        block.data = mainMemoryParam.data
        this.mainMemory$.next(mainMemory);
        resolve(true);
      }
    });
  }


  addInstruction(instruction: Instruction) {
    const queue = this.queue$.getValue();
    queue.push(instruction);
    this.queue$.next(queue);
    console.log('adding', instruction);
  }

  nextInstruction(): ({ instruction: Instruction, index: number }) {
    // increment the index if the index < length
    const queue = this.queue$.getValue();
    const currentIndex = this.instructionIndex$.getValue() + 1;
    let instruction: Instruction = { address: '', nodeId: '-1', operation: Operation.NOP, state: InstructionState.NULL, value: '' };
    if (currentIndex < queue.length) {
      // access to the array
      instruction = queue[currentIndex];
      this.instructionIndex$.next(currentIndex);
    } else {
      console.log('No more interviews, return null instruction');
    }
    return { instruction, index: currentIndex } as ({ instruction: Instruction, index: number });
  }


}
