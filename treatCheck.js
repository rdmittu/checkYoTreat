var curDepositAmount;
var id;
var acc;
var balance = null;


function treatCheck() {
  var info = document.getElementById("form");
  id = getId(info.elements[0].value);
  acc = getAccount(id);

  //Now we calculate how much the person needs to save
  var rate = getRate(info);
  //Now we need to check to see if they have been saving enough
  var dep = getMoneyRate(acc, "http://api.reimaginebanking.com/accounts/"+acc+"/deposits?key=0f35e6aabd46897e9b0185a67a566d65");
  var purch = getMoneyRate(acc, "http://api.reimaginebanking.com/accounts/"+acc+"/purchases?key=0f35e6aabd46897e9b0185a67a566d65");
  var withd = getMoneyRate(acc, "http://api.reimaginebanking.com/accounts/"+acc+"/withdrawals?key=0f35e6aabd46897e9b0185a67a566d65");

  var truerate = (dep-purch-withd)/3;

  if(truerate > rate) {
    return "treat.html";
  } else {
    return "noTreat.html"
  }


}

function getId(username) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "config.json",false);
  xmlHttp.send(null);
  var message = JSON.parse(xmlHttp.responseText);
  return message.customers[username];
}

function getAccount(id) {
  var xmlHttp = new XMLHttpRequest();
  var url = "http://api.reimaginebanking.com/customers/"+id+"/accounts?key=0f35e6aabd46897e9b0185a67a566d65"
  xmlHttp.overrideMimeType("application/json");
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  var message = JSON.parse(xmlHttp.responseText);
  var account = message.pop();
  balance = account.balance;
  return account._id;
}

function getRate(info) {
  if (info.elements[2].value > balance) {
    //calculate home much time they have
    var re = /(\d\d)\/(\d\d)\/(\d\d\d\d)/;
    var result = re.exec(info.elements[3].value);
    var goalDate = new Date(result[3], (result[1]-1), result[2]);
    var curDate = new Date();
    if (goalDate < curDate) {
      //Your goal is in the past
      new Error();
    }
    //Find number of days before goal
    var diffTime = Math.round(Math.abs((goalDate.getTime() - curDate.getTime())/(24*60*60*1000)));
    //Find rate you need to be saving money.
    return (info.elements[2].value - balance)/(diffTime/7);
  }
  else {
    //You have too much money
    new Error();
  }
}

function getMoneyRate(acc, url) {
  var dep=0;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.overrideMimeType("application/json");
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  var message = JSON.parse(xmlHttp.responseText);
  var threeweeks = new Date();
  threeweeks.setDate(threeweeks.getDate()-21);
  for (var i = 0; i < message.length; i++) {
    var currentmess = message[i];
    var re = /(\d\d\d\d)-(\d\d)-(\d\d?)/;
    var result = re.exec(currentmess.transaction_date);
    var depdate = new Date(result[1], (result[2]-1), result[3]);
    if(depdate > threeweeks) {
      dep += currentmess.amount
    }
  }
  return dep;
}
