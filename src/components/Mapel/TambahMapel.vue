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
        <v-form v-model="valid" ref="form">
          <v-card-text class="pa-6 pb-0">
            <v-select
              :items="dataKelas"
              item-text="name"
              item-value="id"
              v-model="dataMapel.group_id"
              label="Kelas"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-select
              :items="detailJurusan"
              item-text="major.name"
              item-value="major.id"
              v-model="dataMapel.major_id"
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
    VIcon, VRow, VCol
  } from 'vuetify/lib'
  import { mask } from 'vue-the-mask'
  import Notif from '@/components/Notif'
  import { mapState } from 'vuex'

  export default {
    directives: {
      mask
    },

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
        mask: '##',
        major_id: 0,
        detailKelas: [],
        requiredRule: [v => !!v || 'Data harus diisi'],
        msg: {
          success: 'Data berhasil ditambahkan',
          error: 'Data tidak gagal ditambahkan',
          visible: false
        }
      }
    },

    computed: {
      ...mapState('dataMaster', ['dataJurusan', 'isLoading', 'status', 'dataKelas', 'dataRuang']),
      detailJurusan: {
        set(val) {
          this.dataJurusan.filter(jurusan => jurusan.id === this.dataMapel.major_id)
        },
        get() {
          return this.dataRuang.filter(ruang => ruang.group.id === this.dataMapel.group_id)
        }
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          // console.log(this.dataMapel)
          var school = JSON.parse(window.localStorage.getItem('data_sekolah'))
          this.dataMapel.school_id = school.id
          this.$store.dispatch('dataMaster/postDataMapel', this.dataMapel)
          this.$store.dispatch('dataMaster/updateIsLoading', true)
          // this.isLoading = true
          // postDataMapel (this.dataMapel)
          //   .then(res => {
          //     if (res.status === 200) {
          //       this.isLoading = false
          //       this.status = true
          //       this.$emit('updatedMapel', res.data.data)
          //       this.dialog = false
          //     }
          //   })
          //   .catch(err => {
          //     this.isLoading = false
          //     this.status = false
          //   })
          this.msg.visible = true
        }
      },
      visible (val) {
        this.msg.visible = val
      }
    }
  }
</script>
