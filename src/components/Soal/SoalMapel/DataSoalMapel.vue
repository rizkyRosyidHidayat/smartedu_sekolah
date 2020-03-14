<template>
  <v-data-table
    :headers="header"
    :search="search"
    :items="dataSoal"
    :items-per-page="10">
    <template v-slot:top>
      <div>
        <div class="d-flex">
          <v-spacer></v-spacer>  
          <v-btn 
            depressed
            color="success"
            @click="$router.push({ name: 'tambah-soal', params: { id: id, name: name } })">
            <v-icon class="mr-3">mdi-plus</v-icon>
            tambah soal
          </v-btn>   
        </div>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Cari Mata Pelajaran"
          single-line
          autocomplete="off"
          hide-details
        ></v-text-field>
      </div>
    </template>
    <template v-slot:item.pertanyaan="{item}">
      <div v-html="item.pertanyaan"></div>
    </template>
    <template v-slot:no-data>
      <v-alert type="info" class="mt-4">
        <div>Data tidak ditemukan</div>
      </v-alert>
    </template>
    <template v-slot:item.action="{item}">
      <div class="d-flex">
        <v-btn 
          icon 
          color="primary"
          @click="$router.push({ name: 'review' })">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        
        <HapusSoalMapel/>
      </div>
    </template>
  </v-data-table>
</template>

<script>
  import {
    VDataTable, VAlert,
    VSpacer, VBtn, VIcon 
  } from 'vuetify/lib'
  import HapusSoalMapel from '@/components/Soal/SoalMapel/HapusSoalMapel'

  import {getDataSoal} from '@/config/soal'

  export default {
    components: {
      VDataTable, VAlert,
      VSpacer, VBtn, VIcon,
      HapusSoalMapel,
    },

    data: () => ({
      header: [
        // { text: 'No', value: 'no', sortable: false },
        { text: 'Pertanyaan', value: 'pertanyaan', sortable: false },
        { text: 'Kunci Jawaban', value: 'jurusan', sortable: false },
        { text: 'Pembahasan', value: 'kkm', sortable: false },
        { text: 'Action', value: 'action', sortable: false }
      ],
      id: 0,
      name: '',
      dataSoal: [],
      search: '',
      isLoading: false
    }),

    created () {
      this.isLoading = true
      this.id = this.$route.params.id
      this.name = this.$route.params.name
      getDataSoal(parseInt(this.id))
        .then(res => {
          if (res.status === 200) {
            this.dataSoal = res.data
            this.isLoading = false
          }
        })
        .catch(err => {
          this.isLoading = false
        })
    }
  }
</script>