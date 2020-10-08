import { puzzlesAndSolutions } from './puzzle-strings.js';


const textArea = document.getElementById('text-input');
const inputs = document.getElementsByClassName("sudoku-input");
const solveButton = document.getElementById("solve-button");
const clearButton = document.getElementById("clear-button");
const errorDiv = document.getElementById("error-msg");

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area and the grid
  const str = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
  setTextArea(str);
  setGrid(str)
});

solveButton.addEventListener("click", () => {
  const puzzle = parseString(getTextArea());
  const solution = getSolution(puzzle);
  if(solution !== null) {
    setTextArea(solution);
    setGrid(solution);
  }
});

clearButton.addEventListener("click", () => {
  setTextArea("");
  setGrid("");
});

textArea.addEventListener("change", () => {
  const str = getTextArea();
  for(var i = 0; i < str.length; i++) {
    if(!validateTextAreaCell(str.charAt([i]))) {
      return;
    }
  }

  setGrid(str);
});

Array.from(inputs).forEach(input => {
  input.addEventListener("change", () => {
    const str = getGrid();
    for(var i = 0; i < str.length; i++) {
      if(!validateGridCell(str.charAt([i]))) {
        return;
      }
    }

    setTextArea(str);
  });
});



function getGrid() {
  var ret = "";
  Array.from(inputs).forEach(input => {
    if(input.value === "") {
      ret += ".";
    } else {
      ret += input.value;
    }
  });

  return ret;
}

function setGrid(str) {
  Array.from(inputs).forEach((input, index) => {
    if(str.charAt(index) === ".") {
      input.value = "";
    } else {
      input.value = str.charAt(index);
    }
  })
}

function getTextArea(str) {
  return textArea.value;
}

function setTextArea(str) {
  textArea.value = str;
}

function parseString(str) {
  if(str.length !== 81) {
    errorDiv.innerHTML = "Error: Expected puzzle to be 81 characters long.";
  } else {
    errorDiv.innerHTML = "";
  }

  return new Puzzle(str);
}

function validateTextAreaCell(cell) {
  return validateGridCell(cell) || cell === ".";
}

function validateGridCell(cell) {
  return ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(cell);
}

function getSolution(puzzle) {
  for(var i = 0; i < puzzlesAndSolutions.length; i++) {
    if(puzzlesAndSolutions[i][0] == puzzle.str) {
      return puzzlesAndSolutions[i][1];
    }
  }

  return null;
}

class Puzzle {
  constructor(str) {
    this.str = str;
  }
}

function validateSolution(s) {
  for(var i = 1; i <= 9; i++) {
    if(s.match(new RegExp(i + "", "g")).length !== 9) {
      return false;
    }
  }

  return true;
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    validateGridCell,
    parseString,
    getSolution,
    validateSolution,

    setGrid,
    getTextArea,
    textArea,
    setTextArea,
    getGrid,
  }
} catch (e) {
  console.error(e);
}
