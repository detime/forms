/*
**Created by detime001**
*/


var myLocaltion = location.href;
myLocaltion = myLocaltion.replace('/viewform', '/formResponse');
console.log(myLocaltion);

/*@@@@@@@@-Promo Code-@@@@@@@@*/
var scriptSearch = document.getElementsByTagName('script')[4];
var patPromo = /\[\"\w+\"\]/gi; /*pattern for search promo code from script*/
var txts = scriptSearch.firstChild;
var promoCodes = txts.textContent.toString().match(patPromo)[0].replace(/\[|\"|\]/gi, '');
console.log('Промокод найден: ' + promoCodes);
/*@@@@@@@@-Promo Code-@@@@@@@@*/

/*@@@@@@@@-Search for input fields-@@@@@@@@*/
var entryNames = document.getElementsByTagName('input');
var inputLogins = entryNames[1].name;
var inputPromoCodes = entryNames[0].name;
console.log('Поле для ника: ' + inputLogins, 'Поле для промо: ' + inputPromoCodes);
/*@@@@@@@@-Search for input fields-@@@@@@@@*/

var loginList = [
  'MyLogin'
];
var count = 0; /*dispatch count*/
var lens = loginList.length; /*number of names*/

var xhr1 = new XMLHttpRequest();
var pattern = /\/\w+.$/gi;

function f() {
  var data1 = inputPromoCodes + '=' + promoCodes + '&' + inputLogins + '=' + encodeURI(loginList[count]);

  console.log(count + '===========================================')
  console.log(decodeURI(data1));

  xhr1.open('POST', myLocaltion, true);
  xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr1.send(data1);


  xhr1.onload = function() {
    var myStatus = xhr1.responseURL.match(pattern)[0];
    if (myStatus == '/formResponse') {

      console.log('Отправлено ststus: ' + myStatus);
      count++;
      if (count < lens) {
        f();
      }
    }
    else if (myStatus == '/closedform') {
      console.log('Не отправлено status: ' + myStatus);
    }
    else {
      console.log('Неизвестный адрес');
      console.log(myStatus);
    }
  }

}
f();