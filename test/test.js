
const assert = require('assert');
const mocha = require('mocha');     
const chai = require('chai');   
let chaiHttp = require('chai-http');

const app = require('../app')
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

const Tests = {
    test1: {
        expectedValues: [
            '!!looc si ahcoM', 
            '.evitroppus repus si iahC'
        ],
        currentValues: [
            'Mocha is cool!!', 
            'Chai is super supportive.'
        ]
    },
    GETmethods: {
        pages: ['/', '/dataspage', '/register', 
        '/sign_In', '/home', '/logout'], // с последним спорно 
        meteoData: '/meteostationData',
        chartsValues: "/chartsValues",
        computerLoadParams : "/computerLoadParams",

    },
    POSTmethods: {
        register: '/register',
        sign_In: '/sign_In',
        meteostationData: '/meteostationData',
        updatePC_Id: '/updatePC_Id',
        updateMeteoId: '/updateMeteoId',
        applySettings: '/applySettings',
        computerLoadParams: "/computerLoadParams",
        pushSubscribe: '/push/subscribe',
        pushUnsubscribe: '/push/unsubscribe'
    }
}

const strReverse = (someString) => {
    let revStr = someString.split('');
    revStr = revStr.reverse().join('');
    return revStr;
};

describe('Reverse String Test', () => {
    it('Checks if the strings is reversed', () => {
        for(let i=0; i<2;i++) {
            Tests.test1.currentValues[i] = strReverse(Tests.test1.currentValues[i])
            assert.equal(Tests.test1.currentValues[i], Tests.test1.expectedValues[i] )
        }
    });
    
    
});

GETmethods(Tests.GETmethods.pages)


async function GETmethods(pages) {
    
    describe('/GET /', () => {
        for (let i = 0; i < pages.length; i++) {
            
            mocha.it(pages[i], (done) => { //на самом деле она должна отвечать 200, даже если юзер оффлайн
                    chai.request(app).get(pages[i])
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
            });
        }
    });

}