import { window, commands } from "vscode";
import { ButtonManager } from "./button";
import { openReaderWebView } from "../commands";
import { TreeNode } from "../explorer/TreeNode";
let bookChapter: any;
let bookNode: any;
let bookName: string;
let index = 0;
let maxIndex = 0;
let list: string[];
export const showText = async (chapter: TreeNode[], treeNode: TreeNode, data: string) => {
  // window.showInformationMessage("小说の一行");
  bookChapter = chapter as any;
  bookNode = treeNode as any;
  treeNode.name ? (bookName = treeNode.name) : "";
  const textLength = 30;
  list = data.replace(/^\s*/, "").split("\n　　");
  const chunk = (arr: string, size: number) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    let aa = chunk(item, textLength);
    list.splice(i, 1, ...aa);
  }
  list = list.map((v) => v.padEnd(textLength));
  maxIndex = list.length;
  ButtonManager.buttonTitle(`${bookName}-${treeNode.title || treeNode.durChapterTitle}`);
  ButtonManager.buttonContext(list[index]);
};
export const prevRow = async () => {
  if (index <= 0) {
    prevChapter();
    return;
  }
  index--;
  ButtonManager.buttonContext(list[index]);
};
export const nextRow = async () => {
  if (index >= maxIndex - 1) {
    nextChapter();
    return;
  }
  index++;
  ButtonManager.buttonContext(list[index]);
};
export const prevChapter = async () => {
  bookNode.index = bookNode.durChapterIndex === undefined ? bookNode.index : bookNode.durChapterIndex;
  bookNode = bookChapter.filter((v: any) => v.index === bookNode.index - 1)[0];
  bookNode ? openReaderWebView(bookNode) : window.showInformationMessage("已经是第一章了");
};
export const nextChapter = async () => {
  bookNode.index = bookNode.durChapterIndex || bookNode.index;
  bookNode = bookChapter.filter((v: any) => v.index === bookNode.index + 1)[0];
  bookNode ? openReaderWebView(bookNode) : window.showInformationMessage("已经是最后一章了");
};
