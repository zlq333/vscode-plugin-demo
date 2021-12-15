import * as vscode from 'vscode';

module.exports = function (context: vscode.ExtensionContext) {
	const disposable = vscode.languages.registerCompletionItemProvider('typescript', {
		provideCompletionItems(
			document: vscode.TextDocument,
			position: vscode.Position,
			token: vscode.CancellationToken,
			context: vscode.CompletionContext
		) {
			// a simple completion item which inserts `Hello World!`
			const simpleCompletion = new vscode.CompletionItem('Hello World!');

			const snippetCompletion = new vscode.CompletionItem('Good part of the day');
			snippetCompletion.insertText = new vscode.SnippetString(
				'Good ${1|morning,afternoon,evening|}. It is ${1}, right?'
			);
			// return all completion items as array
			return [simpleCompletion, snippetCompletion];
		},
	});

	context.subscriptions.push(disposable);
};
