import * as vscode from 'vscode';

describe('Extension Test Suite', () => {
    beforeEach(() => {
        jest.spyOn(vscode.window, 'showInformationMessage').mockImplementation();
    });

    test('Sample test', () => {
        expect([1, 2, 3].indexOf(5)).toBe(-1);
        expect([1, 2, 3].indexOf(0)).toBe(-1);
    });
});
