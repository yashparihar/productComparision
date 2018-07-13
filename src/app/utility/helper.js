import { CookieMap } from './cookieLib.js';

const cookie = new CookieMap();

function checkForAuth() {
    if (cookie.getCookie("auth"))
        return true
    else
        return false
}


function databaseGetAll() {
    let url = './app/database.json';
    return new Promise((resolve, reject) => {

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
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



function arrayToCsvConverter(data) {
    // CREATE A CSV FORMAT FILE & DATA SHOULD BE AN ARRAY(2-D)
    if (Object.prototype.toString.call(data) !== '[object Array]') {
        console.log('Data is not array');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(function (rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    // RETURN ENCODED URI..
    return encodeURI(csvContent);
}


export {
    checkForAuth,
    databaseGetAll,
    shuffle,
    arrayToCsvConverter
}