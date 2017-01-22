var counterD = 1;
var limitD = 5;
var counterW = 1;
var limitW = 5;
function addInputD(divName){
     if (counterD == limitD)  {
          alert("You have reached the limit of adding " + counterD + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          counterD++;
          newdiv.innerHTML = " <br><input type='deposit' id='input-depD"+counterD+"' placeholder='Deposit Date "+counterD+"'>"
     +" <br><input type='deposit' id='input-depA"+counterD+"' placeholder='Deposit Amount "+counterD+"'>";
          document.getElementById(divName).appendChild(newdiv);
     }
}

function addInputW(divName){
     if (counterW == limitW)  {
          alert("You have reached the limit of adding " + counterW + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          counterW++;
          newdiv.innerHTML = " <br><input type='withdraw' id='input-withD"+counterW+"' placeholder='Withdrawl Date "+counterW+"'>"
     +" <br><input type='withdraw' id='input-withA"+counterW+"' placeholder='Withdrawl Amount "+counterW+"'>";
          document.getElementById(divName).appendChild(newdiv);
     }
}
