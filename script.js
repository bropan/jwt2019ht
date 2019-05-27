"use strict";

//Globaalit
var country_source_url = "https://restcountries.eu/rest/v2/all";
var all_countries = [];
var kaydyt_maat = [];
var vaihtoehdot = [];

function init() {
    fetch(
        country_source_url
    ).then(
        function(response) {
            return response.json();
        }
    ).then(
        function(list) {
            all_countries.push(...list);
            var suitable = _.filter(
                all_countries,
                function (country) {
                    return country.borders.length >= 2;
                }
            )
            var randomCountries = [
                suitable.splice(Math.floor(Math.random()*suitable.length),1)[0],
                suitable.splice(Math.floor(Math.random()*suitable.length),1)[0],
                suitable.splice(Math.floor(Math.random()*suitable.length),1)[0]
            ]
            showCountries(randomCountries);
        }
    )
}

function showCountries(countries){
    countries.forEach(
        function(country) {
            let countryName = country["name"]

            let currencies = country.currencies.map(
                function(a) {
                    return a.name + " (" + a.code + ") "
                }
            )

            let flagURL = country.flag;


            let maa = document.createElement("div");
            maa.setAttribute('id', countryName+'-country');
            maa.setAttribute('class', 'maa');

            let countrySelector = document.createElement("input");
            let selectionName = countryName + "-button";
            countrySelector.setAttribute('type','button');
            countrySelector.setAttribute('name',selectionName);
            countrySelector.setAttribute('value',countryName);
            countrySelector.setAttribute('id',selectionName);
            countrySelector.setAttribute('class',  'countryselector');

            let countryDescription = document.createElement("p");
            countryDescription.setAttribute('id', countryName + "-nametext");
            countryDescription.setAttribute('class', 'countrydescription');

            let flag = document.createElement("img");
            flag.setAttribute('src',    flagURL);
            flag.setAttribute('alt',    "Flag of " + countryName);
            flag.setAttribute('heigth',  100);
            flag.setAttribute('width',  200);
            flag.setAttribute('class',  'countryflag');

            maa.appendChild(countryDescription);
            maa.appendChild(flag);
            maa.appendChild(countrySelector);

            document.querySelector("p.maat").appendChild(maa);

            document.getElementById(countryName+"-nametext").innerHTML = 
                "Name: "        + countryName         + "<br>" +
                "Code: "        + country.alpha3Code  + "<br>" +
                "Capital: "     + country.capital     + "<br>" +
                "Currencies: "  + currencies          + "<br>" +
                "Borders: "     + country.borders     + "<br>" +
                "";
            document.getElementById(selectionName).onclick = printCountryNeighbors;
        }
    )
}

function printCountryNeighbors(country){
    console.log(country.target.value);
}

init();
