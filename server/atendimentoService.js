var { examples, pushAtendimento } = require('./constants')
var { removeAcento, removeWhiteSpaces } = require('./helper')
const moment = require('moment')

class Atendimento {
    addAtendimento (app) {
        app.post('/addAtendimento', function (req, res) {
            let atendimento = req.body
            let atendimentoList = pushAtendimento(atendimento)
            res.send(atendimentoList)
            // res.sendStatus(200)
        })
    }
    // [ ]
    
    listAtendimentos (app) {
        app.get('/listAtendimentos', (req, res) => {
            let atendimentos = this.getAtendimentosList()
            res.send(atendimentos)
        })
    }
    
    getAtendimentosList () {
        let prontuarios = examples.PRONTUARIO_LIST
        let atendimentos = prontuarios.reduce((acc, prontuario) => {
            return acc.concat(prontuario.atendimento)
        },[])
        
        return atendimentos
    }
    
    invertDate (daate) {
        let day = daate.split("-", 3)[0]
        let month = daate.split("-", 3)[1]
        let year = daate.split("-", 3)[2]
        let fullDate = `${year}-${month}-${day}`
        return fullDate
    }
    
    filterByDateRange (app) {
        app.get('/filterAtendimentoByRange', (req, res) => {
            let from = req.query.from
            let to = req.query.to
            let atendimentos = this.getAtendimentosList(app)
            let filteredAtendimentos = atendimentos.filter((atendimento) => {
                let time = atendimento.data
                let daates = time.split(",", 2)
                let daate = daates[0]
                let hour = daates[1]
                let fullDate = this.invertDate(daate)
                let isBetween = moment(fullDate).isBetween(this.invertDate(from), this.invertDate(to));
                return isBetween
            })
            if(filteredAtendimentos.length)
                res.send(filteredAtendimentos)
            else
            res.status(404).send('Nenhum atendimento encontrado')
        })
    }
    
    filterByPatient (app) {
        app.get('/filterAtendimentoByPatient', (req, res) => {
            let patient = req.query.patient
            let prontuarios =  examples.PRONTUARIO_LIST
            let filteredPront = prontuarios.filter((prontuario) => {
                return removeWhiteSpaces(removeAcento(prontuario.paciente.nome)).includes(removeWhiteSpaces(removeAcento(patient)))
            })
            let selectedAtendimentos = filteredPront.reduce((acc, prontuario) => {
                return acc.concat(prontuario.atendimento)
            },[])
            if(selectedAtendimentos.length)
                res.send(selectedAtendimentos)
            else
            res.status(404).send('Nenhum atendimento encontrado')
        })
    }
    
    filterByDoctor (app) {
        app.get('/filterAtendimentoByDoctor', (req, res) => {
            let doctor = req.query.doctor
            let atendimentos = this.getAtendimentosList(app)
            let filtered = atendimentos.filter((atendimento) => {
                return atendimento.medico_responsavel.includes(doctor)
            })
            if(filtered.length)
                res.send(filtered)
            else
            res.status(404).send('Nenhum atendimento encontrado')
        })
    }
    
    
    filterByType (app) {
        app.get('/filterAtendimentoByType', (req, res) => {
            console.log(req.query)
            console.log(req.params)
            let type = req.query.type
            let atendimentos = this.getAtendimentosList(app)
            let filtered = atendimentos.filter((atendimento) => {
                return atendimento.tipo.includes(type)
            })
            if(filtered.length)
                res.send(filtered)
            else
            res.status(404).send('Nenhum atendimento encontrado')
        })
    }
}

module.exports = Atendimento