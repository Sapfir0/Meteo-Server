
const mocha = require("mocha");     
const chai = require("chai");   
const chaiHttp = require("chai-http");

const app = require("../app")
const expect = chai.expect;
const should = chai.should(); //использую это постоянно
const faker = require("faker")

chai.use(chaiHttp);



function startNegativeTests(Tests) {
    PostIncorrectMeteostationData(Tests.correctMeteoData)

}
let minMeteoData = {
    temperatureInHome:29.30,
    humidityInHome:39.00,
    temperature:21.47,
    humidity:49.00,
    pressure:766.92,
    engWeatherDescription: "clear+sky",
    weatherId: 800,
    icon: "01d",
    meteostationId: 0
}

let minMeteoDataWithSpace = {
    temperatureInHome:29.30,
    humidityInHome:39.00,
    temperature:21.47,
    humidity:49.00,
    pressure:766.92,
    engWeatherDescription: "clear sky",
    weatherId: 800,
    icon: "01d",
    meteostationId: 0
}

let unrealisticMeteoData = {
    temperatureInHome:5000.30,
    humidityInHome:9000.00,
    temperature:10000.47,
    humidity:60000.00,
    pressure:0.92,
    engWeatherDescription: "clear sky",
    weatherId: 800,
    icon: "01d",
    meteostationId: 0
}

function PostIncorrectMeteostationData( meteostationPostUrl, correctMeteoData) {



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

module.exports = {
    startNegativeTests
}