import { CookieMap } from './cookieLib.js';

const cookie = new CookieMap();

function checkForAuth() {
    if (cookie.getCookie("auth"))
        return true
    else
        return false
}


function databaseGetAll(){
    let url =  './app/database.json';
    return new Promise((resolve, reject) => {

        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then( (result) => {
            resolve(result);
        })
        .catch( (err )=> {
            reject(err);
        })
    });
}
    
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

export { checkForAuth,
    databaseGetAll,
    shuffle
}