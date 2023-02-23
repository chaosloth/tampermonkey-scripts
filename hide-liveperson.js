// ==UserScript==
// @name         Hide Live Person
// @namespace    http://connotron.com/
// @version      0.1
// @description  Bye LP
// @author       You
// @match        https://www.budgetdirect.com.au/*
// @match        https://secure.budgetdirect.com.au/home/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twilio.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  function Conno_addStyle(css) {
    const style =
      document.getElementById("Connno31337") ||
      (function () {
        const style = document.createElement("style");
        style.type = "text/css";
        style.id = "Connno31337";
        document.head.appendChild(style);
        return style;
      })();
    const sheet = style.sheet;
    sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
  }

  setTimeout(() => {
    Conno_addStyle("#globalChatWithUs { display:none !important }");
    Conno_addStyle(".LPMcontainer { display:none !important;} ");
    Conno_addStyle("#globalOnlineChatButton { display:none !important;} ");
    console.log("Added styles");
  }, 3000);
})();
