function loadDoc(url, cb) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function loadJSONFile(xhttp) {
  var obj = JSON.parse(xhttp.responseText);
  var template = document.getElementById("contact-info-2");
  var output = document.getElementById("output");

  for (key in obj) {
    var clone = template.content.cloneNode(true);
    // name
    clone.querySelector(".name").innerText = obj[key]["name"];

    // email
    clone.querySelector(".email").href = "mailto:" + obj[key]["email"];
    clone.querySelector(".email").innerText = obj[key]["email"];

    // street_address
    clone.querySelector(".street_address").innerText =
      obj[key]["street_address"];

    // city, region postal_zip
    clone.querySelector(".city_region_postal_zip").innerText =
      obj[key]["city"] +
      ", " +
      obj[key]["region"] +
      " " +
      obj[key]["postal_zip"];

    // country
    clone.querySelector(".country").innerText = obj[key]["country"];

    // output
    output.appendChild(clone);
  }
}

// function loadJSONFile(xhttp) {
//   var obj = JSON.parse(xhttp.responseText);
//   var template = document.getElementById("contact-info");
//   var templateHtml = template.innerHTML;
//   var output = document.getElementById("output");
//   var item = "";

//   for (key in obj) {
//     var name = obj[key]["name"] ? obj[key]["name"] : "";
//     var email = obj[key]["email"]
//       ? '<a href="mailto:' +
//         obj[key]["email"] +
//         '">' +
//         obj[key]["email"] +
//         "</a>"
//       : "";
//     var street_address = obj[key]["street_address"]
//       ? obj[key]["street_address"]
//       : "";
//     var city = obj[key]["city"]
//       ? obj[key]["city"] && obj[key]["region"]
//         ? obj[key]["city"] + ","
//         : obj[key]["city"]
//       : "";
//     var region = obj[key]["region"] ? obj[key]["region"] : "";
//     var country = obj[key]["country"] ? obj[key]["country"] : "";
//     var postal_zip = obj[key]["postal_zip"] ? obj[key]["postal_zip"] : "";

//     item += templateHtml
//       .replace(/{{name}}/g, name)
//       .replace(/{{email}}/g, email)
//       .replace(/{{street_address}}/g, street_address)
//       .replace(/{{city}}/g, city)
//       .replace(/{{region}}/g, region)
//       .replace(/{{country}}/g, country)
//       .replace(/{{postal_zip}}/g, postal_zip);
//   }

//   output.innerHTML = item;
// }

var btnJsonFile = document.getElementById("btnJsonFile");

btnJsonFile.addEventListener("click", function () {
  loadDoc("./doc/data.json?=t" + Math.random(), loadJSONFile);
});

//loadDoc("./doc/data.json", loadJSONFile);

/**
 * FLIP CARD TEMPLATE
 */

function getApi(url, cb) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.response);
      cb(data);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

var btnFlipCards = document.querySelector("#btnFlipCards");

btnFlipCards.addEventListener("click", function () {
  getApi("https://randomuser.me/api/?results=3", loadFlipCards);
});

function loadFlipCards(xhttp) {
  var { results, info } = xhttp;
  var template = document.getElementById("card-template");
  var output = document.getElementById("output");

  for (result in results) {
    //
    var clone = template.content.cloneNode(true);

    // name
    var { first, last } = results[result].name;
    clone.querySelector(".name").innerText = `${first} ${last}`;

    // picture
    var { large, medium, thumbnail } = results[result].picture;
    clone.querySelector(".picture_thumbnail").src = large;

    //
    output.appendChild(clone);
  }
}

// Clear Output Container

var btnClearOutput = document.querySelector("#btnClearOutput");
btnClearOutput.addEventListener("click", function () {
  clearOutput(document.querySelector("#output"));
});

function clearOutput(element) {
  for (let e = element.firstChild; e !== null; e = element.firstChild) {
    element.removeChild(e);
  }
  // while (element.firstChild) {
  //   element.lastChild.remove();
  // }
}

function rotateCard(btn) {
  btn.closest(".card-container").classList.toggle("hover");
}
