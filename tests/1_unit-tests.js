/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let Solver;

suite('UnitTests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = dom.window.document;

        Solver = require('../public/sudoku-solver.js');
      });
  });
  
  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite('Function validateGridCell()', () => {
    test('Valid "1-9" characters', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      for(var i = 0; i < input.length; i++) {
        let res = Solver.validateGridCell(input[i]);
        assert.isTrue(res);
      }
      done();
    });

    // Invalid characters or numbers are not accepted 
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      for(var i = 0; i < input.length; i++) {
        const res = Solver.validateGridCell(input[i]);
        assert.isFalse(res);
      }
      done();
    });
  });
  
  suite('Function parseString()', () => {
    test('Parses a valid puzzle string into an object', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const res = Solver.parseString(input);
      assert.isObject(res);
      done();
    });
    
    // Puzzles that are not 81 numbers/periods long show the message 
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 characters long.';
      const errorDiv = document.getElementById('error-msg');
      
      Solver.parseString(shortStr);
      assert.equal(errorDiv.innerHTML, errorMsg);
      Solver.parseString(longStr)
      assert.equal(errorDiv.innerHTML, errorMsg);
      done();
    });
  });

  suite('Function validateSolution()', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const input = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      const res = Solver.validateSolution(input);
      assert.isTrue(res);
      done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const input = '779235418851496372432178956174569283395842761628713549283657194516924837947381625';
      const res = Solver.validateSolution(input);
      assert.isFalse(res);
      done();
    });
  });
  
  
  suite('Function getSolution()', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
      const solution = '827549163531672894649831527496157382218396475753284916962415738185763249374928651';
      const puzzle = Solver.parseString(input);

      const res = Solver.getSolution(puzzle);
      assert.equal(solution, res);
      done();
    });
  });
});
