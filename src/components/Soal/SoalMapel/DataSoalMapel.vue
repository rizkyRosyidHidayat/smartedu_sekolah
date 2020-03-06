<template>
  <v-data-table
    :headers="header"
    :search="search"
    :items="data"
    :items-per-page="10">
    <template v-slot:top>
      <div>
        <div class="d-flex">
          <v-spacer></v-spacer>  
          <v-btn 
            depressed
            color="success"
            @click="$router.push({ name: 'tambah-soal' })">
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
    <template v-slot:no-result>
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

  export default {
    components: {
      VDataTable, VAlert,
      VSpacer, VBtn, VIcon,
      HapusSoalMapel,
    },

    data: () => ({
      header: [
        { text: 'No', value: 'no', sortable: false },
        { text: 'Pertanyaan', value: 'kelas', sortable: false },
        { text: 'Kunci Jawaban', value: 'jurusan', sortable: false },
        { text: 'Pembahasan', value: 'kkm', sortable: false },
        { text: 'Action', value: 'action', sortable: false }
      ],
      data: [
        {
          kelas: 'X',
          jurusan: 'Akuntansi',
          kkm: '75',
          no: 1
        }
      ],
      search: ''
    })
  }
</script>