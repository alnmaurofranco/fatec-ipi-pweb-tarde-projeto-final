export function sum(a, b) {
    return {
        type: 'SUM',
        payload: [a, b]
    }
}