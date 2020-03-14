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
              :items="kelas"
              item-text="name"
              item-value="id"
              return-object
              v-model="detailRuang.group_id"
              label="Kelas"
              outlined
              dense
              :rules="requiredRule"              
            ></v-select>
            <v-select
              :items="detailJurusan"
              item-text="major"
              item-value="id"
              v-model="detailRuang.major_id"
              label="Jurusan"
              :disabled="detailRuang.group_id === ''?true:false"
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

  export default {
    props: ['detail', 'kelas', 'jurusan'],

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
        detailJurusan: [],
        requiredRule: [v => !!v || 'Data harus diisi']
      }
    },

    created () {
      var kelas = this.kelas
        .filter(kelas => kelas.name === this.detail.group.toString())
      this.detailRuang.group_id = {...kelas[0]}.id    

      // this.detailJurusan = this.jurusan
      //   .filter(jurusan => jurusan.group === {...kelas[0]}.name)
      // this.detailRuang.major_id = {...this.detailJurusan[0]}.id

      // var jurusan = this.detailJurusan
      //   .filter(jurusan => jurusan.major === this.detail.major.toString())
      // this.detailRuang.major_id = {...jurusan[0]}.id

    },

    watch: {
      'detailRuang.group_id': function (val) {
        this.detailJurusan = this.jurusan.filter(jurusan => jurusan.group.toString() === val.name)
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
