var curDepositAmount;
var id;
var acc;
var balance;


function treatCheck() {
  var info = document.getElementById("form");
  id = getId(info.elements[0].value);
  acc = getAccount(id);

  //Now we calculate how much the person needs to save
  if (info.elements[2].value < balance) {
    
  }

}

function loadJSON(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.overrideMimeType("application/json");
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
  var message = JSON.parse(xmlHttp.responseText);
  return message;
 }

function getId(username) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.overrideMimeType("application/json");
  xmlHttp.open("GET", "config.json", true);
  xmlHttp.send(null);
  var message = JSON.parse(xmlHttp.responseText);
  return message.customers[username];
}

function getAccount(id) {
  var xmlHttp = new XMLHttpRequest();
  var url = "http://api.reimaginebanking.com/customers/"+id+"/accounts?key=0f35e6aabd46897e9b0185a67a566d65"
  xmlHttp.overrideMimeType("application/json");
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
  var message = JSON.parse(xmlHttp.responseText);
  var account = message.pop();
  balance = account.balance;
  return account.customer_id;
}

function getDepositCurrent(id) {

}

function calcSavings() {

}
