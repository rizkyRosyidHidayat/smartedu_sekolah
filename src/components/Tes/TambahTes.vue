<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent>
      <template v-slot:activator="{ on }">
        <v-btn 
          icon v-on="on"
          depressed 
          x-large>
          <v-icon size="60" color="primary">
            mdi-plus-circle
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <div class="pa-3 se-primary white--text text-center">
          <span class="title">Tambah Jadwal</span>
        </div>
        <v-card-text class="pa-6 pb-0">
          <v-form v-model="valid" ref="form">
            <v-select
              :items="items"
              v-model="dataMapel.id_kelas"
              label="Kelas"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-select
              :items="items"
              v-model="dataMapel.id_jurusan"
              :disabled="dataMapel.id_kelas === ''?true:false"
              label="Jurusan"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-select
              :items="items"
              v-model="dataMapel.id_mapel"
              :disabled="dataMapel.id_jurusan === ''?true:false"
              label="Mata Pelajaran"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-row>
              <v-col 
                class="py-0"
                cols="12" 
                md="6" 
                sm="12">
                <v-text-field
                  v-model="dataMapel.sync"
                  label="Tanggal Sync (2020-03-20)"
                  outlined
                  dense
                  v-mask="mask"
                  :rules="dateRule"
                  autocomplete="off"
                ></v-text-field>                
              </v-col>
              <v-col 
                class="py-0"
                cols="12" 
                md="6" 
                sm="12">
                <v-text-field
                  v-model="dataMapel.mulai"
                  label="Tanggal Pelaksanaan (2020-03-20)"
                  outlined
                  dense
                  v-mask="mask"
                  :rules="dateRule"
                  autocomplete="off"
                ></v-text-field>                
              </v-col>
            </v-row>
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
  import { mask } from 'vue-the-mask'

  export default {
    directives: {
      mask,
    },

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
        dataMapel: {
          id_jurusan: '',
          id_kelas: '',
          id_Mapel: '',
          sync: '',
          mulai: ''
        },
        mask: '####-##-##',
        items: ['foo', 'bar', 'zee'],
        requiredRule: [v => !!v || 'Data harus diisi']
      }
    },

    computed: {
      dateRule () {
        return [
          ...this.requiredRule,
          v => !!v.match(/^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/igm) || 'Harus berupa tanggal'
        ]
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          console.log(this.dataMapel)
        }
      }
    }
  }
</script>
