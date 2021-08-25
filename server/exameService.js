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
    app.get('/filterAtendimentoByPatient', (req, res) => {
        let patient = req.query.patient
        let exames =  examples.EXAME_LIST
        let filteredPront = exames.filter((exame) => {
            return removeWhiteSpaces(removeAcento(exame.paciente.nome)).includes(removeWhiteSpaces(removeAcento(patient)))
        })
        let selectedAtendimentos = filteredPront.reduce((acc, exame) => {
            return acc.concat(exame.atendimento)
        },[])
        if(selectedAtendimentos.length)
            res.send(selectedAtendimentos)
        else
        res.status(404).send('Nenhum atendimento encontrado')
    })
}



function filterByType (app) {
    app.get('/filterAtendimentoByType', (req, res) => {
        console.log(req.query)
        console.log(req.params)
        let type = req.query.type
        let atendimentos = getAtendimentosList(app)
        let filtered = atendimentos.filter((atendimento) => {
            return atendimento.tipo.includes(type)
        })
        if(filtered.length)
            res.send(filtered)
        else
        res.status(404).send('Nenhum atendimento encontrado')
    })
}


function initExame (app) {
    addExame(app)
    listExame(app)
    filterByPatient(app)
    filterByType(app)
}

module.exports = { initExame }