var { examples, pushAgendamento } = require('./constants');
var { removeAcento, removeWhiteSpaces } = require('./helper');

class Agendamento {
    addAgendamento (app) {
        app.post('/addAgendamento', function (req, res) {
            console.log(req.body)
            let agendamento = req.body
            let agendamentoList = pushAgendamento(agendamento)
            res.send(agendamentoList)
            // res.sendStatus(200)
        })
    }
    
    getAgendamentosList () {
        let agendamentosList = examples.AGENDAMENTO_LIST
        
        return agendamentosList
    }
    
    listAgendamento (app) {
        app.get('/listAgendamento', (req, res) => {
            let agendamentos = getAgendamentosList()
            res.send(agendamentos)
        })
    }
    
    checkIfAgendamentoIsAvaiable (app) {
        app.get('/checkIfAgendamentoIsAvaiable', (req, res) => {
            let { dentist, date, time }= req.query
            dentist = parseInt(dentist)
            let isAvb = checkIfAvailable(dentist, date, time)
            res.send(isAvb)
        })
    }
    
    howMuchTime (app) {
        app.get('/howMuchTime', (req, res) => {
            let start = req.query.start
            const date_future = new Date(start)
            const date_now = new Date()
            seconds = Math.floor((date_future - (date_now))/1000)
            minutes = Math.floor(seconds/60)
            hours = Math.floor(minutes/60)
            days = Math.floor(hours/24)
    
            hoursOriginal = hours
            hours = hours-(days*24)
            minutes = minutes-(days*24*60)-(hours*60)
            seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60)
            let resposta = `${hoursOriginal} horas e ${minutes} minutos`
            res.send(resposta)
        })
    }
    
    checkIfAvailable (dentist, date, time) {
        const dateToAdd = new Date(`${date} ${time}`)
        const sameDateArr = examples.AGENDAMENTO_LIST.filter((event) => {
            return event.dentist === dentist && new Date(event.start).getTime() == dateToAdd.getTime()
        })
        return sameDateArr.length === 0
    }
}

module.exports = { initAgendamento }