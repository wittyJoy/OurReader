// 提供treeviewの数据
import * as vscode from "vscode";
import { TreeNode } from "./TreeNode";
import { explorerNodeManager } from "./explorerNodeManager";
import { Commands } from "../config";

class TreeDataProvider implements vscode.TreeDataProvider<TreeNode>, vscode.Disposable {
  // private context: vscode.ExtensionContext;
  private onDidChangeTreeDataEvent: vscode.EventEmitter<TreeNode | undefined | null> = new vscode.EventEmitter<TreeNode | undefined | null>();

  // 改变树数据(只读)
  public readonly onDidChangeTreeData: vscode.Event<any> = this.onDidChangeTreeDataEvent.event;

  // 初始化
  public initialize(): void {
    // ...
  }

  // 拥有
  public dispose() {
    this.fire();
  }

  // 激发
  fire(): void {
    this.onDidChangeTreeDataEvent.fire(undefined);
  }

  /** 获取节点 */
  public getTreeItem(element: TreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    console.log("这里要返回最终显示的");
    return {
      label: element.name || element.title,
      tooltip: element.name
        ? `最近:${element.durChapterTitle}
最新:${element.latestChapterTitle}`
        : "",
      iconPath: "../../images/read.svg", // -----------------根节点--------------------------------------子节点------------
      collapsibleState: element.name ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed,
      command: {
        title: element.name || element.title,
        command: Commands.openReaderWebView,
        arguments: [element],
      },
    };
  }

  /** 获取目录(Ⅱ级节点) */
  public async getChildren(element?: TreeNode | undefined) {
    console.log("目录(Ⅱ级节点)㈠", element);
    if (!element) {
      return explorerNodeManager.getChildren();
    }
    return await explorerNodeManager.getChapter(element);
  }
}

export const treeDataProvider: TreeDataProvider = new TreeDataProvider();
