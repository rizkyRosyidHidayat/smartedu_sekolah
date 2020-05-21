<template>
	<div>
		<v-text-field
      v-model="search"
      prepend-icon="mdi-magnify"
      label="Cari Mapel"
      class="mb-3"
      single-line
      autocomplete="off"
      hide-details
    ></v-text-field>
    <v-row v-if="isLoading">
    	<v-col 
				v-for="(item, i) in 3" :key="i"
				cols="12" 
				md="4" sm="6">
				<Loader />
			</v-col>
    </v-row>
    <v-alert type="info" v-else-if="dataTes.length === 0">
    	Data Tes belum ada, silahkan tambah data tes terlebih dahulu
    	<TambahTes type="habis" />
    </v-alert>
    <v-alert type="info" v-else-if="hasilSearch.length === 0">
    	Data yang dicari tidak ditemukan
    </v-alert>
		<v-row dense v-else>
			<v-col 
				v-for="(item, i) in hasilSearch" :key="i"
				cols="12" 
				md="4" sm="6">
				<TesItem :data="item" :index="i" />
			</v-col>
			<v-col cols="12" md="4" sm="6">
				<v-sheet 
					class="d-flex justify-center align-center"
					color="grey lighten-2" 
					height="100%">
					<TambahTes />
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { 
		VCard, VCardText, VBtn,
		VRow, VCol,
		VSpacer, VIcon, VChip,
		VSheet, VAlert
	} from 'vuetify/lib'
	import TambahTes from '@/components/Tes/TambahTes'
	import Loader from '@/components/Loader'
	import TesItem from './TesItem'

	import {mapState} from 'vuex'

	export default{
		components: {
			VCard, VCardText, VBtn,
			VRow, VCol,
			VSpacer, VIcon, VChip,
			VSheet, VAlert,
			TambahTes, 
			Loader,
			TesItem
		},

		data: () => ({
			detail: [
				{ colom: 'Kelas', value: 'X' },
				{ colom: 'Jurusan', value: 'Rekayasa Perangkat Lunak' },
				{ colom: 'Tanggal Sync', value: '29/03/2020' },
				{ colom: 'Tanggal Tes', value: '30/03/2020' },
				{ colom: 'Waktu Tes', value: '12:00' },
				{ colom: 'Durasi', value: '90 Menit' },
				{ colom: 'Token', value: 'THK765' },
			],
			search: ''
		}),

		created () {
			this.$store.dispatch('dataTes/getDataTes')
			this.$store.dispatch('dataTes/updateIsLoading', true)
      this.$store.dispatch('dataMaster/getDataJurusan')
      this.$store.dispatch('dataMaster/getDataMapel')
      this.$store.dispatch('dataMaster/getDataKelas')
      this.$store.dispatch('dataMaster/getDataRuang')
   //    const token = JSON.parse(window.localStorage.getItem('dataToken'))
			// let dataToken = null
			// if (token === null) {
			// 	dataToken = [{ id: 0 }]
			// } else {
			// 	dataToken = token
			// }
			// this.$store.commit('dataTes/updateDataToken', dataToken)
		},

		computed: {
			...mapState('dataTes', ['dataTes', 'isLoading']),
      hasilSearch() {
        return this.dataTes.filter(tes => {
          return tes.subject.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
		}
	}
</script>