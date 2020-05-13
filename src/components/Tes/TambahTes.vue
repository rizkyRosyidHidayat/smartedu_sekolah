<template>
    <v-dialog
      v-model="dialog"
      width="500"
      persistent>
      <template v-slot:activator="{ on }">
        <v-btn 
          v-if="type === 'habis'"
          v-on="on"
          color="white primary--text"
          class="ml-3"
          depressed small>
          tambah data
        </v-btn>
        <v-btn 
          v-else
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
          <v-form v-model="valid" ref="form">
            <v-card-text class="pa-6 pb-0">
              <v-select
                :items="dataJurusan"
                item-text="major.name"
                return-object
                v-model="jurusan"
                label="Jurusan"
                outlined
                dense
                :rules="requiredRule"              
              ></v-select>
              <v-select
                :items="detailKelas"
                item-text="group.name"
                return-object
                v-model="kelas"
                :disabled="jurusan === ''?true:false"
                label="Kelas"
                outlined
                dense
                :rules="requiredRule"              
              ></v-select>
              <v-select
                :items="detailMapel"
                item-text="name"
                item-value="id"
                v-model="dataTes.subject_id"
                :disabled="kelas === ''?true:false"
                label="Mata Pelajaran"
                outlined
                dense
                :rules="requiredRule"              
              ></v-select>
              <v-select
                :items="dataHari"
                item-text="text"
                item-value="value"
                v-model="dataTes.day"
                label="Ujian hari ke"
                :rules="requiredRule"
                outlined
                autocomplete="off"
                dense
              ></v-select>
              <v-row>
                <v-col 
                  class="py-0"
                  cols="12" 
                  md="6" 
                  sm="12">
                  <v-text-field
                    v-model="dataTes.sync_date"
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
                    v-model="dataTes.date_implementation"
                    label="Tanggal Pelaksanaan (2020-03-20)"
                    outlined
                    dense
                    v-mask="mask"
                    :rules="dateRule"
                    autocomplete="off"
                  ></v-text-field>                
                </v-col>
              </v-row>
              <v-row>
                <v-col 
                  class="py-0"
                  cols="12" 
                  md="6" 
                  sm="12">
                  <v-text-field
                    v-model="dataTes.hours_implementation"
                    label="Waktu Pelaksanaan"
                    outlined
                    dense
                    v-mask="maskWaktu"
                    :rules="timeRule"
                    autocomplete="off"
                  ></v-text-field>                
                </v-col>
                <v-col 
                  class="py-0"
                  cols="12" 
                  md="6" 
                  sm="12">
                  <v-text-field
                    v-model="dataTes.duration_work"
                    label="Durasi Pelaksanaan"
                    outlined
                    dense
                    v-mask="maskDurasi"
                    :rules="requiredRule"
                    autocomplete="off"
                  ></v-text-field>                
                </v-col>
              </v-row>

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
              @click.prevent="validate"
              :loading="isLoading"
              type="submit"
              depressed>
              simpan
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
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
  import { mapState } from 'vuex'
  import Notif from '@/components/Notif'

  export default {
    props: ['type'],

    directives: {
      mask,
    },

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
        dataTes: {
          major_id: '',
          group_id: '',
          subject_id: '',
          duration_work: 0,
          hours_implementation: '',
          sync_date: '',
          date_implementation: '',
          day: null
        },
        mask: '####-##-##',
        maskWaktu: '##:##',
        maskDurasi: '###',
        maskHari: '##',
        items: ['foo', 'bar', 'zee'],
        requiredRule: [v => !!v || 'Data harus diisi'],
        detailKelas: [],
        detailMapel: [],
        school_id: 0,
        jurusan: '',
        kelas: '',
        msg: {
          success: 'Data berhasil ditambahkan',
          error: 'Data gagal ditambahkan',
          visible: false
        },
        dataHari: [
          { text: 'Ujian hari ke 1', value: 1 },
          { text: 'Ujian hari ke 2', value: 2 },
          { text: 'Ujian hari ke 3', value: 3 },
          { text: 'Ujian hari ke 4', value: 4 },
          { text: 'Ujian hari ke 5', value: 5 },
          { text: 'Ujian hari ke 6', value: 6 },
          { text: 'Ujian hari ke 7', value: 7 },
          { text: 'Ujian hari ke 8', value: 8 },
          { text: 'Ujian hari ke 9', value: 9 },
          { text: 'Ujian hari ke 10', value: 10 },
          { text: 'Ujian hari ke 11', value: 11 },
          { text: 'Ujian hari ke 12', value: 12 },
          { text: 'Ujian hari ke 13', value: 13 },
          { text: 'Ujian hari ke 14', value: 14 },
          { text: 'Ujian hari ke 15', value: 15 },
          { text: 'Ujian hari ke 16', value: 16 },
          { text: 'Ujian hari ke 17', value: 17 },
          { text: 'Ujian hari ke 18', value: 18 },
          { text: 'Ujian hari ke 19', value: 19 },
          { text: 'Ujian hari ke 20', value: 20 },
          { text: 'Ujian hari ke 21', value: 21 },
          { text: 'Ujian hari ke 22', value: 22 },
          { text: 'Ujian hari ke 23', value: 23 },
          { text: 'Ujian hari ke 24', value: 24 },
          { text: 'Ujian hari ke 25', value: 25 },
          { text: 'Ujian hari ke 26', value: 26 },
          { text: 'Ujian hari ke 27', value: 27 },
          { text: 'Ujian hari ke 28', value: 28 },
          { text: 'Ujian hari ke 29', value: 29 },
          { text: 'Ujian hari ke 30', value: 30 },
        ]
      }
    },

    created () {
      var sekolah = JSON.parse(window.localStorage.getItem('data_sekolah'))
      this.school_id = parseInt(sekolah.id)
    },

    computed: {
      ...mapState('dataTes', ['status', 'isLoading']),
      ...mapState('dataMaster', ['dataJurusan', 'dataMapel']),
      dateRule () {
        return [
          ...this.requiredRule,
          v => !!v.match(/^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/igm) || 'Harus berupa tanggal'
        ]
      },
      timeRule () {
        return [
          ...this.requiredRule,
          v => !!v.match(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/gm) || 'Harus berupa waktu'
        ]
      }
    },

    watch: {
      jurusan (val) {
        this.detailKelas = this.dataJurusan.filter(jurusan => jurusan.major.name === val.major.name)
        this.dataTes.major_id = val.major.id
      },
      kelas (val) {
        this.detailMapel = this.dataMapel.filter(mapel => mapel.group.id === val.group.id && mapel.major.id === val.major.id)
        this.dataTes.group_id = val.group.id
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.dataTes.hours_implementation = this.dataTes.hours_implementation+':00'
          this.$store.dispatch('dataTes/postDataTes', this.dataTes)
          this.$store.dispatch('dataTes/updateIsLoading', true)
          this.msg.visible = true
        }
      },
      visible (val) {
        this.msg.visible = val
      }
    }
  }
</script>
