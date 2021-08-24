<template lang="pug">
  v-row(no-gutters)
    v-col(cols=12)
      v-sheet.pa-5(min-height='calc(100vh - 100px)' rounded='lg')
        .text-h5.mb-5 Agendamento
        v-row(justify='end')
          v-col(cols='auto')
            v-btn#create_button(@click='dialog = true' color='orange' text)
              | Adicionar
        v-row
          v-col.pa-0(cols='12')
            v-toolbar.pa-0(flat)
              v-btn(fab text small color='grey darken-2' @click='prev')
                v-icon(small)
                  | mdi-chevron-left
              v-btn(fab text small color='grey darken-2' @click='next')
                v-icon(small)
                  | mdi-chevron-right
              v-toolbar-title.ml-2(:key='updateKey' v-if='$refs.calendar')
                | {{ $refs.calendar.title }}
        v-row
          v-col(cols='12') 
            v-calendar(
              @click:event='howMuchTime'
              :key='updateKey'
              ref='calendar'
              v-model='value'
              :weekdays='weekday'
              :type='type'
              :events='events'
              locale='pt-BR'
              style='height: 60vh;')
        v-row
          v-col(cols='12')
            v-row
              template(v-for='(dentist, index) in dentists')
                v-col.pr-0.pt-2(cols='auto' align-self='center')
                  v-avatar(size='15' :color='colors[index]' align-self='center')
                v-col.pl-1.pr-4(cols='auto')
                  | {{ dentist.text }}
    v-dialog(v-model='dialog' max-width="600px")
      v-card
        v-card-title
          span.headline Criar agendamento
        v-card-text
          v-container
            v-row
              v-col(cols='12')
                v-text-field#cpf_field(v-model='dialogData.cpf' label='Agendamento (CPF)*' required)
              v-col(cols='12')
                v-text-field#name_field(v-model='dialogData.name' label='Nome do paciente*' required)
              v-col(cols='12')
                v-autocomplete#dentist_field(v-model='dialogData.dentist' :items="dentists" label='Dentista responsável*' required)
              v-col(cols='12')
                v-menu(v-model='menu' :close-on-content-click='false' :nudge-right='40' transition='scale-transition' origin="bottom left" top offset-y min-width='auto')
                  template(v-slot:activator='{ on, attrs }')
                    v-text-field(v-model='computedDateFormatted' label='Data*' prepend-icon='mdi-calendar' readonly v-bind='attrs' v-on='on')
                  v-date-picker(
                    v-model='dialogData.date'
                    locale='pt-BR')
              v-col(cols='12')
                v-select#time_field(v-model='dialogData.time' :items='schedules' label='Horário*' required)
          small *indica os campos obrigatórios
        v-card-actions
          v-btn(color='error darken-1' text @click='dialog = false')
            | Cancelar
          v-spacer
          v-btn#confirm_creation(color='primary darken-1' text @click='addEvent')
            | Criar
</template>

<script>
// const eventsArr = [
//   {
//     "name": "Felipe Lima",
//     "cpf": "12019146589",
//     "dentist": 2,
//     "color": "deep-purple",
//     "start": new Date("Mon May 10 2021 09:00:00 GMT-0300"),
//     "end": new Date("Mon May 10 2021 09:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "Carla Alves",
//     "cpf": "14725836910",
//     "dentist": 3,
//     "color": "cyan",
//     "start": new Date("Sat May 29 2021 14:00:00 GMT-0300"),
//     "end": new Date("Sat May 29 2021 14:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "Igor Felipe",
//     "cpf": "96385274154",
//     "dentist": 1,
//     "color": "indigo",
//     "start": new Date("Tue Jun 15 2021 11:00:00 GMT-0300"),
//     "end": new Date("Tue Jun 15 2021 11:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "Vinícius Silva",
//     "cpf": "78945612330",
//     "dentist": 5,
//     "color": "orange",
//     "start": new Date("Wed May 05 2021 13:00:00 GMT-0300"),
//     "end": new Date("Wed May 05 2021 13:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "Gabriel Luz",
//     "cpf": "98765432155",
//     "dentist": 0,
//     "color": "blue",
//     "start": new Date("Thu May 20 2021 10:00:00 GMT-0300"),
//     "end": new Date("Thu May 20 2021 10:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "Deryk Alves",
//     "cpf": "75315985245",
//     "dentist": 6,
//     "color": "grey darken-1",
//     "start": new Date("Mon May 24 2021 11:00:00 GMT-0300"),
//     "end": new Date("Mon May 24 2021 11:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "Heron",
//     "cpf": "78945612355",
//     "dentist": 3,
//     "color": "cyan",
//     "start": new Date("Mon May 24 2021 15:00:00 GMT-0300"),
//     "end": new Date("Mon May 24 2021 15:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "Lucas Roberto",
//     "cpf": "45786314426",
//     "dentist": 4,
//     "color": "green",
//     "start": new Date("Fri May 14 2021 10:00:00 GMT-0300"),
//     "end": new Date("Fri May 14 2021 10:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "Rogéria Lopes",
//     "cpf": "78545622455",
//     "dentist": 4,
//     "color": "green",
//     "start": new Date("Thu Jun 03 2021 16:00:00 GMT-0300"),
//     "end": new Date("Thu Jun 03 2021 16:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "Joana Silva",
//     "cpf": "45214596325",
//     "dentist": 2,
//     "color": "deep-purple",
//     "start": new Date("Fri Jun 25 2021 17:00:00 GMT-0300"),
//     "end": new Date("Fri Jun 25 2021 17:30:00 GMT-0300"),
//     "timed": true
//   },
//   {
//     "name": "João Pedro Silva",
//     "cpf": "78547854785",
//     "dentist": 3,
//     "color": "cyan",
//     "start": new Date("Sun May 02 2021 10:00:00 GMT-0300"),
//     "end": new Date("Sun May 02 2021 10:30:00 GMT-0300"),
//     "timed": true
//   }
// ]

