var { examples, pushExame } = require('./constants')
var { removeAcento, removeWhiteSpaces } = require('./helper')
const moment = require('moment')

function addExame (app) {
    app.post('/addExame', function (req, res) {
        console.log(req.body)
        let Exame = req.body
        let ExameList = pushExame(Exame)
        res.send(ExameList)
        // res.sendStatus(200)
    })
}

function listExame (app) {
    app.get('/listExame', (req, res) => {
        let Exame = getExameList()
        res.send(Exame)
    })
}

function getExameList () {
    let ExameList = examples.EXAME_LIST
    return ExameList
}


function filterByPatient (app) {
    app.get('/filterExameByPatient', (req, res) => {
        let patient = req.query.patient
        let exames =  examples.EXAME_LIST
        console.log(exames)
        exames = exames.filter((exame) => {
            console.log(exame.name, patient)
            return removeWhiteSpaces(removeAcento(exame.name)).includes(removeWhiteSpaces(removeAcento(patient)))
        })
        if(exames.length)
            res.send(exames)
        res.status(404).send('Nenhum atendimento encontrado')
    })
}



function filterByType (app) {
    app.get('/filterExameByType', (req, res) => {
        console.log(req.query)
        console.log(req.params)
        let type = req.query.type
        let exames = examples.EXAME_LIST
        let filtered = exames.filter((exame) => {
            return exame.Exame === type
        })
        if(filtered.length)
            res.send(filtered)
        else
        res.status(404).send('Nenhum exame encontrado')
    })
}


function initExame (app) {
    addExame(app)
    listExame(app)
    filterByPatient(app)
    filterByType(app)
}

module.exports = { initExame }