// ==UserScript==
// @name         Insert Segment
// @namespace    http://connotron.com/
// @version      0.1
// @description  G3t S3gzm3nt Bruz
// @author       You
// @match        https://www.budgetdirect.com.au/*
// @match        https://secure.budgetdirect.com.au/home/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twilio.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  function Conno_addScript() {
    console.log("Adding Segement.com script");
    !(function () {
      var analytics = (window.analytics = window.analytics || []);
      if (!analytics.initialize)
        if (analytics.invoked)
          window.console &&
            console.error &&
            console.error("Segment snippet included twice.");
        else {
          analytics.invoked = !0;
          analytics.methods = [
            "trackSubmit",
            "trackClick",
            "trackLink",
            "trackForm",
            "pageview",
            "identify",
            "reset",
            "group",
            "track",
            "ready",
            "alias",
            "debug",
            "page",
            "once",
            "off",
            "on",
            "addSourceMiddleware",
            "addIntegrationMiddleware",
            "setAnonymousId",
            "addDestinationMiddleware",
          ];
          analytics.factory = function (e) {
            return function () {
              var t = Array.prototype.slice.call(arguments);
              t.unshift(e);
              analytics.push(t);
              return analytics;
            };
          };
          for (var e = 0; e < analytics.methods.length; e++) {
            var key = analytics.methods[e];
            analytics[key] = analytics.factory(key);
          }
          analytics.load = function (key, e) {
            var t = document.createElement("script");
            t.type = "text/javascript";
            t.async = !0;
            t.src =
              "https://cdn.segment.com/analytics.js/v1/" +
              key +
              "/analytics.min.js";
            var n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(t, n);
            analytics._loadOptions = e;
          };
          analytics._writeKey = "CgeD2STtmbpMqQtTM1XSGFZYkMOvloO6";
          analytics.SNIPPET_VERSION = "4.15.3";
          analytics.load("CgeD2STtmbpMqQtTM1XSGFZYkMOvloO6");
          analytics.page();
        }
    })();

    let userProperties = {};
    let windowLocation = window.location.href;
    let lastPageHash = window.location.hash.split("/")[1];

    window.addEventListener("load", (event) => {
      console.log("page is fully loaded");
    });

    const checkForState = () => {
      // CHECK FOR USER ATTRIBUTES TO SEND
      const currentPageHash = window.location.hash.split("/")[1];

      try {
        if (window.sessionStorage["home-tickle"]) {
          userProperties["clientNumber"] = JSON.parse(
            window.sessionStorage["home-tickle"]
          ).clientNumber;
        }
      } catch (err) {
        console.log("Could not parse session storage 'home-tickle'");
      }
      switch (currentPageHash) {
        case "email-address":
          let email = document.getElementById("emailAddress").value;

          if (email && email != "") {
            console.log("User email:", email);
            userProperties["email"] = email;
          }
          analytics.identify(userProperties);
          break;
        case "contact-information":
          let title = document.getElementById("title").value;
          let firstName = document.getElementById("firstName").value;
          let lastName = document.getElementById("lastName").value;
          let phoneNumber = document.getElementById("phoneNumber").value;

          if (title && title != "") {
            console.log("User title:", title);
            userProperties["title"] = title;
          }
          if (firstName && firstName != "") {
            console.log("User firstName:", firstName);
            userProperties["firstName"] = firstName;
          }
          if (lastName && lastName != "") {
            console.log("User lastName:", lastName);
            userProperties["lastName"] = lastName;
          }
          if (firstName && lastName && firstName != "" && lastName != "") {
            console.log("User name:", firstName + " " + lastName);
            userProperties["name"] = firstName + " " + lastName;
          }
          if (phoneNumber && phoneNumber != "") {
            console.log("User phoneNumber:", phoneNumber);
            userProperties["phone"] = phoneNumber;
          }
          analytics.identify(userProperties);
          break;
      }
    };

    const checkForNavigation = () => {
      const currentPageHash = window.location.hash.split("/")[1];
      // CHECK IF WE NEED TO UPDATE A PAGE EVENT
      if (currentPageHash != lastPageHash) {
        // SEND PAGE TO SEGMENT
        console.log("New Page Hash:", currentPageHash);
        analytics.page(currentPageHash, userProperties);
      }
      lastPageHash = currentPageHash;
    };

    window.addEventListener("mouseup", function (event) {
      checkForState();
      setTimeout(() => {
        checkForNavigation();
      }, 100);
    });

    window.addEventListener("hashchange", function () {
      console.log("hashchange changed!");
      checkForState();
      if (window.location != windowLocation) {
        windowLocation = window.location.href;
        console.log("hashchange- window location different", windowLocation);
      }
    });
  }
  Conno_addScript();
})();
