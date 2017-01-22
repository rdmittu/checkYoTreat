function startProccess() {
  var id = customerPost();
  add_id(id);
  var acc = accountPost(id);
  depositPost(acc);
  withPost(acc);

  alert("Account created");
  document.location = "index.html";
  return false;

}

function customerPost() {
  var data = {
    "first_name": document.getElementById("first-name").value,
    "last_name": document.getElementById("last-name").value,
    "address": { "street_number": "1234",
                "street_name": "Test Street",
                "city": "Hackerville",
                "state": "MD",
                "zip": "12345"}
  }
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "http://api.reimaginebanking.com/customers?key=0f35e6aabd46897e9b0185a67a566d65",false);
  xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xmlHttp.send(JSON.stringify(data));
  var message = JSON.parse(xmlHttp.responseText);
  return message["objectCreated"]["_id"];
}

function add_id(id) {
  localStorage.setItem(document.getElementById("user-name").value, id);
}

function accountPost(id) {
  var data = {
    "type": "Savings",
    "nickname": document.getElementById("user-name").value,
    "rewards": 0,
    "balance": parseInt(document.getElementById("input-bal").value)
  }
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "http://api.reimaginebanking.com/customers/"+id+"/accounts?key=0f35e6aabd46897e9b0185a67a566d65",false);
  xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xmlHttp.send(JSON.stringify(data));
  var message = JSON.parse(xmlHttp.responseText);
  return message["objectCreated"]["_id"];
}

function depositPost(acc) {
  for (var i = 1; i <= localStorage.getItem("counterD"); i++) {
    try {
      document.getElementById("input-depD"+i).value;
      depositPosth(acc, i);
    } catch(e) {
      return false;
    }
  }
}

function depositPosth(acc, i) {
  var data = {
    "medium": "balance",
    "transaction_date": document.getElementById("input-depD"+i).value,
    "amount": parseInt(document.getElementById("input-depA"+i).value)
  }
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "http://api.reimaginebanking.com/accounts/"+acc+"/deposits?key=0f35e6aabd46897e9b0185a67a566d65",false);
  xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xmlHttp.send(JSON.stringify(data));
  var message = JSON.parse(xmlHttp.responseText);
  return true;
}

function withPost(acc) {
  for (var i = 1; i <= localStorage.getItem("counterW"); i++) {
    try {
      document.getElementById("input-withD"+i).value;
      withPosth(acc, i);
    } catch(e) {
      return false;
    }
  }
}

function withPosth(acc, i) {
  var data = {
    "medium": "balance",
    "transaction_date": document.getElementById("input-withD"+i).value,
    "amount": parseInt(document.getElementById("input-withA"+i).value)
  }
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "http://api.reimaginebanking.com/accounts/"+acc+"/withdrawals?key=0f35e6aabd46897e9b0185a67a566d65",false);
  xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xmlHttp.send(JSON.stringify(data));
  var message = JSON.parse(xmlHttp.responseText);
  return true;
}
