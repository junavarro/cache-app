import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import InitData from '../data/initData';
import { CacheL1BlockState, CacheL1Params, CacheL2Block, CacheL2BlockState, CacheL2Params, CEContext, ClusterNode, Instruction, InstructionScenario, InstructionState, MainMemoryBlock, MainMemoryParam, Operation } from '../models/Models';

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
      const cacheL2 = Object.assign({}, this.cacheL2$.getValue());
      const block = cacheL2.blocks.find(block => block.blockId === cacheL2Params.blockId);
      if (block) {
        block.address = cacheL2Params.address;
        block.list = cacheL2Params.list;
        block.data = cacheL2Params.data;
        block.state = cacheL2Params.state as CacheL2BlockState;
      }
      this.cacheL2$.next(cacheL2);


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
    //console.log(queue);
    this.queue$.next(queue);
    //console.log('adding', instruction);
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

  getScenario(instruction: Instruction): { instruction: Instruction, scenario: InstructionScenario } {
    const cpu = this.nodes$.getValue().find(node => node.nodeId === instruction.nodeId);
    const targetBlock = Number(instruction.address) % 2;
    const cacheLine = cpu?.cacheL1[targetBlock];

    const result: { instruction: Instruction, scenario: InstructionScenario } = {
      instruction,
      scenario: InstructionScenario.NO_SCENARIO
    }
    if (instruction.operation === Operation.CALC) {
      result.scenario = InstructionScenario.NO_WAIT;
    }
    else if (instruction.operation === Operation.READ) {
      // compare address       // compare state
      if (instruction.address === cacheLine?.address && cacheLine.state !== CacheL1BlockState.INVALID) {
        result.scenario = InstructionScenario.READ_HIT;

      } else {
        result.scenario = InstructionScenario.READ_MISS;
      }
    }
    else if (instruction.operation === Operation.WRITE) {
      if (instruction.address === cacheLine?.address && cacheLine.state !== CacheL1BlockState.INVALID) {
        result.scenario = InstructionScenario.WRITE_HIT;
      } else {
        result.scenario = InstructionScenario.WRITE_MISS;
      }
    }
    return result;
  }

  setInstructionState(index: number, state: InstructionState) {
    // get the queue
    let queue = this.queue$.getValue();
    // update the instruction
    for (let i = 0; i < queue.length; i++) {
      if (index === i) {
        queue[index].state = state;
        break;
      }
    }
    this.queue$.next(queue);
  }

  handleCalc(index: number, instruction: Instruction) {
    this.setInstructionState(index, InstructionState.DONE);
    this.dispatchNextEvent(instruction.nodeId);
  }

  handleReadHit(index: number, instruction: Instruction) {
    this.setInstructionState(index, InstructionState.DONE);
    this.dispatchNextEvent(instruction.nodeId);
  }
  handleReadMiss(index: number, instruction: Instruction) {
    const cacheL2block = this.getCacheL2Block(instruction.address);
    // console.log('handleReadMiss', cacheL2block);
    if (cacheL2block) {// in the directory
      const dataFromCacheL2 = cacheL2block.data;
      if (cacheL2block.state === CacheL2BlockState.DIRECTORY_SHARED) {
        cacheL2block.list[Number(instruction.nodeId)] = true;
        this.setCacheL2Block(cacheL2block);
        this.setCacheL1Propagation({ ...instruction, value: dataFromCacheL2 });

      }
      else if (cacheL2block.state === CacheL2BlockState.DIRECTORY_MODIFIED) {
        // search cache l1 owner  and set its cache l1 block in shared
        for (let presenceIndex = 0; presenceIndex < cacheL2block.list.length; presenceIndex++) {
          const presenceNode = cacheL2block.list[presenceIndex];
          if (presenceNode) {
            const block = this.nodes$.getValue()[presenceIndex].cacheL1[Number(instruction.address)];
            block.state = CacheL1BlockState.SHARED;
            this.setCacheL1Block({ ...block, processorId: `${presenceIndex}` });
            break;
          }
        }
        // set cache l2 block to share
        cacheL2block.state = CacheL2BlockState.DIRECTORY_SHARED;
        // update presence list
        cacheL2block.list[Number(instruction.nodeId)] = true;
        this.setCacheL2Block(cacheL2block);
        // update cache l1 target no propagation
        this.setCacheL1Propagation({ ...instruction, value: dataFromCacheL2 });
      }
      else if (cacheL2block.state === CacheL2BlockState.DIRECTORY_INVALID) {
        cacheL2block.state = CacheL2BlockState.DIRECTORY_SHARED;
        cacheL2block.list = [false, false, false, false];
        cacheL2block.list[Number(instruction.nodeId)] = true;
        this.setCacheL1Block({
          address: instruction.address,
          blockId: `${Number(instruction.address) % 2}`,
          data: dataFromCacheL2,
          state: CacheL1BlockState.SHARED,
          processorId: instruction.nodeId
        });
      }
    } else { // not present in the directory

      //get data from ram
      const ram = this.mainMemory$.getValue();

      const dataFromRam = ram.blocks[Number(instruction.address)];
      const cacheL2 = this.cacheL2$.getValue();
      // get the set using modulus
      const targetSet = Number(instruction.address) % 2;
      // cal random to write on set
      const randomBlockIndex = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

      //get the current data on the random block 
      const cacheL2Block = cacheL2.blocks[2 * targetSet + randomBlockIndex];

      // state is invalid
      if (cacheL2Block.state === CacheL2BlockState.DIRECTORY_INVALID) {
        const presenceList = [false, false, false, false];
        presenceList[Number(instruction.nodeId)] = true;
        this.setCacheL2Block({
          address: instruction.address,
          blockId: cacheL2Block.blockId,
          data: dataFromRam.data,
          list: presenceList,
          state: CacheL2BlockState.DIRECTORY_SHARED
        })
      }
      // state is shared
      else if (cacheL2Block.state === CacheL2BlockState.DIRECTORY_SHARED) {
        for (let i = 0; i < cacheL2Block.list.length; i++) {
          if (cacheL2Block.list[i]) {
            const currentCacheL1block = this.nodes$.getValue()[i].cacheL1[Number(instruction.address) % 2];
            currentCacheL1block.state = CacheL1BlockState.INVALID;
            this.setCacheL1Block({
              ...currentCacheL1block,
              processorId: instruction.nodeId
            })
          }
        }
        const presenceList = [false, false, false, false];
        presenceList[Number(instruction.nodeId)] = true;
        this.setCacheL2Block({
          address: instruction.address,
          blockId: instruction.nodeId,
          data: dataFromRam.data,
          list: presenceList,
          state: CacheL2BlockState.DIRECTORY_SHARED
        })


      }
      // state is modified
      else if (cacheL2Block.state === CacheL2BlockState.DIRECTORY_MODIFIED) {
        const ram = this.mainMemory$.getValue();
        const block = ram.blocks[Number(instruction.address)];
        block.data = cacheL2Block.data;
        this.setMainMemoryBlock(block);
        const cacheL2 = this.cacheL2$.getValue();
        for (let index = 0; index < cacheL2.blocks.length; index++) {
          const block = cacheL2.blocks[index];
          if (block.address === instruction.address) {
            for (let presenceIndex = 0; presenceIndex < block.list.length; presenceIndex++) {
              const presence = block.list[presenceIndex];
              if (presenceIndex) {
                this.setCacheL1Block({
                  address: instruction.address,
                  blockId: instruction.nodeId,
                  data: dataFromRam.data,
                  processorId: instruction.nodeId,
                  state: CacheL1BlockState.INVALID
                })
              }

            }
          }

        }
      }
      this.setCacheL1Propagation({ ...instruction, value: dataFromRam.data });
      this.setInstructionState(index, InstructionState.DONE);
    }


    this.setInstructionState(index, InstructionState.DONE);
    this.dispatchNextEvent(instruction.nodeId);
  }
  handleWriteHit(index: number, instruction: Instruction) {
    const nodes = this.nodes$.getValue();
    const cacheL1Block = this.nodes$.getValue()[Number(instruction.nodeId)].cacheL1[Number(instruction.address) % 2];
    if (cacheL1Block.state === CacheL1BlockState.MODIFIED) {
      this.setCacheL1Block({
        ...cacheL1Block,
        data: instruction.value,
        processorId: instruction.nodeId,
        state: CacheL1BlockState.MODIFIED
      })
    } else if (cacheL1Block.state === CacheL1BlockState.SHARED) {
      const cacheL2Block = this.getCacheL2Block(instruction.address);
      if (cacheL2Block) {
        cacheL2Block.state = CacheL2BlockState.DIRECTORY_MODIFIED;
        for (let nodeId = 0; nodeId < cacheL2Block.list.length; nodeId++) {
          if (cacheL2Block.list[nodeId]) {
            const cacheL1Block = nodes[nodeId].cacheL1[Number(instruction.address) % 2];
            if (cacheL1Block.address === instruction.address) {
              cacheL1Block.state = CacheL1BlockState.INVALID;
              this.setCacheL1Block({ ...cacheL1Block, processorId: instruction.nodeId });
            }

          }
        }
        cacheL2Block.list = [false, false, false, false];
        cacheL2Block.list[Number(instruction.nodeId)] = true;
        this.setCacheL1Block({
          ...cacheL1Block,
          processorId: instruction.nodeId,
          address: instruction.address,
          data: instruction.value,
          state: CacheL1BlockState.MODIFIED
        });
      }
    }
    this.setInstructionState(index, InstructionState.DONE);
    this.dispatchNextEvent(instruction.nodeId);
  }
  handleWriteMiss(index: number, instruction: Instruction) {
    const cacheL2 = this.cacheL2$.getValue();
    let cacheL2BlockFound = false;
    //search for cache L2 address
    for (let blockIndex = 0; blockIndex < cacheL2.blocks.length; blockIndex++) {
      const blockL2 = cacheL2.blocks[blockIndex];
      if (blockL2.address === instruction.address) {
        blockL2.list = [false, false, false, false];
        blockL2.list[Number(instruction.nodeId)] = true;
        blockL2.data = instruction.value;
        blockL2.address = instruction.address;
        blockL2.state = CacheL2BlockState.DIRECTORY_MODIFIED;
        this.setCacheL2Block(blockL2);
        cacheL2BlockFound = true;
        break;
      }
    }
    this.setCacheL1Propagation(instruction);
    if (!cacheL2BlockFound) {
      const targetSet = Number(instruction.address) % 2;
      const randomBlockL2 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
      const block = this.cacheL2$.getValue().blocks[2 * targetSet + randomBlockL2];
      block.address = instruction.address;
      block.data = instruction.value;
      block.list = [false, false, false, false];
      block.state = CacheL2BlockState.DIRECTORY_MODIFIED;
      block.list[Number(instruction.nodeId)] = true;
      this.setCacheL2Block(block);
    }

    this.setInstructionState(index, InstructionState.DONE);
    this.dispatchNextEvent(instruction.nodeId);
  }

  dispatchNextEvent(nodeId: string) {
    const event = new CustomEvent<any>('nextInstruction', {
      detail: {
        nodeId
      }
    });
    document.dispatchEvent(event);
  }

  private setCacheL1Propagation(instruction: Instruction) {
    // get the actual block
    const node = this.nodes$.getValue()[Number(instruction.nodeId)];
    const currentCacheL1Block = node.cacheL1[Number(instruction.address) % 2];
    if (currentCacheL1Block.state === CacheL1BlockState.INVALID) {
      this.setCacheL1Block({
        blockId: currentCacheL1Block.blockId,
        state: CacheL1BlockState.MODIFIED,
        data: instruction.value,
        address: instruction.address,
        processorId: instruction.nodeId
      });
    } else if (currentCacheL1Block.state === CacheL1BlockState.MODIFIED) {
      const ram = this.mainMemory$.getValue();
      ram.blocks[Number(instruction.address)].data = currentCacheL1Block.data;
      this.setCacheL1Block({
        blockId: currentCacheL1Block.blockId,
        state: CacheL1BlockState.MODIFIED,
        data: instruction.value,
        address: instruction.address,
        processorId: instruction.nodeId
      });
      const cacheL2 = this.cacheL2$.getValue();
      for (let block = 0; block < cacheL2.blocks.length; block++) {
        const cacheBlock = cacheL2.blocks[block];
        if (cacheBlock.address === instruction.address) {
          cacheBlock.state = CacheL2BlockState.DIRECTORY_INVALID;
          this.setCacheL2Block({ ...cacheBlock });
          break;
        }
      }
    } else if (currentCacheL1Block.state === CacheL1BlockState.SHARED) {      // set to false presence of bit
      const cacheL2 = this.cacheL2$.getValue();
      for (let block = 0; block < cacheL2.blocks.length; block++) {
        const cacheBlock = cacheL2.blocks[block];
        if (cacheBlock.address === currentCacheL1Block.address) {
          cacheBlock.list[Number(instruction.nodeId)] = false;
          cacheBlock.state = CacheL2BlockState.DIRECTORY_SHARED;
          const reducer = (accumulator: boolean, current: boolean) => accumulator && current;
          if (!cacheBlock.list.reduce(reducer)) {
            cacheBlock.state = CacheL2BlockState.DIRECTORY_INVALID;
            cacheBlock.address = '0x0';
          }
          this.setCacheL2Block({ ...cacheBlock });
          break;
        }
      }
      let cacheL2TargetBlock = null;
      for (let block = 0; block < cacheL2.blocks.length; block++) {
        const cacheBlock = cacheL2.blocks[block];
        if (cacheBlock.address === instruction.address) {
          cacheBlock.list[Number(instruction.nodeId)] = true;
          cacheBlock.state = CacheL2BlockState.DIRECTORY_SHARED;
          cacheL2TargetBlock = cacheBlock;
          this.setCacheL2Block({ ...cacheBlock });
          break;
        }
      }
      if (!cacheL2TargetBlock) {
        const targetSet = Number(instruction.address) % 2;
        const randomBlockIndex = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        const cacheL2Target = cacheL2.blocks[2 * targetSet + randomBlockIndex];
        cacheL2Target.address = instruction.address;
        cacheL2Target.list = [false, false, false, false];
        cacheL2Target.list[Number(instruction.nodeId)] = true;
        cacheL2Target.data = instruction.value;
        this.setCacheL2Block(cacheL2Target);
      }

      this.setCacheL1Block({
        blockId: currentCacheL1Block.blockId,
        state: CacheL1BlockState.SHARED,
        data: instruction.value,
        address: instruction.address,
        processorId: instruction.nodeId
      });
    }

  }

  private getCacheL2Block(address: string): CacheL2Block | null {
    let result = null;
    const cacheL2 = this.cacheL2$.getValue();
    for (let blockIndex = 0; blockIndex < cacheL2.blocks.length; blockIndex++) {
      const block = cacheL2.blocks[blockIndex];
      if (block.address === address) {
        result = block;
        break;
      }
    }
    return result;
  }

}
