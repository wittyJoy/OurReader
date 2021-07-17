import { Disposable } from "vscode";
import { TreeNode } from "./TreeNode";
import { readerDriver } from "../reader";

class ExplorerNodeManager implements Disposable {
  public treeNode: TreeNode[] = [];

  /** 获取节点 */
  public getChildren(): TreeNode[] {
    console.log("获取节点", this.treeNode);
    return this.treeNode;
  }

  /** 获取目录(Ⅱ级节点) */
  public getChapter(treeNode: TreeNode): Promise<TreeNode[]> {
    console.log("目录(Ⅱ级节点)㈡", treeNode);
    return readerDriver.getChapter(treeNode);
  }
  public dispose(): void {
    this.treeNode = [];
  }
}

export const explorerNodeManager: ExplorerNodeManager = new ExplorerNodeManager();
