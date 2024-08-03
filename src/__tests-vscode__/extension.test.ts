import * as vscode from 'vscode';

// import * as assert from 'assert';
// import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import { suite } from 'mocha'; // Add this line

// suite('Extension Test Suite', () => {
// 	vscode.window.showInformationMessage('Start all tests.');

// 	test('Sample test', () => {
// 		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
// 		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
// 	});
// });
describe('Extension Test Suite', () => {
    beforeEach(() => {
        jest.spyOn(vscode.window, 'showInformationMessage').mockImplementation();
    });

    test('Sample test', () => {
        expect([1, 2, 3].indexOf(5)).toBe(-1);
        expect([1, 2, 3].indexOf(0)).toBe(-1);
    });
});