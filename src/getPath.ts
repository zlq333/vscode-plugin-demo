import * as vscode from 'vscode';

module.exports = function (context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'extension.getCurrentFilePath',
		(uri) => {
			vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
		}
	);

	context.subscriptions.push(disposable);
};
