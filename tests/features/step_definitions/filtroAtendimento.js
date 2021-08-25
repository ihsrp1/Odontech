const { Given, When, Then } = require("@cucumber/cucumber");
const puppeteer = require('puppeteer');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var vue_base_url = "http://localhost:8080/";
let [browser, page] = [null, null]


Given('Eu estou na página de {string}', async function (string) {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    // await page.goto(vue_base_url + 'login');
    // const inputs_els = await page.$$('.v-text-field__slot input')

    // await page.type(inputs_els[0].id, 'recepcionista@email.com')
    // await page.type(inputs_els[1].id, '1234')
    // await page.$('.v-btn__content').click()


    // Write code here that turns the phrase above into concrete actions
    await page.goto(vue_base_url + 'atendimentos');
    expect(page.title()).to.eventually.equal(string);
});

Given('Os atendimentos {string} e {string} e {string} são exibidos na tela.', async function (string, string2, string3) {           // Write code here that turns the phrase above into concrete actions
    const [patient1, cod1, type1, date1, time1, dentist1] = string.split(', ')
    const [patient2, cod2, type2, date2, time2, dentist2] = string2.split(', ')
    const [patient3, cod3, type3, date3, time3, dentist3] = string3.split(', ')

    const dates_els = await page.$$('.atendimento-date')
    const types_els = await page.$$('.atendimento-type')
    const patients_els = await page.$$('.atendimento-patient')
    const dentists_els = await page.$$('.atendimento-dentist')

    let [patient_ok, type_ok, date_ok, time_ok, dentist_ok] = [0, 0, 0, 0, 0]

    for (let node of patients_els) {
        let patient = await (await node.getProperty('innerText')).jsonValue()
        if([patient1, patient2, patient3].includes(patient.replace('Paciente: ', ''))) {
            patient_ok++
        } else {
            console.log(patient)
        }
    }

    for (let node of types_els) {
        let type = await (await node.getProperty('innerText')).jsonValue()
        if([type1, type2, type3].includes(type.replace('Tipo: ', ''))) {
            type_ok++
        } else {
            console.log([type1, type2, type3])
            console.log(type)
        }
    }

    for (let node of dates_els) {
        let date = await (await node.getProperty('innerText')).jsonValue()
        if([`${date1}, ${time1}`, `${date2}, ${time2}`, `${date3}, ${time3}`].includes(date.replace('Data: ', ''))) {
            date_ok++
            time_ok++
        } else {
            console.log([`${date1}, ${time1}`, `${date2}, ${time2}`, `${date3}, ${time3}`])
            console.log(date)
        }
    }

    for (let node of dentists_els) {
        let dentist = await (await node.getProperty('innerText')).jsonValue()
        if([dentist1, dentist2, dentist3].includes(dentist.replace('Dentista Responsável: ', ''))) {
            dentist_ok++
        } else {
            console.log([dentist1, dentist2, dentist3])
            console.log(dentist)
        }
    }

    console.log([patient_ok, type_ok, date_ok, time_ok, dentist_ok])

    expect(patient_ok).to.equal(3)
    expect(type_ok).to.equal(3)
    expect(date_ok).to.equal(3)
    expect(time_ok).to.equal(3)
    expect(dentist_ok).to.equal(3)
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