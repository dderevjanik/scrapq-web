import * as monaco from 'monaco-editor'
// or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// if shipping only a subset of the features & languages is desired

function getHtml(url) {
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

monaco.languages.typescript.typescriptDefaults.addExtraLib("declare const html: string;\n");

const htmlContainer = monaco.editor.create(document.getElementById('html-container'), {
  value: '',
  language: 'html'
});

const scrapContainer = monaco.editor.create(document.getElementById('scrapq-container'), {
  value: '',
  language: 'typescript'
});

// scrapContainer.setValue("dsadas");

(async function () {
  getHtml("http://localhost:8080/resources/html-container.html");
  getHtml("http://localhost:8080/resources/scrap-container.ts").then((res) => scrapContainer.setValue(res));
})();
