import Parser from "./parser.js";
import Dispatcher from "./dispatcher.js";
const cell_template = document.getElementById("cell-template")

// PREFERENCES
const AUTO_LOAD_AFTER_FORMULA = true
const UPDATE_INTERVAL = 250

export default class Cell {
    constructor(column, row, parent_spreadsheet) {
        this.column = column;
        this.row = row;
        this.parent_spreadsheet = parent_spreadsheet
        
        this.output = ""
        this.formula = ""
        this._visual_cell = cell_template.cloneNode(true);
        this._input_node = this._visual_cell.getElementsByClassName("inner-input")[0]
        this._visual_cell.id = row.toString()
    }

    onChange() {
        let _parser = new Parser(this._input_node.value)
        if (_parser.isFormula()) {
            let _result = _parser.parseFormula()
            let _dispatcher = new Dispatcher(_result, this.parent_spreadsheet)
            this.output = _dispatcher.dispatch()
            this.formula = this._input_node.value

            if (AUTO_LOAD_AFTER_FORMULA) {
                this._input_node.value = this.output
            }
        } else {
            if (this.formula.length > 1) {
                this.formula = ""
            }

            this.output = this._input_node.value
        }
    }

    startListening() {
        this._visual_cell.addEventListener("mouseenter", () => {
            if (this.formula.length > 1) {
                this._input_node.value = this.formula
            }
        })

        this._visual_cell.addEventListener("mouseleave", () => {
            if (this.formula.length > 1) {
                this._input_node.value = this.output
            }
        })

        this._input_node.addEventListener("change", () => {
            this.onChange()
        })

        this.__last_output = this.output
        setInterval(() => {
            if (this.output != this.__last_output) {
                this.__last_output = this.output
            }
        }, UPDATE_INTERVAL)
    }
}