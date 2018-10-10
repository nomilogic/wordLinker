function swap(chars, i, j) {
    var tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
}

function getCombinations(input) {
    var counter = [],
        anagrams = [],
        chars = input.split(''),
        length = chars.length,
        i;

    for (i = 0; i < length; i++) {
        counter[i] = 0;
    }

    anagrams.push(input);
    i = 0;
    while (i < length) {
        if (counter[i] < i) {
            swap(chars, i % 2 === 1 ? counter[i] : 0, i);
            counter[i]++;
            i = 0;
            anagrams.push(chars.join(''));
        } else {
            //counter[i] = 0;
            i++;
        }
    }

    return anagrams;
}

//console.log(newComb);

function getJsonData(onSuccess) {
    $.ajax({
        type: "GET",
        url: "words.json",
        success: function(data) {
            // console.log(data);
            //words = data;
            //   if (onSuccess == Function)
            onSuccess(data);
        },
        dataType: "json"
    });
}
getJsonData(onGet);

function onGet(e) {
    // var newComb = getCombinations("noman");
    newComb = Combinatorics.permutationCombination(String("oven").split("")).toArray();
    //console.log(cmb.toArray());
    words = e;
    // console.log(words.indexOf("tikamak"));
    for (let index = 0; index < newComb.length; index++) {
        const element = newComb[index];
        //  console.log(element.toString().replace(/\,/g, ''))
        console.log(words.indexOf(element.toString()));
        if (words.indexOf(element.toString().replace(/\,/g, '')) != -1)
            console.log(element.toString().replace(/\,/g, ''));
    }

}

function getAllCombinationsOfASet(text) {
    var results = [];
    for (var i = 0; i < text.length; i++) {
        // Record size as the list will change
        var resultsLength = results.length;
        for (var j = 0; j < resultsLength; j++) {
            results.push(text[i] + results[j]);
        }
        results.push(text[i]);
    }
    return results;
}