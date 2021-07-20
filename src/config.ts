import * as path from "path";

export enum Commands {
  openReaderWebView = "o_reader.directory.openReaderWebView",
  getServerIP = "o_reader.command.getServerIP",
  editTemplateHtml = "o_reader.editTemplateHtml",
  editTemplateCss = "eo_reader.ditTemplateCss",
  goProgress = "o_reader.goProgress",
  progressUpdate = "o_reader.progress:update",

  setWindow = "o_reader.command.setWindow",
  bookName = "read_bar.name",
  chapterTitle = "read_bar.title",
  context = "read_bar.context",
  prevRow = "read_bar.prevRow",
  nextRow = "read_bar.nextRow",
  prevChapter = "read_bar.prevChapter",
  nextChapter = "read_bar.nextChapter",
}

export enum WebViewMessage {
  editStyle = "editStyle",
  editHtml = "editHtml",
  goProgress = "goProgress",
  progressUpdate = "progress:update",
}

export const TemplatePath = {
  templateCss: path.join("static", "template", "default", "style.css"),
  templateHtml: path.join("static", "template", "default", "index.html"),
};

export const TREEVIEW_ID = "directory";
