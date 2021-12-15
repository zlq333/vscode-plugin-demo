import * as vscode from "vscode";

module.exports = function (context: vscode.ExtensionContext) {
  const disposable = vscode.languages.registerHoverProvider("typescript", {
    provideHover(document, position, token) {
      const fileName = document.fileName;
      const word = document.getText(document.getWordRangeAtPosition(position));
      if (/\.ts$/.test(fileName) && /\bconst\b/.test(word)) {
        return new vscode.Hover("测试悬停提示-------" + word);
      }
    },
  });

  context.subscriptions.push(disposable);
};
