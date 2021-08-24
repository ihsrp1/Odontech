const { Given, When, Then } = require("@cucumber/cucumber");
const puppeteer = require('puppeteer');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var vue_base_url = "http://localhost:8080/";


Given('Eu estou na página de {string}', async function (string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Write code here that turns the phrase above into concrete actions
    await page.goto(vue_base_url + 'atendimentos');
    expect(page.title()).to.eventually.equal(string);
});

When('Eu digito o CPF {string} no campo de busca por CPF', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('Eu requisito o sistema para {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('O sistema mostra um item com {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});