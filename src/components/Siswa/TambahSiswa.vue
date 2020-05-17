<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent>
      <template v-slot:activator="{ on }">
        <v-btn depressed color="primary" v-on="on">
          <v-icon class="mr-3">mdi-plus</v-icon>
          tambah data
        </v-btn>
      </template>

      <v-card>
        <div class="pa-3 se-primary white--text text-center">
          <span class="title">Tambah siswa</span>
        </div>
        <v-card-text class="pa-6 pb-0">
          <v-form v-model="valid" ref="form">
            <v-text-field
              v-model="dataSiswa.nisn"
              counter
              v-mask="maskNisn"
              label="NISN"
              outlined
              dense
              :rules="requiredRule"
              autocomplete="off"
            ></v-text-field>
            <v-text-field
              v-model="dataSiswa.name"
              label="Nama siswa"
              outlined
              dense
              :rules="requiredRule"
              autocomplete="off"
            ></v-text-field>
            <!-- <v-text-field
              v-model="dataSiswa.password"
              label="Password"
              outlined
              dense
              :rules="requiredRule"
              autocomplete="off"
            ></v-text-field> -->
            <v-select
              :items="dataJurusan"
              item-text="name"              
              item-value="id"              
              v-model="dataSiswa.major_id"
              label="Jurusan"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-select
              :items="dataKelas"
              item-text="name"
              item-value="id"
              v-model="dataSiswa.group_id"
              label="Kelas"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-select
              :items="detailRuang"
              item-text="name"
              item-value="id"              
              v-model="dataSiswa.room_id"
              label="Ruang kelas"
              :disabled="dataSiswa.group_id === ''?true:false"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
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
    VIcon
  } from 'vuetify/lib'
  import { mapState } from 'vuex'
  import { mask } from 'vue-the-mask'
  import Notif from '@/components/Notif'

  export default {
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
        dataSiswa: {
          major_id: '',
          group_id: '',
          name: '',
          nisn: '',
          password: '',
          room_id: ''
        },
        maskNisn: '##########',
        requiredRule: [v => !!v || 'Data harus diisi'],
        detailRuang: [],
        msg: {
          success: 'Data berhasil diubah',
          error: 'Data gagal diubah',
          visible: false
        }
      }
    },

    computed: {
      ...mapState('dataMaster', ['dataJurusan', 'dataRuang', 'dataKelas']),
      ...mapState('dataSiswa', ['status', 'isLoading'])
    },

    watch: {
      'dataSiswa.group_id': function (val) {
        this.detailRuang = this.dataRuang.filter(ruang => ruang.group.id === val && ruang.major.id === this.dataSiswa.major_id)
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.dataSiswa.password = this.generateText(6)
          this.$store.dispatch('dataSiswa/putDataSiswa', this.dataSiswa)
          this.$store.dispatch('dataSiswa/updateIsLoading', true)
          this.msg.visible = true
        }
      },
      visible (val) {
        this.msg.visible = val
      },
      generateText(len) {
        let text = "";
        let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        for (let i = 0; i < len; i++) {
          text += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return text;
      }
    }
  }
</script>
