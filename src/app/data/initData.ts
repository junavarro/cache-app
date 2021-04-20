import { CacheL1BlockState, CacheL2BlockState, CEContext } from '../models/Models'
export const InitData: CEContext = {


    NODES: [
        {
            nodeId: '0',
            cacheL1: [
                { blockId: '0', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
                { blockId: '1', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
            ],
            currentInstruction: null
        },
        {
            nodeId: '1',
            cacheL1: [
                { blockId: '0', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
                { blockId: '1', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
            ],
            currentInstruction: null
        },
        {
            nodeId: '2',
            cacheL1: [
                { blockId: '0', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
                { blockId: '1', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
            ],
            currentInstruction: null
        },
        {
            nodeId: '3',
            cacheL1: [
                { blockId: '0', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
                { blockId: '1', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
            ],
            currentInstruction: null
        }
    ],
    CacheL2: {
        blocks: [
            {
                blockId: '0',
                address: '0x0',
                data: '0x00',
                list: [false, false, false, false],
                state: CacheL2BlockState.DIRECTORY_INVALID
            },
            {
                blockId: '1',
                address: '0x0',
                data: '0x00',
                list: [false, false, false, false],
                state: CacheL2BlockState.DIRECTORY_INVALID
            },
            {
                blockId: '2',
                address: '0x0',
                data: '0x00',
                list: [false, false, false, false],
                state: CacheL2BlockState.DIRECTORY_INVALID
            },
            {
                blockId: '3',
                address: '0x0',
                data: '0x00',
                list: [false, false, false, false],
                state: CacheL2BlockState.DIRECTORY_INVALID
            }
        ]
    },
    MainMemory: {
        blocks: [
            {
                blockId: '0',
                address: '0x0',
                data: '0x00'
            },
            {
                blockId: '1',
                address: '0x0',
                data: '0x00'
            },
            {
                blockId: '2',
                address: '0x0',
                data: '0x00'
            },
            {
                blockId: '3',
                address: '0x0',
                data: '0x00'
            },
            {
                blockId: '4',
                address: '0x0',
                data: '0x00'
            },
            {
                blockId: '5',
                address: '0x0',
                data: '0x00'
            },
            {
                blockId: '6',
                address: '0x0',
                data: '0x00'
            },
            {
                blockId: '7',
                address: '0x0',
                data: '0x00'
            }
        ]
    }

}
export default InitData;