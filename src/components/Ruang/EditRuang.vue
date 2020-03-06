<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent>
      <template v-slot:activator="{ on }">
        <v-btn icon color="primary" v-on="on">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <v-card>
        <div class="pa-3 se-primary white--text text-center">
          <span class="title">Edit Ruang</span>
        </div>
        <v-card-text class="pa-6 pb-0">
          <v-form v-model="valid" ref="form">
            <v-select
              :items="items"
              v-model="dataRuang.id_jurusan"
              label="Jurusan"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-select
              :items="items"
              v-model="dataRuang.id_kelas"
              label="Kelas"
              :disabled="dataRuang.id_kelas === ''?true:false"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-text-field
              v-model="dataRuang.nama"
              label="Ruang Kelas"
              outlined
              dense
              :rules="requiredRule"
              autocomplete="off"
            ></v-text-field>            
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false">
            kembali
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            @click.prevent="validate"
            type="submit"
            depressed>
            simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {
    VDialog, VCard,
    VCardText, VCardActions,
    VBtn, VDivider,
    VForm, VTextField, VSelect, VSpacer,
    VIcon
  } from 'vuetify/lib'

  export default {
    components: {
      VDialog, VCard,
      VCardText, VCardActions,
      VBtn, VDivider,
      VForm, VTextField, VSelect, VSpacer,
      VIcon
    },

    data () {
      return {
        dialog: false,
        valid: true,
        dataRuang: {
          id_jurusan: '',
          id_kelas: '',
          nama: ''
        },
        items: ['foo', 'bar', 'zee'],
        requiredRule: [v => !!v || 'Data harus diisi']
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          console.log(this.dataRuang)
        }
      }
    }
  }
</script>
