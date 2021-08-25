const { Given, When, Then } = require("@cucumber/cucumber");
const puppeteer = require('puppeteer');
const axios = require('axios')
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

    expect(patient_ok).to.equal(3)
    expect(type_ok).to.equal(3)
    expect(date_ok).to.equal(3)
    expect(time_ok).to.equal(3)
    expect(dentist_ok).to.equal(3)
});

When('Eu escolho filtrar pela data inicial {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const initialDateInput_el = await page.$('.atendimento-input-date-initial div div div input')
    await page.type('.atendimento-input-date-initial div div div input', string)

    const typed = await page.evaluate(x => x.value, initialDateInput_el)

    expect(typed).to.equal(string)
});

When('Eu escolho filtrar pela data final {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const finalDateInput_el = await page.$('.atendimento-input-date-final div div div input')
    await page.type('.atendimento-input-date-final div div div input', string)

    const typed = await page.evaluate(x => x.value, finalDateInput_el)

    expect(typed).to.equal(string)
});

When('Eu clico para {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    await page.waitForSelector('.row > .col > .atendimento-btn-filter > .v-btn__content > .v-icon')
    await page.click('.row > .col > .atendimento-btn-filter')
    return
});

When('Eu escolho filtrar pelo tipo {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const typeInput_el = await page.$('.atendimento-input-type div div div input')
    await page.type('.atendimento-input-type div div div input', string)

    const typed = await page.evaluate(x => x.value, typeInput_el)

    expect(typed).to.equal(string)
});

Then('Eu vejo uma lista com os atendimentos de nome do paciente, CPF do paciente, tipo, data, hora, nome do dentista com os valores {string} e {string}', async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    const [patient1, cod1, type1, date1, time1, dentist1] = string.split(', ')
    const [patient2, cod2, type2, date2, time2, dentist2] = string2.split(', ')

    const dates_els = await page.$$('.atendimento-date')
    const types_els = await page.$$('.atendimento-type')
    const patients_els = await page.$$('.atendimento-patient')
    const dentists_els = await page.$$('.atendimento-dentist')

    let [patient_ok, type_ok, date_ok, time_ok, dentist_ok] = [0, 0, 0, 0, 0]

    for (let node of patients_els) {
        let patient = await (await node.getProperty('innerText')).jsonValue()
        if([patient1, patient2].includes(patient.replace('Paciente: ', ''))) {
            patient_ok++
        } else {
            console.log([patient1, patient2])
            console.log(patient)
        }
    }

    for (let node of types_els) {
        let type = await (await node.getProperty('innerText')).jsonValue()
        if([type1, type2].includes(type.replace('Tipo: ', ''))) {
            type_ok++
        } else {
            console.log([type1, type2])
            console.log(type)
        }
    }

    for (let node of dates_els) {
        let date = await (await node.getProperty('innerText')).jsonValue()
        if([`${date1}, ${time1}`, `${date2}, ${time2}`].includes(date.replace('Data: ', ''))) {
            date_ok++
            time_ok++
        } else {
            console.log([`${date1}, ${time1}`, `${date2}, ${time2}`])
            console.log(date)
        }
    }

    for (let node of dentists_els) {
        let dentist = await (await node.getProperty('innerText')).jsonValue()
        if([dentist1, dentist2].includes(dentist.replace('Dentista Responsável: ', ''))) {
            dentist_ok++
        } else {
            console.log([dentist1, dentist2])
            console.log(dentist)
        }
    }

    expect(patient_ok).to.equal(2)
    expect(type_ok).to.equal(2)
    expect(date_ok).to.equal(2)
    expect(time_ok).to.equal(2)
    expect(dentist_ok).to.equal(2)
});

