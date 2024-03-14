// TEMPLATES
var cell_template = document.getElementById("cell-template")
var cells_container = document.getElementById("cells-container")
var row_template = document.getElementById("row-template")
var heading_cell_template = document.getElementById("heading-cell-template")

// DATA
var cells_for_row = 6
var cells_rows = 12

// CODE
function parseFunction(text) {
    text = text.substring(1, text.length)
    args = text.split("(")
    function_name = args[0]
    
    raw_function_arguments = args[1]
    raw_function_arguments = raw_function_arguments.substring(0, raw_function_arguments.length - 1)
    function_arguments = raw_function_arguments.replace(/\s/g, "");
    function_arguments = function_arguments.toLowerCase()
    function_arguments = function_arguments.split(",")

    return [
        function_name.trim(),
        function_arguments
    ]
}

function processFunction(cell, text) {
    var output_cell = cell
    output_cell.setAttribute("formula", text)

    var functionData = parseFunction(text)
    var requested_function = functionData[0]
    var function_arguments = functionData[1]

    
    console.log(requested_function);
    console.log(function_arguments);

    if (requested_function == 'SUM') {
        var sum = 0;
        for (var c = 0; c<function_arguments.length; c++) {
            var cell = function_arguments[c]
            cell = document.getElementById(cell)

            sum = sum + parseInt(cell.getElementsByClassName("inner-input")[0].value)
        }
        
        output_cell.getElementsByClassName("inner-input")[0].value = sum.toString()
        output_cell.setAttribute("output", sum)
    } else if (requested_function == 'DIVIDE') {
        var cell_1 = parseInt(document.getElementById(function_arguments[0]).getElementsByClassName("inner-input")[0].value)
        var cell_2 = parseInt(document.getElementById(function_arguments[1]).getElementsByClassName("inner-input")[0].value)
        var quotient = cell_1 / cell_2
        
        output_cell.setAttribute("output", quotient)
        output_cell.getElementsByClassName("inner-input")[0].value = quotient.toString()
    }
}

function processCellText(cell, text) {
    if (text.startsWith("=")) {
        processFunction(cell, text)
    } else {
        if (cell.getAttribute("formula")) {
            cell.removeAttribute("formula")
            cell.removeAttribute("output")
        }
    }
}

// ATTRIBUTE CHANGE OBSERVER
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation){
        if (mutation.type == "attributes") {
            // WIP
        }
    })
})

for (var row = 0; row<cells_rows; row++) {
    var row_element = row_template.cloneNode(true);
    cells_container.appendChild(row_element)

    var letter = String.fromCharCode(97 + row)
    var heading_cell = heading_cell_template.cloneNode(true);
    heading_cell.innerHTML = letter;

    row_element.appendChild(heading_cell);

    for (var cell = 1; cell<cells_for_row; cell++) {
        var T = cell_template.cloneNode(true);
        T.id = letter.concat(cell.toString())
        row_element.appendChild(T);
        
        T.addEventListener("mouseenter", function(){
            if (this.getAttribute("formula")) {
                this.getElementsByClassName("inner-input")[0].value = this.getAttribute("formula")
            }
        })

        T.addEventListener("mouseleave", function(){
            if (this.getAttribute("output")) {
                this.getElementsByClassName("inner-input")[0].value = this.getAttribute("output")
            }
        })
        observer.observe(T, {
            attributes: true
        })

        var input_obj = T.getElementsByClassName("inner-input")[0]
        input_obj.addEventListener("change", function() {
            processCellText(this.parentElement, this.value);
        })
    }
}