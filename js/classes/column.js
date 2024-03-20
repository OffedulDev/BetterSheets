import Cell from "./cell.js";
const row_template = document.getElementById("row-template")
const heading_cell_template = document.getElementById("heading-cell-template")

export default class Column {
    constructor(index, cells_per_column, parent_spreadsheet) {
        this.index = index;
        this.letter = String.fromCharCode(97 + this.index);
        this.parent_spreadsheet = parent_spreadsheet
        
        this._heading_cell = heading_cell_template.cloneNode(true);
        this._heading_cell.innerHTML = this.letter
        this._column_visual = row_template.cloneNode(true);
        this._column_visual.appendChild(this._heading_cell);
        this._column_visual.id = this.letter
        
        this.cells = [];
        for (let i = 0; i<cells_per_column; i++) {
            this.cells[i] = new Cell(this.index, i, parent_spreadsheet);
            this._column_visual.appendChild(this.cells[i]._visual_cell)
        }
    }

    startListening() {
        for (let i = 0; i<this.cells.length; i++) {
            let cell = this.cells[i]
            cell.startListening()
        }
    }
}