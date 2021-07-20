import axios from "axios"; // import
import { TreeNode } from "../explorer/TreeNode";
import { Notification } from "../utils/notification";
import request from "../utils/request";

// 书架 `/getBookshelf`;
// 目录 `/getChapterList?url=${bookUrl}`;
// 正文 `/getBookContent?url=${bookUrl}&index=${durChapterIndex}`;

class ReaderDriver {
  private SERVER_IP = "";

  /** @获取阅读の书架 */
  public getBookshelf(serverIP: string): Promise<TreeNode[]> {
    this.SERVER_IP = serverIP;
    return new Promise(async (resolve) => {
      let res = await request({ url: `http://${this.SERVER_IP}/getBookshelf`, method: "get" });
      console.log("获取阅读の书架", res.data);
      resolve(res.data);
    });
  }
  /** @获取图书の目录 */
  public getChapter(treeNode: TreeNode): Promise<TreeNode[]> {
    return new Promise(async (resolve) => {
      let res = await request({ url: `http://${this.SERVER_IP}/getChapterList?url=${treeNode.bookUrl}`, method: "get" });
      console.log("获取图书の目录", res.data);
      resolve(res.data);
    });
  }
  /** @获取章节の内容 */
  public getContent(treeNode: TreeNode): Promise<string> {
    return new Promise(async (resolve) => {
      let res = await request({
        url: `http://${this.SERVER_IP}/getBookContent?url=${treeNode.bookUrl}&index=${
          treeNode.durChapterIndex === undefined ? (treeNode.index === undefined ? 0 : treeNode.index) : treeNode.durChapterIndex || 0
        }`,
        method: "get",
      });
      console.log("获取章节の内容", res.data);
      resolve(res.data);
    });
  }
}

export const readerDriver: ReaderDriver = new ReaderDriver();