import Swal from 'sweetalert2'

import axios from 'axios'

export default {
  name: 'Agendamento',
  computed: {
    computedDateFormatted() {
      return `${this.formatDate(this.dialogData.date)}`
    },
  },
  watch: {
    dialog (nV) {
      if (nV) {
        const dateTemp = new Date().toLocaleString("pt-BR", {timeZone: "America/Recife"}).substr(0,10)
        const [day, month, year] = dateTemp.split('/')
        this.dialogData.cpf = ''
        this.dialogData.name = ''
        this.dialogData.dentist = ''
        this.dialogData.date = `${year}-${month}-${day}`
        this.dialogData.time = ''
      }
    }
  },
  data() {
    return {
      dialog: false,
      dialogData: {
        cpf: '',
        name: '',
        dentist: '',
        date: '',
        time: ''
      },
      menu: false,
      panel: 'date',
      updateKey: 0,
      type: 'month',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      value: '',
      events: [],
      dentists: [
        {
          text: 'Alberto',
          value: 0
        },
        {
          text: 'Eva',
          value: 1
        },
        {
          text: 'Eduarda',
          value: 2
        },
        {
          text: 'Felipe',
          value: 3
        },
        {
          text: 'Galindo Vinícius',
          value: 4
        },
        {
          text: 'Igor Henrique',
          value: 5
        },
        {
          text: 'Karlos Gubianni',
          value: 6
        }
      ],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      schedules: [
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ]
    }
  },
  methods: {
    async addEvent() {
      let endDateTime = new Date(this.dialogData.date + ' ' + this.dialogData.time)
      endDateTime.setMinutes(endDateTime.getMinutes() + 60)
      console.log('adddd')
      if (this.dialogData.name !== '' && this.dialogData.cpf !== '' && (this.dialogData.dentist !== '' || this.dialogData.dentist === 0 )  && this.dialogData.time !== '') {
        console.log('entrou?')
        let aux = await this.checkIfAvailable(this.dialogData.dentist, this.dialogData.date, this.dialogData.time)
        console.log(aux)
        if (aux) {
          console.log('available')
          const event = {
            name: this.dialogData.name,
            cpf: this.dialogData.cpf,
            dentist: this.dialogData.dentist,
            color: this.colors[this.dialogData.dentist],
            start: new Date(this.dialogData.date + ' ' + this.dialogData.time),
            end: endDateTime,
            timed: true
          }
          // this.events.push(event)
          await this.$store.dispatch('agendamento/addAgendamento', event)
          this.events = this.$store.getters['agendamento/getAgendamentos']
          this.events.map((element) => {
            element.start = new Date(element.start)
            element.end = new Date(element.end)
          })
          this.dialog = false
          Swal.fire({
            icon: 'success',
            title: 'Agendamento feito com sucesso!'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'O dentista não está disponível nesse horário.'
          })
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Por favor insira todas as informações para o agendamento.'
        })
      }
    },
    async checkIfAvailable(dentist, date, time) {
      let result = false
      result = await axios.get('http://localhost:3000/checkIfAgendamentoIsAvaiable', {params: {
        dentist: dentist,
        date: date,
        time: time
      }})
      return result.data
    },
    async howMuchTime(event) {
      console.log(event.event)
      let result = ''
      result = await axios.get('http://localhost:3000/howMuchTime', {params: {
        start: event.event.start
      }})
      console.log(result.data)

      Swal.fire({
        icon: 'info',
        title: result.data
      })
      
      return result.data
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
  },
  async created() {
    try{
      await this.$store.dispatch('agendamento/list', {})
      this.events = this.$store.getters['agendamento/getAgendamentos']
      this.events.map((element) => {
        element.start = new Date(element.start)
        element.end = new Date(element.end)
      })
    } catch (err) {
      console.error(err)
    }
  },
  async mounted() {
    setTimeout(() => {
      this.updateKey++
    }, 1);
  }
}
</script>
