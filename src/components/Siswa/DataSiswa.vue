<template>
	<v-data-table
		:headers="header"
		:search="search"
		:items="dataSiswa"
		:items-per-page="10">
		<template v-slot:item.room="{ item }">
      {{ item.group }} {{ namaJurusan(item.major) }} {{ item.room }}
    </template>
		<template v-slot:no-data>
			<v-alert type="info" class="mt-4 text-left">
				Silahkan pilih jurusan dan kelas untuk menampilkan
				daftar siswa
			</v-alert>
		</template>
		<template v-slot:top>
			<div>
				<div class="d-flex">
					<v-spacer></v-spacer>
					<TambahSiswa/>

					<UploadSiswa/>

					<KosongkanSiswa/>					
				</div>
				<v-text-field
	        v-model="search"
	        prepend-icon="mdi-magnify"
	        label="Cari Siswa"
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
		<template v-slot:item.action="{item}">
			<div class="d-flex">
				<EditSiswa/>
				<HapusSiswa/>
			</div>
		</template>
	</v-data-table>
</template>

<script>
	import {
		VDataTable, VAlert,
		VSpacer
	} from 'vuetify/lib'	
	import TambahSiswa from '@/components/Siswa/TambahSiswa'
	import UploadSiswa from '@/components/Siswa/UploadSiswa.vue'
	import KosongkanSiswa from '@/components/Siswa/KosongkanSiswa'
	import EditSiswa from '@/components/Siswa/EditSiswa'
	import HapusSiswa from '@/components/Siswa/HapusSiswa'

	import { getDataSiswa } from '@/config/siswa'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer,
			HapusSiswa,
			EditSiswa,
			KosongkanSiswa,
			UploadSiswa,
			TambahSiswa,
		},

		data: () => ({
			header: [
				// { text: 'No', value: 'no', sortable: false },
				{ text: 'Nama', value: 'name', sortable: false },
				{ text: 'NISN', value: 'nisn', sortable: false },
				{ text: 'Password', value: 'password', sortable: false },
				{ text: 'Ruang Kelas', value: 'room', sortable: false },
				{ text: 'Action', value: 'action', sortable: false }
			],
			dataSiswa: [],
			search: '',
			isLoading: false
		}),

		methods: {
			namaJurusan(jurusan) {
				var nama = jurusan.split(' ')
				var singkatan = nama.filter(nama => nama.toLowerCase() !== 'dan')
					.map(nama => nama[0])
				return singkatan.join('')
			}
		},

		created () {
			this.isLoading = true
			getDataSiswa ()
				.then(res => {
					if (res.status === 200) {
						this.dataSiswa = res.data.data
						this.isLoading = false
						// console.log(this.dataSiswa)
					}
				})
				.catch(err => {
					this.isLoading = false
				})
		}
	}
</script>