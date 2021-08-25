 <template lang="pug">
  v-row
    v-col
      v-sheet.pa-5(min-height='calc(100vh - 100px)' rounded='lg')
        .text-h5.mb-5 Exame
        v-row.pb-0
          v-col.pb-0(cols='auto' align-self='center')
            .text-subtitle- Procurar por:
        v-row
          v-col(cols='5' align-self='center')
            v-text-field(v-model='search.patient_name' label='Nome do Paciente' hide-details outlined rounded dense)
          v-col(cols='5' align-self='center')
            v-text-field(v-model='search.exame' label='exame' hide-details outlined rounded dense)
          v-col(cols='1' align-self='center')
            v-btn(icon @click='filterExame')
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
                  v-list-item-title Data: {{ item.date }}
                  v-list-item-title Dentista Responsável: {{ item.dentist }}
                  v-list-item-title Paciente: {{ item.name }}
                  v-list-item-subtitle Tipo: {{ item.Exame }} | Resultado: {{ item.Result }} 
              v-divider(:key='index')
</template>

<script>
// @ is an alias to /src
import Swal from 'sweetalert2'
export default {
  name: 'Exame',
  methods: {
    async filterExame() {
      try{
        if(this.search.patient_name)
          await this.$store.dispatch('exame/filterByPatient', this.search.patient_name)
        else if(this.search.exame)
          await this.$store.dispatch('exame/filterByDoctor', this.search.exame)
        // if(this.search.tipo)
        // this.atendimentos = this.$store.getters['prontuario/getProntuarios']
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Nenhum Exame encontrado'
        })
        console.error(err)
      }
    }
  },
  computed: {
    list() {
      return this.$store.getters['exame/getExame']
    }
  },
  async created() {
    try{
      await this.$store.dispatch('exame/list', this.search)
    } catch (err) {
      console.error(err)
    }
  },
  data() {
    return {
      search: {
        patient_name: undefined,
        exame: undefined
      }
    }
  }
}
</script>
