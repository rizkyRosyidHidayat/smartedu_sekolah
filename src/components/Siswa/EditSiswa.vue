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
          <span class="title">Edit siswa</span>
        </div>
          <v-form v-model="valid" ref="form">
            <v-card-text class="pa-6 pb-0">
              <v-text-field
                v-model="data.nisn"
                label="NISN"
                outlined
                dense
                :rules="requiredRule"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                v-model="data.name"
                label="Nama siswa"
                outlined
                dense
                :rules="requiredRule"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                v-model="data.password"
                label="Password"
                outlined
                dense
                :rules="requiredRule"
                autocomplete="off"
              ></v-text-field>
              <v-select
                :items="dataJurusan"
                item-text="major.name"
                item-value="major.id"
                v-model="data.major.id"
                label="Jurusan"
                outlined
                dense
                :rules="requiredRule"              
              ></v-select>
              <v-select
                :items="detailKelas"
                item-text="group.name"
                item-value="group.id"
                v-model="data.group.id"
                :disabled="data.major.id === ''?true:false"
                label="Kelas"
                outlined
                dense
                :rules="requiredRule"              
              ></v-select>
              <v-select
                :items="detailRuang"
                item-text="name"
                item-value="id"              
                v-model="data.room.id"
                label="Ruang kelas"
                :disabled="data.group.id === ''?true:false"
                outlined
                dense
                :rules="requiredRule"              
              ></v-select>

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
        </v-form>
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
  import { mapState } from 'vuex'
  import Notif from '@/components/Notif'

  export default {
    props: ['data'],

    components: {
      VDialog, VCard,
      VCardText, VCardActions,
      VBtn, VDivider,
      VForm, VTextField, VSelect, VSpacer,
      VIcon, Notif
    },

    data () {
      return {
        dialog: false,
        valid: true,
        dataSiswa: {
          major_id: '',
          group_id: '',
          name: '',
          nisn: '',
          password: '',
          room_id: ''
        },
        requiredRule: [v => !!v || 'Data harus diisi'],
        msg: {
          success: 'Data berhasil diubah',
          error: 'Data gagal diubah',
          visible: false
        }
      }
    },

    computed: {
      ...mapState('dataMaster', ['dataJurusan', 'dataRuang']),
      ...mapState('dataSiswa', ['status', 'isLoading']),
      detailKelas: {
        get: function () {
          return this.dataJurusan.filter(kelas => kelas.major.id === this.data.major.id)
        },
        set: function (val) {
          this.dataJurusan.filter(kelas => kelas.major.id === val)
        }
      },
      detailRuang: {
        get: function () {
          return this.dataRuang.filter(ruang => ruang.group.id === this.data.group.id && ruang.major.id === this.data.major.id)
        },
        set: function (val) {
          this.dataRuang.filter(ruang => ruang.group.id === val && ruang.major.id === this.data.major.id)
        }
      }
    },

    watch: {
      'data.major.id': function (val) {
        this.detailKelas = val
      },
      'data.group.id': function (val) {
        this.detailRuang = val
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          // console.log(this.dataSiswa)
          this.dataSiswa.id = this.data.id
          this.dataSiswa.name = this.data.name
          this.dataSiswa.nisn = this.data.nisn
          this.dataSiswa.password = this.data.password
          this.dataSiswa.major_id = this.data.major.id
          this.dataSiswa.group_id = this.data.group.id
          this.dataSiswa.room_id = this.data.room.id
          this.$store.dispatch('dataSiswa/putDataSiswa', this.dataSiswa)
          this.$store.dispatch('dataSiswa/updateIsLoading', true)
          this.msg.visible = true
        }
      },
      visible (val) {
        this.msg.visible = val
      }
    }
  }
</script>
