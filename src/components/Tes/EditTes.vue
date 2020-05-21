<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent>
      <template v-slot:activator="{ on }">
        <v-btn 
          v-on="on"
          fab title="Edit jadwal"
          x-small 
          depressed 
          color="white" 
          class="mr-3">
          <v-icon small color="primary">mdi-pencil</v-icon>
        </v-btn>
      </template>

      <v-card>
        <div class="pa-3 se-primary white--text text-center">
          <span class="title">Tambah Jadwal</span>
        </div>
          <v-form v-model="valid" ref="form">
            <v-card-text class="pa-6 pb-0">
              <v-select
                :items="detailKelas"
                item-text="name"
                item-value="id"
                v-model="data.group.id"
                label="Kelas"
                outlined
                dense
                :rules="requiredRule"              
              ></v-select>
              <v-select
                :items="detailJurusan"
                item-text="major.name"
                item-value="major.id"
                v-model="data.major.id"
                :disabled="data.group.id === ''?true:false"
                label="Jurusan"
                outlined
                dense
                :rules="requiredRule"              
              ></v-select>
              <v-select
                :items="detailMapel"
                item-text="name"
                item-value="id"
                v-model="data.subject.id"
                :disabled="data.major.id === ''?true:false"
                label="Mata Pelajaran"
                outlined
                dense
                :rules="requiredRule"              
              ></v-select>
              <v-select
                :items="dataHari"
                v-model="data.day"
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
                    v-model="data.sync_date"
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
                    v-model="data.date_implementation"
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
                    v-model="data.hours_implementation"
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
                    v-model="data.duration_work"
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
  import { mapState } from 'vuex'
  import Notif from '@/components/Notif'

  export default {
    directives: {
      mask,
    },

    props: ['data', 'isVisible'],

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
          day: null,
          id: ''
        },
        mask: '####-##-##',
        maskWaktu: '##:##:##',
        maskDurasi: '###',
        maskHari: '##',
        items: ['foo', 'bar', 'zee'],
        requiredRule: [v => !!v || 'Data harus diisi'],
        school_id: 0,
        msg: {
          success: 'Data berhasil ditambahkan',
          error: 'Data gagal ditambahkan',
          visible: false
        },
        dataHari: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30
        ]
      }
    },

    mounted () {
      var sekolah = JSON.parse(window.localStorage.getItem('data_sekolah'))
      this.school_id = parseInt(sekolah.id)
    },

    computed: {
      ...mapState('dataTes', ['status', 'isLoading']),
      ...mapState('dataMaster', ['dataJurusan', 'dataMapel', 'dataKelas', 'dataRuang']),
      detailKelas: {
        get() {
          return this.dataKelas
        },
        set(val) {
          this.dataKelas.filter(kelas => kelas.id === val)
        }
      },
      detailJurusan: {
        get() {
          return this.dataRuang.filter(ruang => ruang.group.id === this.data.group.id)
        },
        set(val) {
          this.dataJurusan.filter(jurusan => jurusan.id === val)
        }
      },
      detailMapel: {
        get() {
          return this.dataMapel.filter(mapel => mapel.major.id === this.data.major.id && mapel.group.id === this.data.group.id)
        },
        set(val) {
          this.dataMapel.filter(mapel => mapel.major.id === this.data.major.id && mapel.group.id === val)
        }
      },
      dateRule () {
        return [
          ...this.requiredRule,
          v => !!v.match(/^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/igm) || 'Harus berupa tanggal'
        ]
      },
      timeRule () {
        return [
          ...this.requiredRule,
          v => !!v.match(/^([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/gm) || 'Harus berupa waktu'
        ]
      }
    },

    // watch: {
    //   'data.major.id': function (val) {
    //     this.detailKelas = val
    //   },
    //   'data.group.id': function (val) {
    //     this.detailMapel = val
    //   }
    // },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.dataTes.id = this.data.id
          this.dataTes.hours_implementation = this.data.hours_implementation
          this.dataTes.duration_work = this.data.duration_work
          this.dataTes.sync_date = this.data.sync_date
          this.dataTes.date_implementation = this.data.date_implementation
          this.dataTes.day = this.data.day
          this.dataTes.subject_id = this.data.subject.id
          this.dataTes.major_id = this.data.major.id
          this.dataTes.group_id = this.data.group.id
          this.$store.dispatch('dataTes/putDataTes', this.dataTes)
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
