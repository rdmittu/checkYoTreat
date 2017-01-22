function startProccess() {
  //var id = customerPost();
  add_id("akjjsajndwnfnwelkdm");
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
