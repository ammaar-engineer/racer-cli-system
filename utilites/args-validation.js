export function argsValidation(arr) {
    if (arr.includes(undefined)) {
        console.log("Invalid args")
        return false
    }
    return true
}