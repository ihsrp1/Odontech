const { Given, When, Then } = require("@cucumber/cucumber");
const puppeteer = require('puppeteer');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var vue_base_url = "http://localhost:8080/";
let [browser, page] = [null, null]

// Scenario: Criar um agendamento com informações incompletas

Given('Eu estou na página de {string}', async function (string) {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(vue_base_url + 'agendamentos');
    expect(page.title()).to.eventually.equal(string);
});

Given('Eu não vejo o agendamento de nome {string} na lista', async function (string) {
    let agendamentos = await page.$$('.v-event div')
    let validation = true

    for (let node of agendamentos) {
        let texto = await (await node.getProperty('innerText')).jsonValue()
        let name = texto.substr(texto.indexOf(' ') + 1)
        if (name === string) {
            validation = false
        }
    }
    expect(validation).to.equal(true)
});

When('Eu seleciono a opção para adicionar um agendamento', async function () {
    const buttonCreate = await page.$('#create_button')
    await buttonCreate.click()
});

When('Eu tento cadastrar o agendamento {string} com nome {string}', async function (cpf, name) {
    const cpfField = await page.$('#cpf_field')
    await page.type('#cpf_field', cpf)
    const typedCPF = await page.evaluate(x => x.value, cpfField)

    const nameField = await page.$('#name_field')
    await page.type('#name_field', name)
    const typedName = await page.evaluate(x => x.value, nameField)

    expect(typedCPF).to.equal(cpf)
    expect(typedName).to.equal(name)
});

When('Com dentista responsável sendo {string}', async function (dentist) {
    const dentistField = await page.$('#dentist_field')
    await page.click('#dentist_field')

    const dentists = await page.$$('.v-select-list .v-list-item')
    let i  = 0
    for (let node of dentists) {
        let texto = await (await node.getProperty('innerText')).jsonValue()
        console.log(i)
        if (texto === dentist) {
            await page.evaluate(x => x.click(), dentists[i])
        }
        i++
    }

    const typed = await page.evaluate(x => x.value, dentistField)

    expect(typed).to.equal(dentist)
});

When('Sem hora para o agendamento', async function () {
    return
});

Then('Eu posso ver uma mensagem de agendamento inválido', async function () {
    await page.click('#confirm_creation')

    const confirmCreation = await page.$('h2[id^=swal]')
    const texto = await (await confirmCreation.getProperty('innerText')).jsonValue()
    expect(texto).to.equal('Por favor insira todas as informações para o agendamento.')
});

Then('Eu não vejo o nome {string} na lista de agendamentos', async function (nome) {
    let agendamentos = await page.$$('.v-event div')
    let validation = true

    for (let node of agendamentos) {
        let texto = await (await node.getProperty('innerText')).jsonValue()
        let name = texto.substr(texto.indexOf(' ') + 1)
        if (name === nome) {
            validation = false
        }
    }
    expect(validation).to.equal(true)
});