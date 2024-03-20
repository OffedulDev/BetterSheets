import Column from "./column.js"
const cells_container = document.getElementById("cells-container")

export default class Spreadsheet {
    constructor(cells_per_column, columns_amount) {
        this.cells_per_column = cells_per_column
        this.columns_amount = columns_amount
        
        this.columns = []
        for (let column = 0; column<this.columns_amount; column++) {
            this.columns[column] = new Column(column, this.cells_per_column, this)
            cells_container.appendChild(this.columns[column]._column_visual)

            this.columns[column].startListening()
        } 
    }

    get_cell(_cell) {
        let col = _cell.charCodeAt(0) - 97
        let row = _cell.substring(1, _cell.length)
        col = parseInt(col)
        row = parseInt(row) - 1
        col = this.columns[col]

        let cell = col.cells[row]
        return cell
    }
}