<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }"> 
      <v-btn 
        v-on="on"
        fab title="Hapus jadwal"
        x-small 
        depressed 
        color="white">
        <v-icon small color="error">mdi-trash-can</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="title pa-6">
        Apakah anda yakin ingin menghapus 
        data tes ini ?
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
    props: ['id'],

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
        this.$store.dispatch('dataTes/deleteDataTes', this.id)
        this.$store.dispatch('dataTes/updateIsLoading', true)
      }
    },

    computed: {
      ...mapState('dataTes', ['isLoading'])
    }
  }
</script>