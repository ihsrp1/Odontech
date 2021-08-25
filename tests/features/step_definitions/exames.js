const { Given, When, Then } = require("@cucumber/cucumber");
const puppeteer = require('puppeteer');
const axios = require('axios')
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var vue_base_url = "http://localhost:8080/";
let [browser, page] = [null, null]

Given('Os exames {string} e " {string} estão armazenadas no sistema.', async function (string, string2) {
  // Write code here that turns the phrase above into concrete actions
  // {
  //   "cod": "01",
  //   "name": "Pedro Manoel",
  //   "date": "16-07-2020",
  //   "dentist": "Marcos",
  //   "Exame":"IRN",
  //   "Result":"3.0"
  // }
  const [cod1, name1, date1, dentist1, type1, result1] = string.split(', ')
  const [cod2, name2, date2, dentist2, type2, result2] = string.split(', ')

  const req = await axios.get('http://localhost:3000/listExame')
  const data = req.data

  const toCheck = [
    {
      cod: cod1,
      name: name1,
      date: date1,
      dentist: dentist1,
      Exame: type1,
      Result: result1
    },
    {
      cod: cod2,
      name: name2,
      date: date2,
      dentist: dentist2,
      Exame: type2,
      Result: result2
    }
  ]
  
  let check = 0;
  for(let d of data) {
    let ok = true
    for(let k in d) {
      if(data[k] != toCheck[k]){
        ok = false
      }
    }
    if(ok) check++
  }

  expect(check).to.be.at.least(toCheck.length)
});

When('Eu solicita o filtro Exame por {string}', async function (string) {
  // Write code here that turns the phrase above into concrete actions
  const req = await axios.get('http://localhost:3000/filterExameByType', {params: {type: string}})

  expect(req.status).to.equal(200)
});

Then('o sistema retorna um atendimento incluindo informações com nome do paciente, destista, data, exame e resultado com os valores {string}', async function (string) {
  // Write code here that turns the phrase above into concrete actions
  const [cod1, name1, date1, dentist1, type1, result1] = string.split(', ')
  const req = await axios.get('http://localhost:3000/filterExameByType', {params: {type: 'IRN'}})
  const data = req.data

  const toCheck = {
    cod: cod1,
    name: name1,
    date: date1,
    dentist: dentist1,
    Exame: type1,
    Result: result1
  }


  let ok = true
  for(let k in data) {
    if(data[k] != toCheck[k]){
      ok = false
    }
  }

  expect(ok).to.be.true
});