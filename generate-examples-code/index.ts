/// <reference path="typings/main.d.ts" />
"use strict";

import fs = require("fs");
import path = require("path");
import childProcess = require("child_process");
import marked = require("marked");
import mkdirp = require("mkdirp");

let promises:any = [];
let samplesUrl = "https://ics-creative.github.io/tutorial-createjs/";
let samplesHtmlUrl = "https://github.com/ics-creative/tutorial-createjs/blob/gh-pages/";
let templateHtml:string;

/**
 * テンプレート文字列を展開
 * http://webdesign-dackel.com/2015/07/17/javascript-template-string/
 * @param text:string テンプレート文字列
 * @param values:Object 展開する値
 * @return string
 */
let template = (text:string, values:any) => {
  if (!text) {
    console.log("template-error!");
    return "";
  }

  return text.replace(/\$\{(.*?)\}/g, function (all, key) {
    return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : "";
  });
};

const renderer = new marked.Renderer();

renderer.link = (href:string, title:string, text:string) => {
  //console.log("href:" + href);

  let sampledIndex = href.indexOf("samples/");
  let absolutePass = href.indexOf("http") == 0;
  if (!absolutePass && sampledIndex >= 0) {
    href = samplesHtmlUrl + href.slice(sampledIndex);
  } else {
    if (!absolutePass && href.indexOf("md")) {
      href = href.replace("md", "html");
    }
  }

  let htmlHref = (href != null && href != "") ? ` href="${href}"` : "";
  let htmlTitle = (title != null && title != "") ? ` title=${title}` : "";

  return `<a${htmlHref}${htmlTitle}>${text}</a>`;
};


renderer.image = (href:string, title:string, text:string) => {
  //console.log("imgs:" + href);

  let absolutePass:boolean = href.indexOf("http") == 0;
  let sampledIndex:number = href.indexOf("../imgs/");
  if (!absolutePass && sampledIndex >= 0) {
    href = samplesUrl + href.slice(sampledIndex + ("../").length);
  }

  let htmlHref = (href != null && href != "") ? ` src="${href}"` : "";
  let htmlTitle = (title != null && title != "") ? ` title=${title}` : "";

  return `<img${htmlHref}${htmlTitle} />`;
};

renderer.heading = function (text:string, level:string) {
  return `<h${level}>${text}</h${level}>`;
};

marked.setOptions({
  highlight: function (code:string) {
    return require("highlight.js").highlightAuto(code).value;
  },
  renderer: renderer
});


let generateHTML = (dirName:string, fileName:string, resolve:Function) => {
  fs.readFile("../examples/" + dirName + fileName, "utf8", (error:any, text:string) => {

    if (error) {
      console.log("erroe exit:" + fileName);
      return;
    }

    let fileRawName = fileName.split(".md").join("");

    let escapeHTML = (str:string) => {
      return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // --------------------------------
    // テンプレートへの適用
    // --------------------------------
    let values = {
      "sourcecode": escapeHTML(text),
      "title" : fileRawName,
      "url": "../../examples/" + fileName
    };
    if (!templateHtml) {
      console.log(fileName + " generate error!");
      return;
    }
    let textValue = template(templateHtml, values);

    fs.writeFile("../docs/examples/" + dirName + fileName.replace("md", "html"), textValue, (error:any) => {
      //console.log(fileName + "- maked");
      if (error) {
        return;
      }
      resolve();
    });
  });
};

fs.readdir("../examples/", (err:NodeJS.ErrnoException, files:string[]):void => {

  promises.push(new Promise((resolve:Function) => {
    mkdirp("../docs/examples/", function (err:any) {
      if (err) {
        console.error("mkdir-error" + err);
      } else {
        resolve();
      }
    });
  }));


  promises.push(new Promise((resolve:Function) => {
    fs.readFile("example-template.html", "utf8", (error:any, text:string) => {
      templateHtml = text;
      resolve();
    });
  }));

  for (let i = 0; i < files.length; i++) {
    let filename:string = files[i];

    let childPromise = new Promise((resolve:Function) => {
      generateHTML("", filename, resolve);
    });

    promises.push(childPromise);
  }

  Promise
    .all(promises)
    .then((results:any) => {
      console.log("[Success] HTML files are generated.");
    });
});

/**
 * 日付をフォーマットで変換します。
 * @param date Date オブジェクト
 * @returns {string} 「◯年◯月◯日」フォーマットの日付
 */
function toLocaleString(date:Date):string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}