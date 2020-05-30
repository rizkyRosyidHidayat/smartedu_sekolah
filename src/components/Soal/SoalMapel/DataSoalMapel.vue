<template>
  <div>
    <Loader type="table" v-if="isLoading" />
    <v-data-table
      v-else
      :headers="header"
      :search="search"
      :items="dataSoal"
      :items-per-page="10">
      <template v-slot:top>
        <div>
          <div class="d-flex">
            <v-spacer></v-spacer>  
            <!-- <UploadSoal/> -->
            <!-- <a :href="urlTambah"> -->
              <v-btn 
                depressed
                @click="$router.push({ name: 'tambah-soal', params: { id: id, name: name } })"
                color="primary">
                <v-icon class="mr-3">mdi-plus</v-icon>
                tambah soal
              </v-btn>
            <!-- </a>    -->
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
      <template v-slot:item.pembahasan="{item}">
        <div v-html="item.pembahasan"></div>
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
            @click="$router.push({ name: 'edit-soal', params: { idSoal: item.id, idMapel: id } })">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          
          <HapusSoalMapel :id="item.id" />
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {
    VDataTable, VAlert,
    VSpacer, VBtn, VIcon 
  } from 'vuetify/lib'
  import HapusSoalMapel from '@/components/Soal/SoalMapel/HapusSoalMapel'
  import UploadSoal from '@/components/Soal/SoalMapel/UploadSoal'
  import Loader from '@/components/Loader'
  import { mapState } from 'vuex'

  export default {
    components: {
      VDataTable, VAlert,
      VSpacer, VBtn, VIcon,
      UploadSoal,
      HapusSoalMapel,
      Loader
    },

    data: () => ({
      header: [
        // { text: 'No', value: 'no', sortable: false },
        { text: 'Pertanyaan', value: 'pertanyaan', sortable: false },
        { text: 'Kunci Jawaban', value: 'jawaban[0].kunci', sortable: false },
        { text: 'Pembahasan', value: 'pembahasan', sortable: false },
        { text: 'Action', value: 'action', sortable: false }
      ],
      id: 0,
      name: '',
      search: '',
    }),

    computed: {
      ...mapState('dataSoal', ['dataSoal' ,'isLoading']),
      urlTambah() {      
        // return `${process.env.VUE_APP_HOSTNAME}/tambah-soal/${this.id}/${this.name}`
        return `https://cbt.smknukesesi.sch.id/tambah-soal/${this.id}/${this.name}`
      }
    },

    created () {
      this.id = this.$route.params.id
      this.name = this.$route.params.name
      this.$store.dispatch('dataSoal/getDataSoal', this.id)
      this.$store.dispatch('dataSoal/updateIsLoading', true)
    },
  }
</script>