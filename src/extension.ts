import { ExtensionContext, window, commands } from "vscode";
import { Commands, TREEVIEW_ID } from "./config";
import { treeDataProvider } from "./explorer/treeDataProvider";
import { openReaderWebView, getServerIP } from "./commands";

export function activate(context: ExtensionContext) {
  console.log("恭喜，您的扩展“vscode-Read”已被激活！");
  require("./helloword")(context);

  context.subscriptions.push(
    treeDataProvider,
    // 点击事件
    commands.registerCommand(Commands.openReaderWebView, (data) => openReaderWebView(data)),
    commands.registerCommand(Commands.getServerIP, () => getServerIP()),
    // 注册 TreeView
    window.createTreeView(TREEVIEW_ID, {
      treeDataProvider: treeDataProvider,
      showCollapseAll: true,
    })
  );
}

// 当您的扩展被停用时，调用此方法
export function deactivate() {
  console.log("您的扩展“vscode-Read”已被释放！");
}
