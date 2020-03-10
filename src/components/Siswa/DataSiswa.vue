<template>
	<v-data-table
		:headers="header"
		:search="search"
		:items="data"
		:items-per-page="10">
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
				{ text: 'No', value: 'no', sortable: false },
				{ text: 'Nama', value: 'provinsi', sortable: false },
				{ text: 'NISN', value: 'kabupaten', sortable: false },
				{ text: 'Password', value: 'nama', sortable: false },
				{ text: 'Ruang Kelas', value: 'jenjang', sortable: false },
				{ text: 'Action', value: 'action', sortable: false }
			],
			data: [
				{
					provinsi: 'Jawa Tengah',
					kabupaten: 'Wonosobo',
					nama: 'SMK N 1 Wonosobo',
					jenjang: '2020',
					username: 'VGCT89',
					password: 'CCG567',
					no: 1
				}
			],
			search: ''
		})
	}
</script>