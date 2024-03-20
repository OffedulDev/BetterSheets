import parseExpression from "../utility.js"

export default function divide(parsed_arguments, spreadsheet) {
    let _quotient = 0
    let _dividend = parseExpression(parsed_arguments[0], spreadsheet)
    let _divisor = parseExpression(parsed_arguments[1], spreadsheet)
    _quotient = _dividend / _divisor

    return _quotient
}