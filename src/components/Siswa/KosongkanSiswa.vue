<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }"> 
      <v-btn
        depressed
        v-on="on"
        color="red white--text">
        <v-icon class="mr-3">mdi-trash-can</v-icon>
        kosongkan siswa
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="title pa-6">
        Apakah anda yakin ingin menghapus 
        semua data siswa ?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">kembali</v-btn>
        <v-btn @click="hapusData" :loading="isLoading" color="primary">hapus</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    VDialog, VCard,
    VCardText, VCardActions,
    VBtn, VDivider,
    VSpacer,
    VIcon
  } from 'vuetify/lib'
  import { mapState } from 'vuex'

  export default {
    components: {
      VDialog, VCard,
      VCardText, VCardActions,
      VBtn, VDivider,
      VSpacer,
      VIcon
    },

    data: () => ({
      dialog: false,
    }),

    methods: {
      hapusData () {
        var school = JSON.parse(window.localStorage.getItem('data_sekolah'))
        // console.log(school)
        this.$store.dispatch('dataSiswa/deleteAllDataSiswa', school.id)
        this.$store.dispatch('dataSiswa/updateIsLoading', true)
      }
    },

    computed: {
      ...mapState('dataSiswa', ['isLoading'])
    }
  }
</script>