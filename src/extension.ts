// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

exports.activate = (context: vscode.ExtensionContext) => {
	console.log('插件激活------------');
	// command
	require('./helloWorld')(context);

	// 获取路径
	require('./getPath')(context);

	// 悬浮提示
	require('./hover')(context);

	// 自动补全
	require('./completion')(context);

	// 跳转到自定义
	require('./jumpDefinetion')(context);

	// treeView
	require('./viewContainer')(context);

	// webView
	require('./webView')(context);
};

exports.deactivate = function () {
	console.log('插件关闭------------');
};
