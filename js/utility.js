import Dispatcher from "./classes/dispatcher.js"

export default function parseExpression(expression, spreadsheet) {
    if ((typeof expression) == "string") {
        if ((/[a-zA-Z]/g).test(expression)) {
            let _cell = spreadsheet.get_cell(expression.toLowerCase()) // get cell in case argument is cell-like structure
            return parseInt(_cell.output)
        } else {
            return parseInt(expression)
        }
    } else {
        let _dispatcher = new Dispatcher(arg, spreadsheet)
        return _dispatcher.dispatch()
    }
}
