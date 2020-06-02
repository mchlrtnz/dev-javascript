// XMLHttpRequest Functions
function sendRequest(url, callback, postData) {
  var req = createXMLHTTPObject();
  if (!req) return;
  var method = postData ? "POST" : "GET";
  req.open(method, url, true);
  req.setRequestHeader("User-Agent", "XMLHTTP/1.0");
  if (postData)
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.onreadystatechange = function () {
    if (req.readyState != 4) return;
    if (req.status != 200 && req.status != 304) {
      console.log("HTTP error " + req.status);
      return;
    }
    callback(req);
  };
  if (req.readyState == 4) return;
  req.send(postData);
}

var XMLHttpFactories = [
  function () {
    return new XMLHttpRequest();
  },
  function () {
    return new ActiveXObject("Msxml2.XMLHTTP");
  },
  function () {
    return new ActiveXObject("Msxml3.XMLHTTP");
  },
  function () {
    return new ActiveXObject("Microsoft.XMLHTTP");
  },
];

function createXMLHTTPObject() {
  var xmlhttp = false;
  for (var i = 0; i < XMLHttpFactories.length; i++) {
    try {
      xmlhttp = XMLHttpFactories[i]();
    } catch (e) {
      continue;
    }
    break;
  }
  return xmlhttp;
}

//
var template = document.querySelector("#template-card-profile");
var output = document.querySelector("#output");

var btnRandomProfiles = document.querySelector("#btnRandomProfiles");
var btnClearOutput = document.querySelector("#btnClearOutput");

//
btnRandomProfiles.addEventListener("click", function () {
  sendRequest("https://randomuser.me/api/?results=3", handleRequest);
});

btnClearOutput.addEventListener("click", function () {
  clearOutput(output);
});

//
function handleRequest(req) {
  clearOutput(output);
  var { results, info } = JSON.parse(req.responseText);

  for (result in results) {
    var clone = template.content.cloneNode(true);

    // name
    var { first, last } = results[result].name;
    clone.querySelector(".name").innerText = `${first} ${last}`;

    // picture
    var { large, medium, thumbnail } = results[result].picture;
    clone.querySelector(".user img").src = large;

    output.appendChild(clone);
  }
}

function clearOutput(element) {
  if (element.hasChildNodes) {
    for (let e = element.firstChild; e !== null; e = element.firstChild) {
      element.removeChild(e);
    }
  }
  // while (element.firstChild) {
  //   element.lastChild.remove();
  // }
}

function rotateCard(btn) {
  btn.closest(".card-container").classList.toggle("hover");
}
