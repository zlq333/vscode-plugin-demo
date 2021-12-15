import * as vscode from 'vscode';
const path = require('path');
const fs = require('fs');

module.exports = function (context: vscode.ExtensionContext) {
	class MyProvider implements vscode.DefinitionProvider {
		provideDefinition(
			document: vscode.TextDocument,
			position: vscode.Position
		): vscode.ProviderResult<vscode.Definition> {
			const fileName = document.fileName;
			const workDir = path.dirname(fileName);
			const word = document.getText(document.getWordRangeAtPosition(position));
			const line = document.lineAt(position);

			console.log('fileName: ' + fileName); // 当前文件名
			console.log('workDir: ' + workDir); // 当前文件所在目录
			console.log('word: ' + word); // 当前光标所在单词
			console.log('line: ' + line.text); // 当前光标所在行
			if (fileName.indexOf('package.json')) {
				console.log(word, line.text);
				const json = document.getText();
				if (
					new RegExp(
						`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(
							/\//g,
							'\\/'
						)}[\\s\\S]*?\\}`,
						'gm'
					).test(json)
				) {
					let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/README.md`;
					if (fs.existsSync(destPath)) {
						// new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
						return new vscode.Location(
							vscode.Uri.file(destPath),
							new vscode.Position(0, 0)
						);
					}
				}
			}
		}
	}

	const disposable = vscode.languages.registerDefinitionProvider('json', new MyProvider());

	context.subscriptions.push(disposable);
};
