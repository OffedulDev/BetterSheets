import Parser from "./parser.js";
const cell_template = document.getElementById("cell-template")

export default class Cell {
    constructor(column, row, parent_spreadsheet) {
        this.column = column;
        this.row = row;
        this.parent_spreadsheet = parent_spreadsheet
        
        this.output = 0
        this.formula = ""
        
        this._visual_cell = cell_template.cloneNode(true);
        this._input_node = this._visual_cell.getElementsByClassName("inner-input")[0]
        this._visual_cell.id = row.toString()
    }

    onChange() {
        console.log(this._input_node.value)
        let _parser = new Parser(this._input_node.value)
        if (_parser.isFormula()) {
            let _result = _parser.parseFormula()
            
        }
    }

    startListening() {
        this._input_node.addEventListener("change", () => {
            this.onChange()
        })
    }
}