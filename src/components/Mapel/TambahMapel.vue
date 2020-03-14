<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent>
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          color="success"
          v-on="on">
          <v-icon class="mr-3">mdi-plus</v-icon>
          tambah Mapel
        </v-btn>
      </template>

      <v-card>
        <div class="pa-3 se-primary white--text text-center">
          <span class="title">Tambah Mapel</span>
        </div>
        <v-card-text class="pa-6 pb-0">
          <v-form v-model="valid" ref="form">
            <v-select
              :items="dataKelas"
              item-text="name"
              return-object
              v-model="dataMapel.group_id"
              label="Kelas"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-select
              :items="dataJurusan"
              item-text="major"
              item-value="id"
              v-model="dataMapel.major_id"
              :disabled="dataMapel.group_id === ''?true:false"
              label="Jurusan"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-row>
              <v-col cols="12" sm="8">
                <v-text-field
                  v-model="dataMapel.name"
                  label="Nama Mapel"
                  outlined
                  dense
                  :rules="requiredRule"
                  autocomplete="off"
                ></v-text-field>                
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="dataMapel.score"
                  label="KKM"
                  outlined
                  dense
                  :rules="requiredRule"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <Notif :msg="msg" :status="status" @visible="visible" />
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
            :loading="isLoading"
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
    VIcon, VRow, VCol
  } from 'vuetify/lib'
  import { postDataMapel } from '@/config/mapel'
  import { getDataKelas } from '@/config/kelas'
  import { getDataJurusan } from '@/config/jurusan'
  import Notif from '@/components/Notif'

  export default {
    components: {
      VDialog, VCard,
      VCardText, VCardActions,
      VBtn, VDivider,
      VForm, VTextField, VSelect, VSpacer,
      VIcon, VRow, VCol, Notif
    },

    data () {
      return {
        dialog: false,
        valid: true,
        dataMapel: {
          major_id: '',
          group_id: '',
          name: '',
          score: '',
          school_id: ''
        },
        group_id: 0,
        dataKelas: [],
        dataJurusan: [],
        requiredRule: [v => !!v || 'Data harus diisi'],
        isLoading: false,
        status: null,
        msg: {
          success: 'Data berhasil ditambahkan',
          error: 'Data tidak gagal ditambahkan',
          visible: false
        }
      }
    },

    created () {
      getDataKelas ()
        .then(res => {
          if (res.status === 200) {
            this.dataKelas = res.data.data
          }
        })
      getDataJurusan ()
        .then(res => {
          if (res.status === 200) {
            this.dataJurusan = res.data.data
          }
        })
    },

    watch: {
      'dataMapel.group_id': function (val) {
        this.dataJurusan = this.dataJurusan.filter(jurusan => jurusan.group.toString() === val.name)
        this.group_id = val.id
        // console.log(val.id)
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          // console.log(this.dataMapel)
          var school = JSON.parse(window.localStorage.getItem('data_sekolah'))
          this.dataMapel.group_id = this.group_id
          this.dataMapel.school_id = school.user_id
          this.isLoading = true
          postDataMapel (this.dataMapel)
            .then(res => {
              if (res.status === 200) {
                this.isLoading = false
                this.status = true
                this.$emit('updatedMapel', res.data.data)
              }
            })
            .catch(err => {
              this.isLoading = false
              this.status = false
            })
          this.msg.visible = true
        }
      },
      visible (val) {
        this.msg.visible = val
      }
    }
  }
</script>
