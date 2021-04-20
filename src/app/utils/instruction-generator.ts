import { Instruction, InstructionState, Operation } from '../models/Models';
export class InstructionGenerator {
    private instruction: Instruction = {
        address: '',
        nodeId: '',
        operation: Operation.NOP,
        state: InstructionState.NULL,
        value: ''
    }
    private seed: number = -1;
    constructor(seed: number) {
        if (seed) {
            this.seed = seed;
        } else {
            this.seed = Date.now();
        }
    }

    /**
     * Esta función retorna un objeto Instruction con el siguiente formato.
     * {
     *  op: [CALC, READ, WRITE],
     *  value: optional: valor hexadecimal de dós dígitos, se usa sólo para operación de escritura.
     *  address:  dirección que aplica solo cuando la operación es lectura o de escritura
     * }
     */
    generateInstruction(processorId: string) {
        // this.seed = Date.now()*(processorId+1);
        const pseudo_uniform_aux = (mult: number, mod: number, seed: number, size: number) => {
            const U = Array(size).fill(0);
            let x = (seed * mult + 1) % mod;
            U[0] = x / mod;
            for (let index = 1; index < U.length; index++) {
                x = (x * mult + 1) % mod;
                U[index] = x / mod;
            }
            return U[size - 1];
        }
        const pseudo_uniform = (low: number, high: number) => {
            return Math.floor(low + (high - low) * pseudo_uniform_aux(16807, (2 ** 31) - 1, this.seed, 10));
        }
        const instructionTypes = [Operation.CALC, Operation.READ, Operation.WRITE];
        const randomValueForInstruction = pseudo_uniform(0, 3);
        const resultInstruction = instructionTypes[randomValueForInstruction];
        const instruction : Instruction = {
            nodeId: processorId,
            operation: instructionTypes[randomValueForInstruction],
            address: '',
            state: InstructionState.PENDING,
            value: ''
        }
        switch (resultInstruction) {
            case Operation.CALC:
                break;
            case Operation.WRITE:
                instruction.value = `0x${pseudo_uniform(0, 2 ** 8 - 1)}`;
                instruction.address = `0x${pseudo_uniform(0, 7)}`;
                break;
            case Operation.READ:
                instruction.address = `0x${pseudo_uniform(0, 7)}`;
                break;
            default:
                break;
        }
        //console.log(instruction);
        return instruction;
    }
}
