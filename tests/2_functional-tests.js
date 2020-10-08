/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });
  
  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates 
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {
      Solver.textArea.value = "9";
      Solver.setGrid(Solver.getTextArea());
      
      assert.equal("9", document.getElementById("A1").value);
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      document.getElementById("A1").value = "3";
      Solver.setTextArea(Solver.getGrid());

      assert.equal("3", Solver.textArea.value.substr(0, 1));
      done();
    });
  });
  
  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearInput()', done => {
      const input = "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51";
      Solver.setGrid(Solver.getTextArea());
      Solver.textArea.value = input;

      document.getElementById("clear-button").click();

      assert.equal("", Solver.textArea.value);
      assert.equal("", document.getElementById("A1").value);

      done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      const input = "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51";
      Solver.textArea.value = input;
      document.getElementById("solve-button").click();

      assert.equal(Solver.textArea.value, "827549163531672894649831527496157382218396475753284916962415738185763249374928651");
      assert.equal(Solver.getGrid(), "827549163531672894649831527496157382218396475753284916962415738185763249374928651");

      done();
    });
  });
});

