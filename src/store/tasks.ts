
export const sum = (salary: number, n: number) => salary + n;
export const sub = (salary: number, n: number) => salary - n;
export const div = (salary: number, n: number) => salary/n
export const mult = (salary: number, n: number) => salary*n

export type ActionType = {
    type: 'SUM' | ''
    n: number
}

export const salaryReducer = (salary: number, action: ActionType) => {
    switch (action.type) {
        case 'SUM':
            return salary + action.n
        default: return salary
    }
}



