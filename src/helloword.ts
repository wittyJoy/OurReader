import { commands, window, ExtensionContext } from "vscode";

module.exports = function (context: ExtensionContext) {
  // 注册HelloWord命令
  context.subscriptions.push(
    commands.registerCommand("o_reader.sayHello", () => {
      window.showInformationMessage("Hello,小茗同学！");
      // window.showWarningMessage("Hello,小茗同学！");
      // window.showErrorMessage("Hello,小茗同学！");
      // window.showInformationMessage("Hello World", "Yes", "No").then((value) => {
      //   window.showInformationMessage("User press " + value);
      // });
      // window.showQuickPick(["first", "second", "third"]).then((value) => {
      //   window.showInformationMessage("User choose " + value);
      // });
    })
  );
};
