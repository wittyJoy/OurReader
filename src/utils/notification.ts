import { ProgressLocation, ProgressOptions, window } from "vscode";

export class Notification {
  private isStop = false;
  private options: ProgressOptions = {
    location: ProgressLocation.Notification,
    title: "请求中...",
  };

  constructor() {}

  async start(title?: string) {
    this.isStop = false;
    title ? (this.options.title = title) : "";
    window.withProgress(this.options, async () => {
      await new Promise((resolve) => {
        setInterval(() => {
          if (this.isStop) {
            resolve(undefined);
          }
        }, 500);
      });
    });
  }

  stop() {
    this.isStop = true;
  }
}
