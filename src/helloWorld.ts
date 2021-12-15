import * as vscode from 'vscode';

module.exports = function (context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
};
