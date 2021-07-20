import { ViewColumn } from "vscode";

export interface IReader {
  // 图书 ------------------------------------------------------------------------------------------
  /** 小说名 */
  name: "";
  /** 最近 */
  durChapterTitle: string;
  /** 最新 */
  latestChapterTitle: string;
  /** 阅读进度 */
  durChapterIndex: number;
  /** 小说地址 */
  bookUrl: string;

  // 目录 ------------------------------------------------------------------------------------------
  /** 章节名 */
  title: string;
  /** 章节序列号 */
  index: number;
}

export interface IWebviewOption {
  title: string;
  viewColumn: ViewColumn;
  preserveFocus?: boolean;
}

interface IWebViewMessage {
  command: string;
  data: any;
}

interface ReaderDriver {
  getChapter: (pathStr: string) => void;
  getContent: (path: string) => Promise<string>;
}
