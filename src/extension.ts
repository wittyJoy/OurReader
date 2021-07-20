import { ExtensionContext, window, commands, workspace } from "vscode";
import { Commands, TREEVIEW_ID } from "./config";
import { treeDataProvider } from "./explorer/treeDataProvider";
import { openReaderWebView, getServerIP } from "./commands";
import { ButtonManager } from "./text-view/button";
import { prevRow, nextRow, prevChapter, nextChapter } from "./text-view/showText";

export function activate(context: ExtensionContext) {
  console.log("恭喜，您的扩展“vscode-Read”已被激活！");
  require("./helloword")(context);
  ButtonManager.context = context;
  ButtonManager.init();

  context.subscriptions.push(
    treeDataProvider,
    commands.registerCommand(Commands.getServerIP, () => getServerIP()),
    commands.registerCommand(Commands.openReaderWebView, (data) => openReaderWebView(data, true)),
    // 注册 TreeView
    window.createTreeView(TREEVIEW_ID, {
      treeDataProvider: treeDataProvider,
      showCollapseAll: true,
    }),

    commands.registerCommand(Commands.setWindow, async () => {
      const vConfig = workspace.getConfiguration("o_reader");
      const old_read_window = vConfig.get("read_window");
      const result = await window.showQuickPick([{ label: "状态栏" }, { label: "编辑器" }, { label: "控制台" }], {
        placeHolder: "小说阅读窗口, 当前设置: " + old_read_window,
        canPickMany: false,
      });
      // if (result && result.label && result.label !== old_read_window) {
      //   vConfig.update("read_window", result.label, true);
      //   ButtonManager.hide();
      //   switch (result.label) {
      //     case "编辑器":
      //       break;
      //     case "控制台":
      //       break;
      //     case "状态栏":
      //       ButtonManager.show();
      //       break;
      //   }
      // }
    }),
    commands.registerCommand(Commands.prevRow, () => prevRow()),
    commands.registerCommand(Commands.nextRow, () => nextRow()),
    commands.registerCommand(Commands.prevChapter, () => prevChapter()),
    commands.registerCommand(Commands.nextChapter, () => nextChapter())
  );
}

// 当您的扩展被停用时，调用此方法
export function deactivate() {
  console.log("您的扩展“vscode-Read”已被释放！");
}
