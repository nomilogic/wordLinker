/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * Starter Project for Messenger Platform webview Tutorial
 *
 * Use this project as the starting point for following the
 * Messenger Platform webview tutorial.
 *
 * https://blog.messengerdevelopers.com/using-the-webview-to-create-richer-bot-to-user-interactions-ed8a789523c6
 *
 */

'use strict';

// Imports dependencies and set up http server
const
    request = require('request'),
    express = require('express'),
    body_parser = require('body-parser'),
    dotenv = require('dotenv').config(),
    Combinatorics = require('js-combinatorics'),
    fs = require('fs'),
    SortedArray = require("sorted-array");



//let words = fs.readFileSync("words.json");
//console.log(JSON.parse(words));

let words = require('./words-sorted.json');
//words = JSON.parse(words);;
//var sorted = SortedArray.comparing(length, words);
//console.log(sorted);
/* fs.writeFile('words-sorted.json', JSON.stringify(sorted), (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('words saved!');
}); */
console.log(words[0]);
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(body_parser.json());
app.use(express.static('public'));

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const SERVER_URL = process.env.SERVER_URL;
const APP_SECRET = process.env.APP_SECRET;

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
    // checkCombs();
});
var fullArray = [];
var newFullArray = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]

function checkCombs() {
    for (let wordsIndex = 0; wordsIndex < words.length; wordsIndex++) {
        const _word = words[wordsIndex];
        var word = {};
        word.values = [];
        word.words = [];

        console.log(newFullArray[_word.length].indexOf(_word), "hello");

        if (_word.length > 1 && _word.length < 10) {

            if (newFullArray[_word.length].indexOf(_word) == -1) {
                newFullArray[_word.length].push(_word);
            } else {
                continue;

            }
            var newComb = Combinatorics.permutationCombination(String(_word).split("")).toArray();
            for (let index = 0; index < newComb.length; index++) {
                const element = newComb[index];
                //  console.log(element.toString().replace(/\,/g, ''))
                //console.log(words.indexOf(element.toString()));

                var stringword = element.toString().replace(/\,/g, '');
                if (words.indexOf(stringword) != -1 && word.words.indexOf(stringword) == -1) {
                    console.log(stringword);
                    word.words.push(stringword)
                    if (stringword.length == _word.length) {
                        word.values.push(stringword);
                        newFullArray[_word.length].push(stringword);
                    }
                }
            }
        }
        fullArray.push(word);
        console.log(fullArray);
    }
    fs.writeFile('game-words.json', JSON.stringify(fullArray), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('words saved!');
    });
}

function length(a) {
    return a.length;
}
module.exports = app;

// Accepts POST requests at the /webhook endpoint