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
      ]
}

function pushAgendamento (agendamento) {
    examples.AGENDAMENTO_LIST.push(agendamento)
    return examples.AGENDAMENTO_LIST
}

module.exports = { examples, pushAgendamento }
