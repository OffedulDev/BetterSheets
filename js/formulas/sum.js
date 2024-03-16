import Dispatcher from "../classes/dispatcher.js"
import parseExpression from "../utility.js"

export default function sum(parsed_arguments, spreadsheet) {
    let _sum = 0
    for (let i = 0; i<parsed_arguments.length; i++) {
        let arg = parsed_arguments[i]
        _sum += parseExpression(arg, spreadsheet)
    }

    return _sum
}