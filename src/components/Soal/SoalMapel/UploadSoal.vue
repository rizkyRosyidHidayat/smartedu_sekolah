<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent>
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          class="mx-3"
          v-on="on"
          color="success">
          <v-icon class="mr-3">mdi-upload</v-icon>
          upload Soal
        </v-btn>
      </template>

      <v-card>
        <div class="pa-3 se-primary white--text text-center">
          <span class="title">Upload Soal</span>
        </div>
        <v-card-text class="pa-6">
          <div>
            Silahkan upload soal dari document sesuai template yang sudah disediakan, jika belum ada silahkan download templatenya 
            <a
              target="_blank"
              href="https://drive.google.com/open?id=12NBX_iSqqvZJPBG-ZtjLBZdu8ftUEXaB"
            >
              disini.
            </a>
          </div>
          <v-form v-model="valid" ref="form">
            <v-file-input
              :loading="isLoading"
              accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              show-size
              counter
              :rules="requiredRule"
              @change="importingData"
              label="File document template"
            ></v-file-input>
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
            :loading="isLoading"
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
    VForm, VFileInput, VSpacer,
    VIcon
  } from 'vuetify/lib'
  import XLSX from 'xlsx'
  import { postDataSiswa } from '@/config/siswa'
  import mammoth from 'mammoth'

  export default {
    components: {
      VDialog, VCard,
      VCardText, VCardActions,
      VBtn, VDivider,
      VForm, VFileInput, VSpacer,
      VIcon
    },

    data () {
      return {
        dialog: false,
        valid: true,
        isLoading: false,
        status: null,
        requiredRule: [v => !!v || 'Data harus diisi'],
        dataSheets: [],
        isVisible: false,
        dataUpload: {},
      }
    },

    methods: {
      importingData (e) {        
        var vm = this
        var reader = new FileReader()
        reader.readAsArrayBuffer(e);
        reader.onload = function(e) {
          var arrayBuffer = reader.result

          mammoth.convertToHtml({arrayBuffer: arrayBuffer})
            .then(function (resultObject) {
              // result.innerHTML = resultObject.value
              console.log(resultObject.messages)
            })
          
          // console.log(vm.dataSheets)
        }
      },
      validate () {
        if (this.$refs.form.validate()) {
          // dataRuang(this.dataSheets)
          this.isLoading = true
          postDataSiswa(dataRuang(this.dataSheets))          
            .then(res => {
              this.dataUpload = res.data.data
              this.isLoading = false
              this.status = true
            })
            .catch(err => {
              this.isLoading = false
              this.status = false
            })
          this.isVisible = true
        }
      },
      visible (val) {
        this.isVisible = val
      }
    }
  }
</script>
