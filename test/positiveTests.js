
const mocha = require("mocha");     
const chai = require("chai");   
const chaiHttp = require("chai-http");

const app = require("../app")
const expect = chai.expect;
const should = chai.should(); //использую это постоянно
const faker = require("faker")

chai.use(chaiHttp);



function startPositiveTests(Tests) {
    GETmethods(Tests.GETmethods.pages)
    PostMeteostationData(Tests.POSTmethods.meteostationData, Tests.correctMeteoData )
    testUser(Tests.POSTmethods.register, Tests.POSTmethods.sign_In, Tests.randomUser )

}



function PostMeteostationData( meteostationPostUrl, correctMeteoData) {
    mocha.describe("Meteostation Data", () => {
        mocha.it(`correct POST ${meteostationPostUrl}`, (done) => {
            chai.request(app)
                .post(meteostationPostUrl) 
                .query(correctMeteoData)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    done();
                })
        })
        /// ух тут простор

    })
}



function GETmethods(pages) {
    mocha.describe("/GET /", () => {
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


function testUser(registerUrl, signInUrl, randomUser) {

    mocha.describe("User API", () => {
        register()
        logout()
        sign_In()

        function register() {
            mocha.it(registerUrl, (done) => {
                chai.request(app)
                    .post(registerUrl)
                    .send(randomUser)
                    .end( (err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done()
                    })
                })
        }

        function sign_In() {
            mocha.it(signInUrl, (done) => {
                chai.request(app)
                    .post(signInUrl)
                    .send(randomUser)
                    .end( (err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done()
                    })
            })
        }

        function logout() {
            mocha.it("logout", (done) => {
                chai.request(app)
                    .get("/logout")
                    .end( (err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done()
                    })
            })
        }
    })   
}

module.exports = {
    startPositiveTests

}