
const assert = require("assert");
const mocha = require("mocha");     
const chai = require("chai");   
const chaiHttp = require("chai-http");

const app = require("../app")
const expect = chai.expect;
const should = chai.should(); //использую это постоянно
const faker = require("faker")

chai.use(chaiHttp);

const Tests = {
    randomUser: {
        email: faker.internet.email(),
        password: faker.internet.password()
    },
    GETmethods: {
        pages: ["/", "/dataspage", "/register", 
        "/sign_In", "/home", "/logout"], // с последним спорно 
        meteoData: "/meteostationData",
        chartsValues: "/chartsValues",
        computerLoadParams : "/computerLoadParams",

    },
    POSTmethods: {
        register: "/register",
        sign_In: "/sign_In",
        meteostationData: "/meteostationData",
        updatePC_Id: "/updatePC_Id",
        updateMeteoId: "/updateMeteoId",
        applySettings: "/applySettings",
        computerLoadParams: "/computerLoadParams",
        pushSubscribe: "/push/subscribe",
        pushUnsubscribe: "/push/unsubscribe"
    },
    correctMeteoData: {
        temperatureInHome:29.30,
        humidityInHome:39.00,
        temperature:21.47,
        humidity:49.00,
        pressure:766.92,
        engWeatherDescription: "clear+sky",
        weatherId: 800,
        windSpeed: 1,
        windDeg: 30,
        icon: "01d",
        meteostationId: 0,
        sunriseTime: 1561165147 ,
        sunsetTime: 1561223315  
    },
    
}

const positive = require("./positiveTests")


foo()
async function foo() {
    await positive.startPositiveTests(Tests)
    //process.exit()
}


