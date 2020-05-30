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
              :items="detailKelas"
              item-text="name"
              item-value="id"
              v-model="detail.group.id"
              label="Kelas"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-select
              :items="detailJurusan"
              item-text="major.name"
              item-value="major.id"
              v-model="detail.major.id"
              label="Jurusan"
              :disabled="detail.group.id === ''?true:false"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-text-field
              v-model="detail.name"
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
  import { mapState } from 'vuex'

  export default {
    props: ['detail'],

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
        detailRuang: {
          major_id: '',
          group_id: '',
          name: ''
        },
        requiredRule: [v => !!v || 'Data harus diisi']
      }
    },

    computed: {
      ...mapState('dataMaster', ['dataRuang', 'dataKelas', 'dataJurusan']),
      detailKelas: {
        set(val) {
          this.dataKelas.filter(kelas => kelas.id === this.detail.group.id)
        },
        get() {
          return this.dataKelas
        }
      },
      detailJurusan: {
        set(val) {
          this.dataJurusan.filter(ruang => ruang.id === this.detail.major.id)
        },
        get() {
          return this.dataRuang.filter(ruang => ruang.group.id === this.detail.group.id)
        }
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.detailRuang.name = this.detail.name
          this.detailRuang.group_id = this.detailRuang.group_id.id
          console.log(this.detailRuang)
        }
      }
    }
  }
</script>
