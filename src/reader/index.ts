import axios from "axios"; // import
import { TreeNode } from "../explorer/TreeNode";
import { Notification } from "../utils/notification";

// 书架 `/getBookshelf`;
// 目录 `/getChapterList?url=${bookUrl}`;
// 正文 `/getBookContent?url=${bookUrl}&index=${durChapterIndex}`;

class ReaderDriver {
  private SERVER_IP = "";

  /** @获取阅读の书架 */
  public getBookshelf(serverIP: string): Promise<TreeNode[]> {
    this.SERVER_IP = serverIP;
    const notification = new Notification(`连接中: ${serverIP}`);
    return new Promise(async (resolve) => {
      let response = await axios({ url: `http://${this.SERVER_IP}/getBookshelf`, method: "get" });
      const res = response.data;
      console.log("获取阅读の书架", res.data);
      notification.stop();
      if (res.isSuccess) resolve(res.data);
    });
  }
  /** @获取图书の目录 */
  public getChapter(treeNode: TreeNode): Promise<TreeNode[]> {
    const notification = new Notification(`请求中...`);
    return new Promise(async (resolve) => {
      try {
        let response = await axios({ url: `http://${this.SERVER_IP}/getChapterList?url=${treeNode.bookUrl}`, method: "get" });
        const res = response.data;
        console.log("获取图书の目录", res.data);
        notification.stop();
        if (res.isSuccess) resolve(res.data);
      } catch (error) {
        console.log("catch", error);
        notification.stop();
      }
    });
  }
  /** @获取章节の内容 */
  public getContent(treeNode: TreeNode): Promise<string> {
    const notification = new Notification(`请求中...`);
    return new Promise(async (resolve) => {
      let response = await axios({
        url: `http://${this.SERVER_IP}/getBookContent?url=${treeNode.bookUrl}&index=${treeNode.durChapterIndex || treeNode.index || 0}`,
        method: "get",
      });
      const res = response.data;
      console.log("获取章节の内容", res.data);
      notification.stop();
      if (res.isSuccess) resolve(res.data);
    });
  }
}

export const readerDriver: ReaderDriver = new ReaderDriver();
