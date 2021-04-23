import { CacheL1BlockState, CacheL2BlockState, CEContext } from '../models/Models'
export const InitData: CEContext = {


    NODES: [
        {
            nodeId: '0',
            cacheL1: [
                { blockId: '0', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
                { blockId: '1', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
            ]
        },
        {
            nodeId: '1',
            cacheL1: [
                { blockId: '0', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
                { blockId: '1', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
            ]
        },
        {
            nodeId: '2',
            cacheL1: [
                { blockId: '0', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
                { blockId: '1', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
            ]
        },
        {
            nodeId: '3',
            cacheL1: [
                { blockId: '0', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
                { blockId: '1', address: '0x0', data: '0x0', state: CacheL1BlockState.INVALID },
            ]
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
                data: '0x10'
            },
            {
                blockId: '1',
                address: '0x1',
                data: '0x11'
            },
            {
                blockId: '2',
                address: '0x2',
                data: '0x12'
            },
            {
                blockId: '3',
                address: '0x3',
                data: '0x13'
            },
            {
                blockId: '4',
                address: '0x4',
                data: '0x14'
            },
            {
                blockId: '5',
                address: '0x5',
                data: '0x15'
            },
            {
                blockId: '6',
                address: '0x6',
                data: '0x16'
            },
            {
                blockId: '7',
                address: '0x7',
                data: '0x17'
            }
        ]
    }

}
export default InitData;