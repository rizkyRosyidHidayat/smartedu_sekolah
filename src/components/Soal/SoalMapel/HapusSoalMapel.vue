<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }"> 
      <v-btn icon color="red" v-on="on">
        <v-icon small>mdi-trash-can</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="title pa-6">
        Apakah anda yakin ingin menghapus 
        data soal ini ?
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
    VCardActions,
    VBtn, VDivider,
    VSpacer,
    VIcon
  } from 'vuetify/lib'
  import {mapState} from 'vuex'

  export default {
    props: ['id', 'idMapel'],

    components: {
      VDialog, VCard,
      VCardActions,
      VBtn, VDivider,
      VSpacer,
      VIcon
    },

    data: () => ({
      dialog: false,
    }),

    methods: {
      hapusData () {
        this.$store.dispatch('dataSoal/deleteDataSoal', {
          id_soal: this.id,
          id_mapel: this.idMapel
        })
        this.$store.dispatch('dataSoal/updateIsLoading', true)
      }
    },

    computed: {
      ...mapState('dataSoal', ['isLoading'])
    }
  }
</script>