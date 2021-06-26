/*
**Created by detime001**
*/

let myLocaltion = location.href;
myLocaltion = myLocaltion.replace('/viewform', '/formResponse');
console.log(myLocaltion);

/*@@@@@@@@-Promo Code-@@@@@@@@*/
let scriptSearch = document.getElementsByTagName('script')[4];
let patPromo = /\[\"\w+\"\]/gi; /*pattern for search promo code from script*/
let txts = scriptSearch.firstChild;
let promoCodes = txts.textContent.toString().match(patPromo)[0].replace(/\[|\"|\]/gi, '');
console.log('Промокод найден: ' + promoCodes);
/*@@@@@@@@-Promo Code-@@@@@@@@*/

/*@@@@@@@@-Search for input fields-@@@@@@@@*/
let entryNames = document.getElementsByTagName('input');
let inputLogins = entryNames[1].name;
let inputPromoCodes = entryNames[0].name;
console.log('Поле для ника: ' + inputLogins, 'Поле для промо: ' + inputPromoCodes);
/*@@@@@@@@-Search for input fields-@@@@@@@@*/

let loginList = [
  'MyLogin'
];
let count = 0; /*dispatch count*/
let lens = loginList.length; /*number of names*/

let xhr1 = new XMLHttpRequest();
let pattern = /\/\w+.$/gi;

function f() {
  let data1 = inputPromoCodes + '=' + promoCodes + '&' + inputLogins + '=' + encodeURI(loginList[count]);

  console.log(count + '===========================================')
  console.log(decodeURI(data1));

  xhr1.open('POST', myLocaltion, true);
  xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr1.send(data1);


  xhr1.onload = function() {
    let myStatus = xhr1.responseURL.match(pattern)[0];
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