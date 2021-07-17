import { Command } from "vscode";
import { Commands } from "../config";
import { IReader } from "../@types";

/** 默认 */
export const defaultProblem: IReader = {
  // 图书 ------------------------------------------------------------------------------------------
  /** 小说名 */
  name: "",
  /** 最近 */
  durChapterTitle: "",
  /** 最新 */
  latestChapterTitle: "",
  /** 阅读进度 */
  durChapterIndex: 0,
  /** 小说地址 */
  bookUrl: "",

  // 目录 ------------------------------------------------------------------------------------------
  /** 章节名 */
  title: "",
  /** 章节序列号 */
  index: 0,
};

export class TreeNode {
  constructor(private data: IReader) {}
  // 图书 ------------------------------------------------------------------------------------------
  public get name(): string {
    return this.data.name;
  }
  public get durChapterTitle(): string {
    return this.data.durChapterTitle;
  }
  public get latestChapterTitle(): string {
    return this.data.latestChapterTitle;
  }
  public get durChapterIndex(): number {
    return this.data.durChapterIndex;
  }
  public get bookUrl(): string {
    return this.data.bookUrl;
  }

  // 目录 ------------------------------------------------------------------------------------------
  public get title(): string {
    return this.data.title;
  }
  public get index(): number {
    return this.data.index;
  }

  public get previewCommand(): Command {
    return {
      title: this.data.name,
      command: Commands.openReaderWebView,
      arguments: [this],
    };
  }
}
