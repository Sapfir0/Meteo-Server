
const assert = require('assert');
const mocha = require('mocha');     
const chai = require('chai');   
let chaiHttp = require('chai-http');

const app = require('../app')
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

const testUser = {
    email: "testEmail@mail.ru",
    password: "localhost"
}

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

mocha.describe('Reverse String Test', () => {
    mocha.it('Checks if the strings is reversed', () => {
        for(let i=0; i<2;i++) {
            Tests.test1.currentValues[i] = strReverse(Tests.test1.currentValues[i])
            assert.equal(Tests.test1.currentValues[i], Tests.test1.expectedValues[i] )
        }
    });
    
});



function GETmethods(pages) {
    mocha.describe('/GET /', () => {
        for (let i = 0; i < pages.length; i++) {
            mocha.it(pages[i], (done) => { //на самом деле она должна отвечать 200, даже если юзер оффлайн
                    chai.request(app)
                        .get(pages[i])
                        .end((err, res) => {
                            expect(err).to.be.null;
                            res.should.have.status(200);
                            done();
                        });
            });
        }
    });
}


function PostMeteostationData() {
    mocha.describe("Meteostation Data", () => {
        mocha.it("correct POST /meteostationData", (done) => {
            chai.request(app)
                .post("/meteostationData") //ВАЖНО! НА САЙТЕ ЭТО СЧИТАЕТСЯ ПОСТ ЗАПРОС
                .query({
                    temperatureInHome:29.30,
                    humidityInHome:39.00,
                    temperature:21.47,
                    humidity:49.00,
                    pressure:766.92,
                    weatherDescription: "clear+sky",
                    weatherId: 800,
                    windSpeed: 1,
                    windDeg: 30,
                    icon: "01d",
                    meteostationId: 0,
                    sunriseTime: 1561165147 ,
                    sunsetTime: 1561223315  
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    done();
                })
        })
        /// ух тут простор

    })
}



function register() {
    mocha.describe("User API", () => {
        mocha.it("registration", (done) => {
            chai.request(app)
                .post(Tests.POSTmethods.register)
                .send(testUser)
                .end( (err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done()
                })
        })
    })
}

function sign_In() {
    mocha.describe("User API", () => {
        mocha.it("sign in", (done) => {
            chai.request(app)
                .post(Tests.POSTmethods.sign_In)
                .send(testUser)
                .end( (err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done()
                })
        })
    })
}

function logout() {
    mocha.describe("User API", () => {
        mocha.it("logout", (done) => {
            chai.request(app)
                .get("/logout")
                .end( (err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done()
                })
        })
    })
}

function userApi() {
    register()
    logout()
    sign_In()
}

GETmethods(Tests.GETmethods.pages)
PostMeteostationData(Tests.POSTmethods.meteostationData)
userApi()


