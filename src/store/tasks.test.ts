import {salaryReducer, sub, sum} from "./tasks";


test('sum', () => {
    const salary: number = 700;
    const n: number = 200;

    const result = sum(salary, n)

    expect(result).toBe(900)
})

test('sub', () => {
    const salary: number = 700;
    const n: number = 200;

    const result = sub(salary, n)

    expect(result).toBe(500)
})

test('salary Reducer', () => {
    const result = salaryReducer(700, {type: '', n: 100})

    expect(result).toBe(700)
})