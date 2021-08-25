const { Given, When, Then } = require("@cucumber/cucumber");
const puppeteer = require('puppeteer');
const axios = require('axios')
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var vue_base_url = "http://localhost:8080/";
let [browser, page] = [null, null]
let eventGlobal = null

// Scenario: Criar um agendamento com informações incompletas

Given('Estou na página de {string}', async function (string) {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(vue_base_url + string);
    expect(page.title()).to.eventually.equal(string.charAt(0).toUpperCase() + string.slice(1));
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

Given('O agendamento {string} é armazenado no sistema para o dia {string} do mês {string} às {string} horas no nome de {string} com destista {string}', async function (cpf, day, month, time, name, dentist) {
    let validation = false
    const colorsDentists = {
        'Alberto': 'blue', 
        'Eva': 'indigo',
        'Eduarda': 'deep-purple',
        'Felipe': 'cyan',
        'Galindo Vinícius': 'green',
        'Igor Henrique': 'orange',
        'Karlos Gubianni': 'grey darken-1'
    }
    let endTime = parseInt(time.split(':')[0]) + 1 
    const event = {
        color: colorsDentists[dentist],
        cpf,
        dentist: Object.values(colorsDentists).indexOf(colorsDentists[dentist]),
        end: new Date(`2021-${month}-${day} ${endTime}`),
        name,
        start: new Date(`2021-${month}-${day} ${time}`),
        timed: true
    }
    try {
        axios.post('http://localhost:3000/addAgendamento', event)
        validation = true
        expect(validation).to.equal(true)
    } catch (error) {
        expect(validation).to.equal(true)
    }
});

Given('Já existe um agendamento para o dia {string} do mês {string} às {string} horas no nome de {string} com dentista {string} no sistema', async function (day, month, time, name, dentist) {
    return
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

When('Com horário para o dia {string} do mês {string} às {string} horas', async function (day, month, time) {
    // await page.click('#date_field')
    // console.log('1')

    // const monthButton = await page.$('.v-date-picker-header__value button')
    // await page.click('.v-date-picker-header__value button')
    // console.log('2')

    // const monthsEls = page.$$('.v-date-picker-table--month .v-btn__content')
    // const monthNumber = parseInt(month) - 1
    // await page.evaluate(x => x.click(), monthsEls[monthNumber])
    // console.log('3')

    // const daysEls = page.$$('.v-date-picker-table--date .v-btn__content')
    // const dayNumber = parseInt(day) - 1
    // await page.evaluate(x => x.click(), daysEls[dayNumber])
    // console.log('4')
    
    // const dateSelected = await page.evaluate(x => x.value, dateField)
    const dateOriginal = `2021-${month.padStart(2, "0")}-${day.padStart(2, "0")}`

    const dateField = await page.$('#date_field')
    await page.focus('#date_field');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type('#date_field', dateOriginal)
    const dateSelected = await page.evaluate(x => x.value, dateField)


    const timeField = await page.$('#time_field')
    await page.click('#time_field')

    const timesEls = await page.$$('.v-select-list .v-list-item__title')

    for (let node of timesEls) {
        let timeOnList = await (await node.getProperty('innerText')).jsonValue()
        if (timeOnList === time) {
            await page.evaluate(x => x.click(), node)
        }

    }

    const timeSlot = await page.$('.v-select__selection')
    const timeSelected = await (await timeSlot.getProperty('innerText')).jsonValue()

    expect(dateSelected).to.equal(dateOriginal)
    expect(timeSelected).to.equal(time)
});

When('Eu solicito ao sistema o tempo restante até o agendamento {string}', async function (cpf) {
    let validation = false
    let result = ''
    try {
        result = await axios.get('http://localhost:3000/howMuchTime', {params: {
            cpf
        }})
        if (typeof result.data === typeof '') validation = true
        expect(validation).to.equal(true)
    } catch (error) {
        expect(validation).to.equal(true)
    }
});

Given('Eu solicito ao sistema a criação do agendamento {string} para o dia {string} do mês {string} às {string} horas no nome de {string} com dentista {string} no sistema', async function (cpf, day, month, time, name, dentist) {
    const colorsDentists = {
        'Alberto': 'blue', 
        'Eva': 'indigo',
        'Eduarda': 'deep-purple',
        'Felipe': 'cyan',
        'Galindo Vinícius': 'green',
        'Igor Henrique': 'orange',
        'Karlos Gubianni': 'grey darken-1'
    }
    let endTime = parseInt(time.split(':')[0]) + 1 
    const event = {
        color: colorsDentists[dentist],
        cpf,
        dentist: Object.values(colorsDentists).indexOf(colorsDentists[dentist]),
        end: new Date(`2021-${month}-${day} ${endTime}`),
        name,
        time: time,
        date: `2021-${month}-${day}`,
        timed: true
    }
    eventGlobal = event 
});

Then('Eu posso ver uma mensagem de confirmação', async function () {
    await page.click('#confirm_creation')

    await page.waitForSelector('h2[id^=swal]')
    const confirmCreation = await page.$('h2[id^=swal]')
    const texto = await (await confirmCreation.getProperty('innerText')).jsonValue()
    expect(texto).to.equal('Agendamento feito com sucesso!')
});

Then('Eu posso ver uma mensagem de agendamento inválido', async function () {
    let validation = false
    await page.click('#confirm_creation')

    await page.waitForSelector('h2[id^=swal]')
    const confirmCreation = await page.$('h2[id^=swal]')
    const texto = await (await confirmCreation.getProperty('innerText')).jsonValue()
    if (texto === 'O dentista não está disponível nesse horário.' || texto === 'Por favor insira todas as informações para o agendamento.') {
        validation = true
    }
    expect(validation).to.equal(true)
});

Then('Eu vejo o agendamento com nome {string}, dentista {string} e data para {string} do mês {string} às {string} horas na lista de agendamentos', async function (nome, dentista, day, month, time) {
    let validation = false
    
    const dentists = await page.$$('#dentists div')
    let i = 0
    let color = '' 
    for (let node of dentists) {
        let dentistListed = await (await node.getProperty('innerText')).jsonValue()
        if (dentistListed === dentista) {
            color = await page.evaluate(x => x.className.split(' ')[1], dentists[i-1])
        }
        i++
    }


    const daysEls = await page.$$('.v-calendar-weekly__day')

    let j = 0
    for (let node of daysEls) {
        let validationAux = false
        let classList = await (await node.getProperty('classList')).jsonValue()
        const obj = JSON.parse(JSON.stringify(classList))

        let classListArr = []
        for (const item  in Object.values(obj)) {
            classListArr.push(Object.values(obj)[parseInt(item)])
        }
        // page.on('console', consoleObj => console.log(consoleObj.text()));
        if (!classListArr.includes('v-outside')) {
            validationAux = await page.evaluate((x, nome, color, day, j) => {
                let aux = false
                if (x.children.length > 1) {
                    x.children.forEach((event, k) => {
                        if (event.classList.contains(color) && event.innerText.substr(event.innerText.indexOf(' ') + 1) === nome) {
                            if (x.children[0].children[0].innerText === day) {
                                aux = true
                            }
                        }
                    })
                }
                return aux
            }, daysEls[j], nome, color, day, j)
        }
        if (validationAux) validation = true
        j++
    }

    expect(validation).to.equal(true)
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

Then('O sistema retorna o tempo restante para o atendimento', async function () {
    return
});

Then('O sistema retorna que o agendamento é inválido por conflito de horários', async function () {
    result = await axios.get('http://localhost:3000/checkIfAgendamentoIsAvaiable', {params: {
        dentist: eventGlobal.dentist,
        date: eventGlobal.date,
        time: eventGlobal.time
    }})
    // console.log(result.data)
    expect(result.data).to.equal(false)
});

Then('O agendamento no nome de {string} não é armazenado', async function (name) {
    return
});
