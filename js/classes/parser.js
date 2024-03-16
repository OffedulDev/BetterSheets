export default class Parser {
    constructor(text) {
        this.text = text
    }

    isFormula() {
        return this.text.startsWith("=")
    }

    parseFormula() {
        var formula = this.text
        if (formula.startsWith("=")) {
            formula = formula.slice(1);
        }
      
        const functionMatch = formula.match(/([A-Z]+)\(/);
        if (functionMatch) {
          const functionName = functionMatch[1].toUpperCase(); 
      
          const args = [];
          let currentArg = "";
          let inNestedFormula = false;
      
          for (let i = functionMatch[0].length; i < formula.length; i++) {
            const char = formula[i];
      
            if (char === "(" && !inNestedFormula) {
                inNestedFormula = true;
                currentArg += char
            } else if (char === ")" && inNestedFormula) {
                inNestedFormula = false;

                currentArg += char
                if (i < formula.length - 1) {
                    let _parser = new Parser(currentArg)
                    args.push(_parser.parseFormula());
                }
                currentArg = "";
            } else if (char === "," && !inNestedFormula) {
                currentArg = currentArg.replace("(", "")
                currentArg = currentArg.replace(")", "")
                currentArg = currentArg.trim()
                args.push(currentArg);
                
                currentArg = "";
            } else {
                currentArg += char;
            }
          }
      
          if (currentArg.length > 1) {
            currentArg = currentArg.replace("(", "")
            currentArg = currentArg.replace(")", "")
            currentArg = currentArg.trim()
            
            args.push(currentArg);
          }
      
          return { formula: functionName, args };
        }
      
        const cellMatch = formula.match(/^[A-Z]+[0-9]+$/);
        if (cellMatch) {
          return cellMatch[0];
        }
      
        throw new Error(`Invalid formula: ${formula}`);
    }
}