Then('Eu vejo uma lista com o atendimento de nome do paciente, CPF do paciente, tipo, data, hora, nome do dentista com os valores {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const [patient1, cod1, type1, date1, time1, dentist1] = string.split(', ')

    const dates_els = await page.$$('.atendimento-date')
    const types_els = await page.$$('.atendimento-type')
    const patients_els = await page.$$('.atendimento-patient')
    const dentists_els = await page.$$('.atendimento-dentist')

    let [patient_ok, type_ok, date_ok, time_ok, dentist_ok] = [0, 0, 0, 0, 0]

    for (let node of patients_els) {
        let patient = await (await node.getProperty('innerText')).jsonValue()
        if([patient1].includes(patient.replace('Paciente: ', ''))) {
            patient_ok++
        } else {
            console.log([patient1])
            console.log(patient)
        }
    }

    for (let node of types_els) {
        let type = await (await node.getProperty('innerText')).jsonValue()
        if([type1].includes(type.replace('Tipo: ', ''))) {
            type_ok++
        } else {
            console.log([type1])
            console.log(type)
        }
    }

    for (let node of dates_els) {
        let date = await (await node.getProperty('innerText')).jsonValue()
        if([`${date1}, ${time1}`].includes(date.replace('Data: ', ''))) {
            date_ok++
            time_ok++
        } else {
            console.log([`${date1}, ${time1}`])
            console.log(date)
        }
    }

    for (let node of dentists_els) {
        let dentist = await (await node.getProperty('innerText')).jsonValue()
        if([dentist1].includes(dentist.replace('Dentista Responsável: ', ''))) {
            dentist_ok++
        } else {
            console.log([dentist1])
            console.log(dentist)
        }
    }

    expect(patient_ok).to.equal(1)
    expect(type_ok).to.equal(1)
    expect(date_ok).to.equal(1)
    expect(time_ok).to.equal(1)
    expect(dentist_ok).to.equal(1)
});

Then('Eu vejo uma mensagem de erro com {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const error_el = await page.$('h2[id^=swal]')
    const msg = await (await error_el.getProperty('innerText')).jsonValue()
    expect(msg).to.equal(string)
});

Given('Os atendimentos {string} e {string} e {string} estão armazenadas no sistema.', async function (string, string2, string3) {   
    // Write code here that turns the phrase above into concrete actions
    const [patient1, cod1, type1, date1, time1, dentist1] = string.split(', ')
    const [patient2, cod2, type2, date2, time2, dentist2] = string2.split(', ')
    const [patient3, cod3, type3, date3, time3, dentist3] = string3.split(', ')

    const req = await axios.get('http://localhost:3000/listAtendimentos')
    const data = req.data.map(d => ({
        medico_responsavel: d.medico_responsavel,
        nome_paciente: d.nome_paciente,
        data: d.data,
        tipo: d.tipo,
    }))

    const toCheck = [
        {
            medico_responsavel: dentist1,
            nome_paciente: patient1,
            data: `${date1}, ${time1}`,
            tipo: type1
        },
        {
            medico_responsavel: dentist2,
            nome_paciente: patient2,
            data: `${date2}, ${time2}`,
            tipo: type2
        },{
            medico_responsavel: dentist3,
            nome_paciente: patient3,
            data: `${date3}, ${time3}`,
            tipo: type3
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

    expect(check).to.equal(3)
});

When('Eu filtro pelo tipo {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const req = await axios.get('http://localhost:3000/filterAtendimentoByType', {params: {type: string}})

    expect(req.status).to.equal(200)
});

When('Eu filtro pelo range de datas {string}, {string}', async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return
});

Then('O sistema retorna um atendimento incluindo informações com nome do paciente, CPF do paciente, tipo, data, hora, nome do dentista com os valores {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const [patient1, cod1, type1, date1, time1, dentist1] = string.split(', ')

    const toCheck = {
        medico_responsavel: dentist1,
        nome_paciente: patient1,
        data: `${date1}, ${time1}`,
        tipo: type1
    }

    const req = await axios.get('http://localhost:3000/filterAtendimentoByType', {params: {type: type1}})

    const data = req.data.map(d => ({
        medico_responsavel: d.medico_responsavel,
        nome_paciente: d.nome_paciente,
        data: d.data,
        tipo: d.tipo,
    }))[0]

    let ok = true
    for(let k in data) {
        if(data[k] != toCheck[k]){
            ok = false
        }
    }

    expect(ok).to.be.true
});

Then('O sistema retorna o código de erro {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    try{
        const req = await axios.get('http://localhost:3000/filterAtendimentoByRange', {params: {from: "30-12-2020", to: "31-12-2020"}})
    } catch(err) {
        // console.log(err.response.status)
        expect(err.response.status).to.equal(Number(string))
    }
});