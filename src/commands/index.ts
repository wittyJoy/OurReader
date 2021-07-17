import axios from "axios";
import { window } from "vscode";
import { readerDriver } from "../reader";
import { TreeNode } from "../explorer/TreeNode";
import { explorerNodeManager } from "../explorer/explorerNodeManager";
import { treeDataProvider } from "../explorer/treeDataProvider";
import { previewProvider } from "../webview/PreviewProvider";

/** @连接IP一获取书架 */
const connectServerIP = async (serverIP: string) => {
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
export const openReaderWebView = (treeNode: TreeNode) => {
  readerDriver.getContent(treeNode).then((data: string) => {
    console.log("打开阅读窗口");
    previewProvider.show(data, treeNode);
  });
};
