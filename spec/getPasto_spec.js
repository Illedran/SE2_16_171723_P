/**
 * Created by illedran on 12/15/16.
 */

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:1337/";

describe("Test /getPasto", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "getPasto/1/",
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(body).toBe(JSON.stringify({
                    "id": 1,
                    "nome": "Pasta al carciofo",
                    "KCal": 350,
                    "vegetarian": true,
                    "info": "La pasta ai carciofi è un piatto tipico dell'autunno e dell'inverno, quando i carciofi sono nel pieno del loro sapore e si trovano da acquistare freschi. E' ottima anche in tarda primavera, quando si trovano gli ultimi carciofi, particolarmente grandi e poco costosi.",
                    "pdg": true
                }));
                done();
            });
    });
});

describe("Test /getPasto", function() {
    it("returns status code 4o4", function(done) {
        request.get(
            base_url + "getPasto/2/",
            function(error, response, body) {
                expect(response.statusCode).toBe(404);
                done();
            });
    });
});