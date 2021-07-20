import { window, workspace } from "vscode";
import { readerDriver } from "../reader";
import { TreeNode } from "../explorer/TreeNode";
import { explorerNodeManager } from "../explorer/explorerNodeManager";
import { treeDataProvider } from "../explorer/treeDataProvider";
import { previewProvider } from "../webview/PreviewProvider";
import { showText } from "../text-view/showText";
let bookChapter: any;
/** @连接IP一获取书架 */
const connectServerIP = async (serverIP: string) => {
  serverIP = "192.168.3.72:1111";
  const data = await readerDriver.getBookshelf(serverIP);
  treeDataProvider.fire();
  explorerNodeManager.treeNode = data;
};

/** @获取输入の阅读web服务地址 */
export const getServerIP = async () => {
  try {
    const serverIP = await window.showInputBox({
      password: false,
      ignoreFocusOut: false,
      placeHolder: "请输入阅读のweb服务地址，例：192.168.3.72:1111",
      prompt: "",
    });
    if (serverIP) {
      connectServerIP(serverIP);
    }
  } catch (error) {
    console.warn(error);
  }
};

/** @打开阅读窗口 */
export const openReaderWebView = async (treeNode: TreeNode) => {
  if (!bookChapter) bookChapter = await readerDriver.getChapter(treeNode);
  readerDriver.getContent(treeNode).then((data: string) => {
    const vConfig = workspace.getConfiguration("o_reader");
    const read_window = vConfig.get("read_window");
    console.log("打开%s阅读窗口", read_window, treeNode);
    switch (read_window) {
      case "状态栏":
        showText(bookChapter, treeNode, data);
        break;
      case "控制台":
        const rcsoutput = window.createOutputChannel("阅读");
        rcsoutput.appendLine(data);
        rcsoutput.show();
        break;
      case "编辑器":
        previewProvider.show(data, treeNode);
        break;
    }
  });
};
