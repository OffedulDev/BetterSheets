import divide from "../formulas/divide.js"
import _if from "../formulas/if.js"
import sum from "../formulas/sum.js"

export default class Dispatcher {
    constructor(parse_result, spreadsheet) {
        this.parse_result = parse_result
        this.spreadsheet = spreadsheet
    }

    dispatch() {
        let formula = this.parse_result.formula
        if (formula == "SUM") {
            return sum(this.parse_result.args, this.spreadsheet)
        } else if (formula == "DIVIDE") {
            return divide(this.parse_result.args, this.spreadsheet)
        } else if (formula = "IF") {
            return _if(this.parse_result.args, this.spreadsheet)
        }
    }
}