var curDepositAmount

function treatCheck() {
  var info = document.getElementById("form")
  var id = getId(info.elements[0].value)
  curDepositAmount = getDepositCurrent();

}

function getId(username) {

}

function getDepositCurrent(id) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", "http://api.reimaginebanking.com/enterprise/customers?key=0f35e6aabd46897e9b0185a67a566d65", true); // true for asynchronous
  xmlHttp.send(null);
}

function calcSavings() {

}
