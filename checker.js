
const fetch = require('node-fetch')

async function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }

    const keys = Object.keys(invocationParameters);
    let input = '?';

    for(let k of keys)
        input = input + k + '=' + invocationParameters[k] + '&';
    
    input = input.substring(0, input.length - 1);
    input = url + input;
    console.log(input);
    
    //FETCH
    let checkResponse = false;
    let checkJson = false;
    fetch(input, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(resp => {
            if(resp.status === expectedResultStatus)
                checkResponse = true;
            checkResult['resultStatus'] = resp.status;
            return resp.json();
        })
        .then(jres => {
            checkJson = compareResults(expectedResultData, jres);
            checkResult['resultData'] = jres;
        })
        .catch(e => console.log(e));
    
    checkResult['statusTestPassed'] = checkResponse ? true : false;
    checkResult['resultDataAsExpected'] = checkJson ? true : false;    

    return checkResult;
}

// const fetchFun = (target) => {
//     return fetch(target, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     })
// };

// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check