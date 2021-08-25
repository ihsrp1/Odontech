<template lang="pug">
  v-row
    v-col
      v-sheet.pa-5(min-height='calc(100vh - 100px)' rounded='lg')
        .text-h5.mb-5 Atendimentos
        v-row.pb-0
          v-col.pb-0(cols='auto' align-self='center')
            .text-subtitle- Procurar por:
        v-row
          v-col(cols='5' align-self='center')
            v-text-field.atendimento-input-patient(v-model='search.patient_name' label='Nome do Paciente' hide-details outlined rounded dense)
          v-col(cols='5' align-self='center')
            v-text-field.atendimento-input-dentist(v-model='search.doctor_name' label='Nome do Dentista' hide-details outlined rounded dense)
          v-col(cols='auto' align-self='center')
            v-text-field.atendimento-input-date-initial(v-model='search.inicial' label='Data Inicial' hide-details outlined rounded dense)
          v-col(cols='auto' align-self='center')
            v-text-field.atendimento-input-date-final(v-model='search.final' label='Data Final' hide-details outlined rounded dense)
          v-col(cols='auto' align-self='center')
            v-text-field.atendimento-input-type(v-model='search.tipo' label='Tipo do Atendimento' hide-details outlined rounded dense)
          v-col(cols='1' align-self='center')
            v-btn.atendimento-btn-filter(icon @click='filterAtendimento')
              v-icon mdi-filter-variant
        v-row
          v-virtual-scroll(
            :items="list"
            height="710"
            item-height="100"
          )
            template(v-slot:default="{ item }")
              v-list-item(@click='openProntuario()' :key='item.data')
                v-list-item-avatar(color='grey lighten-2')
                  v-icon mdi-account
                v-list-item-content
                  v-list-item-title.atendimento-date Data: {{ item.data }}
                  v-list-item-title.atendimento-dentist Dentista Responsável: {{ item.medico_responsavel }}
                  v-list-item-title.atendimento-patient Paciente: {{ item.nome_paciente }}
                  v-list-item-subtitle.atendimento-type Tipo: {{ item.tipo }} 
              v-divider(:key='index')
</template>

<script>
// @ is an alias to /src
import Swal from 'sweetalert2'
export default {
  name: 'Atendimento',
  methods: {
    async filterAtendimento() {
      try{
        if(this.search.patient_name)
          await this.$store.dispatch('atendimento/filterByPatient', this.search.patient_name)
        else if(this.search.doctor_name)
          await this.$store.dispatch('atendimento/filterByDoctor', this.search.doctor_name)
        else if(this.search.inicial && this.search.final) {
          await this.$store.dispatch('atendimento/filterByDateRange', {from: this.search.inicial, to: this.search.final})
        }
        else if(this.search.tipo) {
          await this.$store.dispatch('atendimento/filterByType', this.search.tipo)
        }
        else {
          await this.$store.dispatch('atendimento/list', this.search)
        }
        // if(this.search.tipo)
        // this.atendimentos = this.$store.getters['prontuario/getProntuarios']
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Nenhum atendimento encontrado'
        })
        console.error(err)
      }
    }
  },
  computed: {
    list() {
      return this.$store.getters['atendimento/getAtendimentos']
    }
  },
  async created() {
    try{
      await this.$store.dispatch('atendimento/list', this.search)
    } catch (err) {
      console.error(err)
    }
  },
  data() {
    return {
      search: {
        patient_name: undefined,
        doctor_name: undefined,
        inicial: undefined,
        final: undefined,
        tipo: undefined
      }
    }
  }
}
</script>
