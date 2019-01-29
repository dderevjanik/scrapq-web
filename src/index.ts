import * as monaco from 'monaco-editor'
// or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// if shipping only a subset of the features & languages is desired

function getTxtFromUrl(url) {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        resolve(xhr.response);
      }

      xhr.open("GET", url, true);
      xhr.responseType = "text";
      xhr.send();
  });
}

function getHtmlDocFromUrl(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      resolve(xhr.responseXML.title);
    }

    xhr.open("GET", url, true);
    xhr.responseType = "document";
    xhr.send();
  });
}



window.onload = async () => {
  async function onFetch() {
    console.log("fetching ...");
    const url = await inputEl["value"];
    const html = await getHtmlDocFromUrl(url);
    htmlContainer.setValue(html);
  }

  function onScrap() {
    console.log("scraping ...");
    const htmlToScrap = htmlContainer.getValue();
    const scrapCode = scrapContainer.getValue();
    window["html"] = htmlToScrap;
    const result = eval(scrapCode);
    const prettyResult = JSON.stringify(result, null, 2);
    resultContainer.setValue(prettyResult);
  }

  // init
  const inputEl = document.getElementById("input-url");
  const htmlContainerEl = document.getElementById("html-container");
  const scrapContainerEl = document.getElementById("scrapq-container");
  const resultContainerEl = document.getElementById("result-container");

  const btnFetchEl = document.getElementById("btn-fetch");
  const btnScrapEl = document.getElementById("btn-scrap");

  // btnFetchEl.addEventListener("click", onFetch);
  btnScrapEl.addEventListener("click", onScrap);

  // load monaco
  monaco.languages.typescript.typescriptDefaults.addExtraLib("declare const html: string;\n");

  const htmlContainer = monaco.editor.create(htmlContainerEl, {
    value: "",
    language: "html"
  });

  const scrapContainer = monaco.editor.create(scrapContainerEl, {
    value: "",
    language: "typescript",
    minimap: {
      enabled: false
    }
  });

  const resultContainer = monaco.editor.create(resultContainerEl, {
    value: "",
    language: "json",
    // readOnly: true,
    theme: "vs-dark",
    minimap: {
      enabled: false
    }
  });

  // load init data
  getTxtFromUrl(window.location.href + "resources/html-container.html").then((res) => htmlContainer.setValue(res));
  getTxtFromUrl(window.location.href + "resources/scrap-container.ts").then((res) => scrapContainer.setValue(res));
}
