var examples = {
    AGENDAMENTO_LIST: [
        {
          "name": "Felipe Lima",
          "cpf": "12019146589",
          "dentist": 2,
          "color": "deep-purple",
          "start": new Date("Mon Aug 10 2021 09:00:00 GMT-0300"),
          "end": new Date("Mon Aug 10 2021 09:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "Carla Alves",
          "cpf": "14725836910",
          "dentist": 3,
          "color": "cyan",
          "start": new Date("Sat Aug 29 2021 14:00:00 GMT-0300"),
          "end": new Date("Sat Aug 29 2021 14:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "Igor Henrique",
          "cpf": "96385274154",
          "dentist": 1,
          "color": "indigo",
          "start": new Date("Tue Sep 15 2021 11:00:00 GMT-0300"),
          "end": new Date("Tue Sep 15 2021 11:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "Vinícius Galindo",
          "cpf": "78945612330",
          "dentist": 5,
          "color": "orange",
          "start": new Date("Wed Aug 05 2021 13:00:00 GMT-0300"),
          "end": new Date("Wed Aug 05 2021 13:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "Gabriel Luz",
          "cpf": "98765432155",
          "dentist": 0,
          "color": "blue",
          "start": new Date("Thu Aug 20 2021 10:00:00 GMT-0300"),
          "end": new Date("Thu Aug 20 2021 10:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "Deryk Alves",
          "cpf": "75315985245",
          "dentist": 6,
          "color": "grey darken-1",
          "start": new Date("Mon Aug 24 2021 11:00:00 GMT-0300"),
          "end": new Date("Mon Aug 24 2021 11:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "Heron",
          "cpf": "78945612355",
          "dentist": 3,
          "color": "cyan",
          "start": new Date("Mon Aug 24 2021 15:00:00 GMT-0300"),
          "end": new Date("Mon Aug 24 2021 15:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "Lucas Roberto",
          "cpf": "45786314426",
          "dentist": 4,
          "color": "green",
          "start": new Date("Fri Aug 14 2021 10:00:00 GMT-0300"),
          "end": new Date("Fri Aug 14 2021 10:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "Rogéria Lopes",
          "cpf": "78545622455",
          "dentist": 4,
          "color": "green",
          "start": new Date("Thu Sep 03 2021 16:00:00 GMT-0300"),
          "end": new Date("Thu Sep 03 2021 16:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "Joana Silva",
          "cpf": "45214596325",
          "dentist": 2,
          "color": "deep-purple",
          "start": new Date("Fri Sep 25 2021 17:00:00 GMT-0300"),
          "end": new Date("Fri Sep 25 2021 17:30:00 GMT-0300"),
          "timed": true
        },
        {
          "name": "João Pedro Silva",
          "cpf": "78547854785",
          "dentist": 3,
          "color": "cyan",
          "start": new Date("Sun Aug 02 2021 10:00:00 GMT-0300"),
          "end": new Date("Sun Aug 02 2021 10:30:00 GMT-0300"),
          "timed": true
        }
    ],
    EXAME_LIST:[
      {
        "cod": "01",
        "name": "Pedro Manoel",
        "date": "16-07-2020",
        "dentist": "Marcos",
        "Exame":"IRN",
        "Result":"3.0"
      },
      {
        "cod": "02",
        "name": "Pedro Manoel",
        "date": "16-07-2020",
        "dentist": "Marcos",
        "Exame":"TGO",
        "Result":"5.36"
      },
      {
        "cod": "03",
        "name": "Felipe Vasconcelos",
        "date": "23-04-2020",
        "dentist": "Marcos",
        "Exame":"IRN",
        "Result":"2.5"
      },
      {
        "cod": "04",
        "name": "João Pericles",
        "date": "20-06-2020",
        "dentist": "Antonio",
        "Exame":"FA",
        "Result":"1.24"
      },
      {
        "cod": "05",
        "name": "Sonia Maria",
        "date": "02-08-2020",
        "dentist": "Antonio",
        "Exame":"TGO",
        "Result":"3.24"
      },
      {
        "cod": "06",
        "name": "Pamela Miranda",
        "date": "24-07-2020",
        "dentist": "Fernado",
        "Exame":"CTX",
        "Result":"4.23"
      },
      {
        "cod": "07",
        "name": "Pamela Miranda",
        "date": "24-07-2020",
        "dentist": "Fernado",
        "Exame":"FA",
        "Result":"1.34"
      }
    ],
    PRONTUARIO_LIST: [
        {
            id: '1',
            paciente: {
                nome: 'João Asfora Rodrigues',
                cpf: '123456789-01',
                endereco: 'R. Industrial José Paulo Alimonda - San Martin, Recife - PE, 50760-710',
                DOB: '01/10/1987',
                sexo: 'M',
                diabetico: true,
                hipertenso: true,
                gravidez: false,
                alergias: 'Amendoim'
            },
            atendimento: [
                {
                    medico_responsavel: 'Igor Henrique',
                    nome_paciente: 'João Asfora Rodrigues',
                    queixas: 'Dentes sensíveis',
                    procedimento_realizado: 'Correção de esmalte',
                    medicamento_prescrito: 'Dipirona',
                    data: "09-04-2020, 10:59",
                    tipo: "consulta",
                    prontID: "1"
                },
                {
                    medico_responsavel: 'Galindo Vinícius',
                    nome_paciente: 'João Asfora Rodrigues',
                    queixas: 'Dor profunda ao mastigar',
                    procedimento_realizado: 'Remoção dos dentes sisos',
                    medicamento_prescrito: 'Tramadol',
                    data: "15-04-2020, 10:59",
                    tipo: "cirurgia",
                    prontID: "1"

                }
            ]
        },
        {
            id: '2',
            paciente: {
                nome: 'João Asfora Silva',
                cpf: '987654321-98',
                endereco: 'Rua Conde de Irajá - Torre, Recife - PE, 50710-310',
                DOB: '10/01/1978',
                sexo: 'M',
                diabetico: false,
                hipertenso: false,
                gravidez: false,
                alergias: 'Anafilaxia'
            },
            atendimento: [
                {
                    medico_responsavel: 'Karlos Gubianni',
                    nome_paciente: 'João Asfora Silva',
                    queixas: 'Dente quebrado',
                    procedimento_realizado: 'Reconstrução da coroa',
                    medicamento_prescrito: 'Tramadol',
                    data: "09-03-2020, 10:59",
                    tipo: "consulta",
                    prontID: "2"
                }
            ]
        },
    ]
      
}

function pushAgendamento (agendamento) {
    examples.AGENDAMENTO_LIST.push(agendamento)
    return examples.AGENDAMENTO_LIST
}

function pushAtendimento (atendimento) {
  let prontID = atendimento.prontID
  let index = examples.PRONTUARIO_LIST.findIndex((el) => {
      if (el.id == prontID)
          return true
      return false
  })
  examples.PRONTUARIO_LIST[index].atendimento.push(atendimento)
  return examples.PRONTUARIO_LIST[index].atendimento
}

module.exports = { examples, pushAgendamento, pushAtendimento }
