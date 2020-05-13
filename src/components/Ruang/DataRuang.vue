<template>
	<div>
		<Loader type="table" v-if="isLoading" />
		<v-data-table
			v-else
			:headers="header"
			:search="search"
			:items="dataRuang"
			:items-per-page="10">
			<template v-slot:top>
				<div>
					<div class="d-flex">
						<v-spacer></v-spacer>					
					</div>
					<v-text-field
		        v-model="search"
		        prepend-icon="mdi-magnify"
		        label="Cari Ruang"
		        single-line
		        autocomplete="off"
		        hide-details
		      ></v-text-field>
				</div>
			</template>
			<template v-slot:item.name="{ item }">
	      {{ item.group.name }} {{ namaJurusan(item.major.name) }} {{ item.name }}
	    </template>
			<template v-slot:no-result>
	      <v-alert type="info" class="mt-4">
	        <div>Data tidak ditemukan</div>
	      </v-alert>
	    </template>
			<template v-slot:item.action="{item}">
				<div class="d-flex">
					<EditRuang :detail="detailRuang(item.id)" :kelas="dataKelas" :jurusan="dataJurusan" />
				</div>
			</template>
		</v-data-table>
	</div>
</template>

<script>
	import {
		VDataTable, VAlert,
		VSpacer
	} from 'vuetify/lib'
	import { getDataRuang } from '@/config/ruang'
	import { getDataKelas } from '@/config/kelas'
	import { getDataJurusan} from '@/config/jurusan'

	import EditRuang from '@/components/Ruang/EditRuang'
	import Loader from '@/components/Loader'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer,
			EditRuang,
			Loader
		},

		data: () => ({
			header: [
				// { text: 'No', value: 'no', sortable: false },
				{ text: 'Jurusan', value: 'major.name', sortable: false },
				{ text: 'Kelas', value: 'group.name', sortable: false },
				{ text: 'Ruang Kelas', value: 'name', sortable: false },
				{ text: 'Action', value: 'action', sortable: false }
			],
			dataRuang: [],
			dataKelas: [],
			dataJurusan: [],
			search: '',
			isLoading: true
		}),

		methods: {
			namaJurusan(jurusan) {
				var nama = jurusan.split(' ')
				if (nama.length === 1) {
					return nama[0]
				} else {
					var singkatan = nama.filter(nama => nama.toLowerCase() !== 'dan')
						.map(nama => nama[0])
					return singkatan.join('')
				}
			},
			detailRuang (id) {
				var hasil = this.dataRuang.filter(ruang => ruang.id === id)
				return {...hasil[0]}
			}
		},		

		created () {
			getDataRuang ()
				.then(res => {
					if (res.status === 200) {
						this.dataRuang = res.data.data
						this.isLoading = false
						// console.log(this.dataRuang)
					}
				})
				.catch(err => {
					this.isLoading = false
				})
			getDataKelas ()
				.then(res => {
					if (res.status === 200) {
						this.dataKelas = res.data.data
					}
				})
			getDataJurusan ()
				.then(res => {
					if (res.status === 200) {
						this.dataJurusan = res.data.data
					}
				})
		}
	}
</script>