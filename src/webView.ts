import { ExtensionContext, ViewColumn, WebviewPanel, window, commands } from 'vscode';
import * as vscode from 'vscode';
// 创建一个全局变量，类型为：WebviewPanel 或者 undefined
let webviewPanel: WebviewPanel | undefined;

export function createWebView(
	context: ExtensionContext,
	viewColumn: ViewColumn, // 窗口编辑器
	label: string
) {
	if (webviewPanel === undefined) {
		webviewPanel = window.createWebviewPanel('webView', label, viewColumn, {
			retainContextWhenHidden: true, // 控制是否保持webview面板的内容（iframe），即使面板不再可见。
			enableScripts: true, // 下面的 html 页可以使用 Scripts
		});

		webviewPanel.webview.html = getIframeHtml(label);
	} else {
		// 面板存在，重新设置标题
		webviewPanel.title = label;
		webviewPanel.reveal();
	}

	// 关闭面板
	webviewPanel.onDidDispose(() => {
		webviewPanel = undefined;
	});

	return webviewPanel;
}

export function getIframeHtml(label: string) {
	return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>
        </head>

        <body>
		<h1>webview测试</h1>
        <iframe id='iframe1' class="iframeDiv" src="http://www.baidu.com/" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}

module.exports = function (context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('itemClick', (label) => {
			vscode.window.showInformationMessage(label);

			// vscode.ViewColumn.Active: 表示当前选中的面板
			const webView = createWebView(context, vscode.ViewColumn.Active, label);
			context.subscriptions.push(webView);
		})
	);
};
