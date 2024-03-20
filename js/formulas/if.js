import parseExpression from "../utility.js"

export default function _if(parsed_arguments, spreadsheet) {
    let criteria = parsed_arguments[0]

    let delimiter = criteria.match(/[^a-zA-Z0-9\s]/)
    let criteria_parts = criteria.split(delimiter)
    let first_criteria_part = criteria_parts[0] 
    let second_criteria_part = criteria_parts[1]
    first_criteria_part = parseExpression(first_criteria_part, spreadsheet)
    second_criteria_part = parseExpression(second_criteria_part, spreadsheet)

    let eval_string = first_criteria_part + delimiter + second_criteria_part
    let value_if_true = parsed_arguments[1]
    let value_if_false = parsed_arguments[2]
    if (value_if_true == null) { value_if_true = "TRUE" }
    if (value_if_false == null) { value_if_false = "FALSE" }

    value_if_true = parseExpression(value_if_true, spreadsheet)
    value_if_false = parseExpression(value_if_false, spreadsheet)

    let eval_result = eval(eval_string)
    if (eval_result == false) {
        return value_if_false
    } else {
        return value_if_true
    }
}