// deno-lint-ignore-file no-explicit-any
export function selectStr (obj: any) {
    const keys = Object.keys(obj).filter(value => value !== 'initialized')

    return keys.join(', ')
}