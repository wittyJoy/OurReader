import { window, ExtensionContext, StatusBarAlignment, StatusBarItem } from "vscode";

const BUTTON_KEY = "button-v1";

const enum Label {
  title, // 章节の标题
  prevChapter, // 上一章
  prevRow, // 上一行
  context, // 章节の一行
  nextRow, // 下一行
  nextChapter, // 下一章
}

export class ButtonManager {
  static context: ExtensionContext;

  private static readonly buttons: StatusBarItem[] = [
    window.createStatusBarItem(StatusBarAlignment.Left, -99992),
    window.createStatusBarItem(StatusBarAlignment.Left, -99991),
    window.createStatusBarItem(StatusBarAlignment.Left, -99994),
    window.createStatusBarItem(StatusBarAlignment.Left, -99996),
    window.createStatusBarItem(StatusBarAlignment.Left, -99995),
    window.createStatusBarItem(StatusBarAlignment.Left, -99993),
  ];

  private static buttonShow = Array(7).fill(true) as boolean[];
  static init(): void {
    ["$(book)", "$(debug-step-back)", "$(arrow-up)", "章节の一行", "$(arrow-down)", "$(debug-step-over)"].forEach((value, index) => (this.buttons[index].text = value));

    ["章节の标题", "上一章", "上一行", "章节の一行", "下一行", "下一章"].forEach((value, index) => (this.buttons[index].tooltip = value));

    [
      undefined, // "read_bar.title", // 章节の标题
      "read_bar.prevChapter", // 上一章
      "read_bar.prevRow", // 上一行
      undefined, // "read_bar.context", // 章节の一行
      "read_bar.nextRow", // 下一行
      "read_bar.nextChapter", // 下一章
    ].forEach((value, index) => (this.buttons[index].command = value));

    // this.buttonShow = this.context.globalState.get(BUTTON_KEY, this.buttonShow);
    this.show();
  }

  static show(): void {
    this.buttons.forEach((v, i) => {
      if (this.buttonShow[i]) v.show();
      else v.hide();
    });
  }

  static hide(): void {
    for (const i of this.buttons) i.hide();
  }

  static buttonTitle(name?: string): void {
    this.buttons[Label.title].tooltip = name || "章节の标题";
  }

  static buttonContext(text?: string): void {
    this.buttons[Label.context].text = text || "章节の一行";
  }
}
