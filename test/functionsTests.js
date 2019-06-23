
const mocha = require("mocha");     
const chai = require("chai");   
const chaiHttp = require("chai-http");
const assert = require("assert");

const expect = chai.expect;
const should = chai.should(); //использую это постоянно

chai.use(chaiHttp);


const Tests = {
    test1: {
        expectedValues: [
            "!!looc si ahcoM", 
            ".evitroppus repus si iahC"
        ],
        currentValues: [
            "Mocha is cool!!", 
            "Chai is super supportive."
        ]
    }

}


const functionTest = {
    dateToStr: {
        inputValues: [
            "Sun Jun 23 2019 20:11:10 GMT+0400 (Волгоград, стандартное время)"

        ],
        expectedValues: [

        ]
    },
    getTimeFromUnixTime: {
        inputValues: [
            1561165147,
            1561223315,
            0,
            -1,
            2147483648 //макс значение юникс            
        ],
        expectedValues: [

        ]
    }
 
}
// findMaxMinArrayValues(array) 
// findMaxMinArraysValues(array1, array2) 
// dateToStr(date)    
// getTimeFromUnixTime(unixTimestamp, seconds=false) 
// urlB64ToUint8Array(base64String)



const strReverse = (someString) => {
    let revStr = someString.split("");
    revStr = revStr.reverse().join("");
    return revStr;
};

mocha.describe("Reverse String Test", () => {
    mocha.it("Checks if the strings is reversed", () => {
        for(let i=0; i<2;i++) {
            Tests.test1.currentValues[i] = strReverse(Tests.test1.currentValues[i])
            assert.equal(Tests.test1.currentValues[i], Tests.test1.expectedValues[i] )
        }
    });
    
});
