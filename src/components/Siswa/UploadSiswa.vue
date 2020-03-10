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
          upload Siswa
        </v-btn>
      </template>

      <v-card>
        <div class="pa-3 se-primary white--text text-center">
          <span class="title">Upload Siswa</span>
        </div>
        <v-card-text class="pa-6">
          <div>
            Silahkan upload data dari excel sesuai template yang sudah disediakan, jika belum ada silahkan download templatenya 
            <a
              target="_blank"
              href="https://drive.google.com/open?id=12NBX_iSqqvZJPBG-ZtjLBZdu8ftUEXaB"
            >
              disini.
            </a>
          </div>
          <v-form v-model="valid" ref="form">
            <v-file-input
              :loading="loading"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              show-size
              counter
              :rules="requiredRule"
              @change="importingData"
              label="File excel template"
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
  import {
    dataKelas,
    dataJurusan,
    dataRuang
  } from './uploadSiswa'

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
        loading: false,
        requiredRule: [v => !!v || 'Data harus diisi'],
        dataSheets: []
      }
    },

    methods: {
      importingData (e) {        
        var vm = this
        var reader = new FileReader()
        reader.readAsArrayBuffer(e);
        reader.onload = function(e) {
          var data = new Uint8Array(reader.result);
          var wb = XLSX.read(data, { type: "array" });
          wb.SheetNames.map((sheet, index) => {
            var worksheet = wb.Sheets[wb.SheetNames[index]];
            var dataSheet = XLSX.utils.sheet_to_json(worksheet)
            var dataSiswa = dataSheet.map(sheet => {
              sheet.JURUSAN = wb.SheetNames[index]
              return sheet
            })

            vm.dataSheets[index] = dataSiswa
          })
          
          // console.log(vm.dataSheets)
        }
      },
      validate () {
        if (this.$refs.form.validate()) {
          dataKelas(this.dataSheets)
          dataJurusan(this.dataSheets)
          dataRuang(this.dataSheets)
        }
      }
    }
  }
</script>
