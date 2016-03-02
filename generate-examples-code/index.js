/// <reference path="typings/main.d.ts" />
"use strict";
var fs = require("fs");
var marked = require("marked");
var mkdirp = require("mkdirp");
var promises = [];
var samplesUrl = "https://ics-creative.github.io/tutorial-createjs/";
var samplesHtmlUrl = "https://github.com/ics-creative/tutorial-createjs/blob/gh-pages/";
var templateHtml;
/**
 * テンプレート文字列を展開
 * http://webdesign-dackel.com/2015/07/17/javascript-template-string/
 * @param text:string テンプレート文字列
 * @param values:Object 展開する値
 * @return string
 */
var template = function (text, values) {
    if (!text) {
        console.log("template-error!");
        return "";
    }
    return text.replace(/\$\{(.*?)\}/g, function (all, key) {
        return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : "";
    });
};
var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    //console.log("href:" + href);
    var sampledIndex = href.indexOf("samples/");
    var absolutePass = href.indexOf("http") == 0;
    if (!absolutePass && sampledIndex >= 0) {
        href = samplesHtmlUrl + href.slice(sampledIndex);
    }
    else {
        if (!absolutePass && href.indexOf("md")) {
            href = href.replace("md", "html");
        }
    }
    var htmlHref = (href != null && href != "") ? " href=\"" + href + "\"" : "";
    var htmlTitle = (title != null && title != "") ? " title=" + title : "";
    return "<a" + htmlHref + htmlTitle + ">" + text + "</a>";
};
renderer.image = function (href, title, text) {
    //console.log("imgs:" + href);
    var absolutePass = href.indexOf("http") == 0;
    var sampledIndex = href.indexOf("../imgs/");
    if (!absolutePass && sampledIndex >= 0) {
        href = samplesUrl + href.slice(sampledIndex + ("../").length);
    }
    var htmlHref = (href != null && href != "") ? " src=\"" + href + "\"" : "";
    var htmlTitle = (title != null && title != "") ? " title=" + title : "";
    return "<img" + htmlHref + htmlTitle + " />";
};
renderer.heading = function (text, level) {
    return "<h" + level + ">" + text + "</h" + level + ">";
};
marked.setOptions({
    highlight: function (code) {
        return require("highlight.js").highlightAuto(code).value;
    },
    renderer: renderer
});
var generateHTML = function (dirName, fileName, resolve) {
    fs.readFile("../examples/" + dirName + fileName, "utf8", function (error, text) {
        if (error) {
            console.log("erroe exit:" + fileName);
            return;
        }
        var fileRawName = fileName.split(".html").join("");
        var escapeHTML = function (str) {
            return str.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        };
        var headerMatch = text.match(/<title>(.*?)<\/title>/);
        var articleTitle = headerMatch ? headerMatch[1] : fileRawName;
        // --------------------------------
        // テンプレートへの適用
        // --------------------------------
        var values = {
            "sourcecode": escapeHTML(text),
            "title": articleTitle,
            "url": "../../examples/" + fileName
        };
        if (!templateHtml) {
            console.log(fileName + " generate error!");
            return;
        }
        var textValue = template(templateHtml, values);
        fs.writeFile("../docs/examples/" + dirName + fileName.replace("md", "html"), textValue, function (error) {
            //console.log(fileName + "- maked");
            if (error) {
                return;
            }
            resolve();
        });
    });
};
fs.readdir("../examples/", function (err, files) {
    promises.push(new Promise(function (resolve) {
        mkdirp("../docs/examples/", function (err) {
            if (err) {
                console.error("mkdir-error" + err);
            }
            else {
                resolve();
            }
        });
    }));
    promises.push(new Promise(function (resolve) {
        fs.readFile("example-template.html", "utf8", function (error, text) {
            templateHtml = text;
            resolve();
        });
    }));
    for (var i = 0; i < files.length; i++) {
        var filename = files[i];
        var childPromise = new Promise(function (resolve) {
            generateHTML("", filename, resolve);
        });
        promises.push(childPromise);
    }
    Promise
        .all(promises)
        .then(function (results) {
        console.log("[Success] HTML files are generated.");
    });
});
/**
 * 日付をフォーマットで変換します。
 * @param date Date オブジェクト
 * @returns {string} 「◯年◯月◯日」フォーマットの日付
 */
function toLocaleString(date) {
    return date.getFullYear() + "\u5E74" + (date.getMonth() + 1) + "\u6708" + date.getDate() + "\u65E5";
}
//# sourceMappingURL=index.js.map