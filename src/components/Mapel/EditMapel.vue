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
          <span class="title">Edit Mata Pelajaran</span>
        </div>
        <v-form v-model="valid" ref="form">
          <v-card-text class="pa-6 pb-0">
            <v-select
              :items="dataKelas"
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
              :disabled="data.group.id === ''?true:false"
              v-model="data.major.id"
              label="Jurusan"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-row>
              <v-col cols="12" sm="8">
                <v-text-field
                  v-model="data.name"
                  label="Nama Mapel"
                  outlined
                  dense
                  :rules="requiredRule"
                  autocomplete="off"
                ></v-text-field>                
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="data.score"
                  v-mask="mask"
                  label="KKM"
                  outlined
                  dense
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
  import Notif from '@/components/Notif'
  import { mapState } from 'vuex'
  import { mask } from 'vue-the-mask'

  export default {
    props: ['data'],

    directives: {
      mask
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
        dataMapel: {
          major_id: '',
          group_id: '',
          school_id: '',
          name: '',
          score: '',
          id: ''
        },
        mask: '##',
        items: ['foo', 'bar', 'zee'],
        requiredRule: [v => !!v || 'Data harus diisi'],
        msg: {
          success: 'Data berhasil diubah',
          error: 'Data tidak gagal diubah',
          visible: false
        }
      }
    },

    computed: {
      ...mapState('dataMaster', ['dataJurusan', 'isLoading', 'status', 'dataKelas', 'dataRuang']),
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
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          // console.log(this.dataMapel)
          var school = JSON.parse(window.localStorage.getItem('data_sekolah'))
          this.dataMapel.id = this.data.id
          this.dataMapel.major_id = this.data.major.id
          this.dataMapel.group_id = this.data.group.id
          this.dataMapel.school_id = school.id
          this.dataMapel.name = this.data.name
          this.dataMapel.score = this.data.score

          this.$store.dispatch('dataMaster/putDataMapel', this.dataMapel)
          this.$store.dispatch('dataMaster/updateIsLoading', true)
          this.msg.visible = true
        }
      },
      visible (val) {
        this.msg.visible = val
      }
    }
  }
</script>
