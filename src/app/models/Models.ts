/**
 * Cache L1
 */
export enum CacheL1BlockState {
    MODIFIED = 'M',
    SHARED = 'S',
    INVALID = 'I'
}
export interface CacheL1Block {
    blockId: string; // 0,1
    state: CacheL1BlockState;
    address: string; //0x0
    data: string; // 0x00
}
/**
 * Cache L2
 */
export enum CacheL2BlockState {
    DIRECTORY_MODIFIED = 'DM',
    DIRECTORY_SHARED = 'DS',
    DIRECTORY_INVALID = 'DI'
}
export interface CacheL2Block {
    blockId: string; // 0,1,2,3
    state: CacheL2BlockState;
    list: boolean[];
    address: string; // 0x0
    data: string // 0x00
}

/**
 * Main memory
 */
export interface MainMemoryBlock {
    blockId: string; // 0,1,2,3,4,5,6,7
    address: string; // 0x0 
    data: string
}



/**
 * CPU 
 */
export interface  Operation {
    CALC : 'CALC';
    READ: 'READ';
    WRITE: 'WRITE';
}
export interface Instruction{
    nodeId: string; // 0,1,2,3
    operation: Operation;
    address: string;
    value: string;
}


/**
 * NODES
 */
export interface ClusterNode {
    nodeId: string; // 0,1,2,3
    currentInstruction: Instruction | null;
    cacheL1: CacheL1Block[]
}


/**
 * Context
 */
export interface CEContext{
    NODES: ClusterNode[],
    CacheL2:{
        blocks: CacheL2Block[]
    },
    MainMemory: {
        blocks: MainMemoryBlock[]
    } 
}