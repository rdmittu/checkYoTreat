var curDepositAmount;
var id;
var acc;
var balance = null;
var diffTime;



function treatCheck() {
  id = getId(document.getElementById("input-name").value);
  if (id ==null) {
    alert("Not a valid user");
    return false;
  } else if (!id) {
    return false;
  }
  acc = getAccount(id);

  //Now we calculate how much the person needs to save
  var rate = getRate();

  if (!rate) {
    return false;
  }
  //Now we need to check to see if they have been saving enough
  var dep = getMoneyRate(acc, "http://api.reimaginebanking.com/accounts/"+acc+"/deposits?key=0f35e6aabd46897e9b0185a67a566d65");
  var purch = getMoneyRate(acc, "http://api.reimaginebanking.com/accounts/"+acc+"/purchases?key=0f35e6aabd46897e9b0185a67a566d65");
  var withd = getMoneyRate(acc, "http://api.reimaginebanking.com/accounts/"+acc+"/withdrawals?key=0f35e6aabd46897e9b0185a67a566d65");

  var truerate = (dep-purch-withd)/3;

  if(truerate > rate) {
    document.location = "treat.html?need="+rate+"&goalM="+document.getElementById("input-money").value+"&goalD="+document.getElementById("input-date").value+"&tRate="+truerate;
  } else {
    document.location =  "noTreat.html?need="+rate+"&goalM="+document.getElementById("input-money").value+"&goalD="+document.getElementById("input-date").value+"&tRate="+truerate;
  }

  return false;

}

function getId(username) {
  if (username != ""){
    return localStorage.getItem(username);
  } else {
    alert("No username entered");
    return false;
  }
}

function getAccount(id) {
  var xmlHttp = new XMLHttpRequest();
  var url = "http://api.reimaginebanking.com/customers/"+id+"/accounts?key=0f35e6aabd46897e9b0185a67a566d65"
  xmlHttp.overrideMimeType("application/json");
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  var message = JSON.parse(xmlHttp.responseText);
  var account = message[0];
  balance = account.balance;
  return account._id;
}

function getRate() {
  if (document.getElementById("input-money").value > balance) {
    //calculate home much time they have
    var re = /(\d\d)\/(\d\d)\/(\d\d\d\d)/;
    try {
      var result = re.exec(document.getElementById("input-date").value);
      var goalDate = new Date(result[3], (result[1]-1), result[2]);
    } catch (e) {
      alert("Invalid date")
    }
    var curDate = new Date();
    if (goalDate < curDate) {
      //Your goal is in the past
      alert("You need to pick a date in the future!")
      return false;
    }
    //Find number of days before goal
    diffTime = Math.round(Math.abs((goalDate.getTime() - curDate.getTime())/(24*60*60*1000)));
    //Find rate you need to be saving money.
    return (document.getElementById("input-money").value - balance)/(diffTime/7);
  }
  else {
    if (document.getElementById("input-money").value == ""){
      alert("No goal entered")
      return false;
    } else{
      alert("Why do you want less money than you already have?")
      return false;
    }
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
