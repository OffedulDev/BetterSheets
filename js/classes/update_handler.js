export default class UpdateHandler {
    constructor(cell, spreadsheet) {
        this.cell = cell
        this.spreadsheet = spreadsheet
    }

    getCellsThatUseThisCell() {
        let cells = []
        let columns = this.spreadsheet.columns
        for (let col_idx = 0; col_idx<columns.length; col_idx++) {
            let column = columns[col_idx]
            for (let row_idx = 0; row_idx<column.cells.length; row_idx++) {
                let _cell = column.cells[row_idx]
                if (_cell.formula.toLowerCase().includes(this.cell.getId().toLowerCase())) {
                    cells.push(_cell)
                }
            }
        }

        return cells
    }

    runUpdate() {
        let cells_affected = this.getCellsThatUseThisCell()
        console.log(cells_affected)
        for (let cell_idx = 0; cell_idx<cells_affected.length; cell_idx++) {
            let _cell = cells_affected[cell_idx]
            _cell.onChange(_cell.formula) // simulate change to update the cell
        }
    }
}