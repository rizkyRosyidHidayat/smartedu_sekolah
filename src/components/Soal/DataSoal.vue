<template>
  <div>
    <Loader type="table" v-if="isLoading" />
    <v-data-table
      v-else
      :headers="header"
      :search="search"
      :items="result"
      :items-per-page="10">
      <template v-slot:top>
        <div>
          <div class="d-flex">
            <v-spacer></v-spacer>     
          </div>
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Cari Mata Pelajaran"
            single-line
            autocomplete="off"
            hide-details
          ></v-text-field>
        </div>
      </template>
      <template v-slot:no-result>
        <v-alert type="info" class="mt-4">
          <div>Data tidak ditemukan</div>
        </v-alert>
      </template>
      <template v-slot:item.no="{item}">
        {{result.map(x => x.id).indexOf(item.id)+1}}
      </template>
      <template v-slot:item.action="{item}">
        <div class="d-flex">
          <v-btn 
            icon 
            color="primary"
            @click="$router.push({ name: 'review', params: { id: item.id, name: item.name } })">
            <v-icon small>mdi-eye</v-icon>
          </v-btn>
          <v-btn 
            icon 
            color="success"
            @click="$router.push({ name: 'soal-mapel', params: { id: item.id, name: item.group.name+'_'+item.major.name+'_'+item.name } })">
            <v-icon small>mdi-view-list</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {
    VDataTable, VAlert,
    VSpacer, VBtn, VIcon 
  } from 'vuetify/lib'
  import Loader from '@/components/Loader'
  import { mapState } from 'vuex'

  export default {
    props: ['hasilFilter'],

    components: {
      VDataTable, VAlert,
      VSpacer, VBtn, VIcon,
      Loader
    },

    data: () => ({
      header: [
        { text: 'No', value: 'no', sortable: false },
        { text: 'Kelas', value: 'group.name', sortable: false },
        { text: 'Jurusan', value: 'major.name', sortable: false },
        { text: 'Mata Pelajaran', value: 'name', sortable: false },
        { text: 'KKM', value: 'score', sortable: false },
        { text: 'Jumlah Soal', value: 'jumlah_soal', sortable: false },
        { text: 'Action', value: 'action', sortable: false }
      ],
      search: ''
    }),

    created() {
      this.$store.dispatch('dataMaster/getDataMapel')
      this.$store.dispatch('dataMaster/updateIsLoading', true)
    },

    computed: {
      ...mapState('dataMaster', ['dataMapel', 'isLoading']),
      result () {
        return this.dataMapel
          .filter(mapel => mapel.group.name.includes(this.hasilFilter.group))
          .filter(mapel => mapel.major.name.includes(this.hasilFilter.major))
      } 
    }
  }
</script>