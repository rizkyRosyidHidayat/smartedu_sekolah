<template>
	<div>
		<Loader type="table" v-if="isLoading" />
		<v-data-table
			v-else
			:headers="header"
			:search="search"
			:items="result"
			:items-per-page="10">
			<template v-slot:item.room="{ item }">
	      {{ item.group.name }} {{ namaJurusan(item.major.name) }} {{ item.room.name }}
	    </template>
			<template v-slot:no-data>
				<v-alert type="info" class="mt-4 text-left">
					Silahkan download template untuk dapat mengisi data siswa dan kemudian diupload data siswanya.
				</v-alert>
			</template>
			<template v-slot:top>
				<div>
					<div class="d-flex">
						<v-spacer></v-spacer>
						<TambahSiswa/>

						<a
	            target="_blank"
	            class="ml-3 decoration-none"
	            href="https://app.smart-edu.id/sekolah/downloads/TEMPLATE_DATA_PESERTA_USBK.xlsx"
	          >
	            <v-btn
	            	depressed
	            	color="success">
	            	download template
	            </v-btn>
	          </a>

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
					<EditSiswa :data="item" />
					<HapusSiswa :id="item.id" />
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
	import TambahSiswa from '@/components/Siswa/TambahSiswa'
	import UploadSiswa from '@/components/Siswa/UploadSiswa.vue'
	import KosongkanSiswa from '@/components/Siswa/KosongkanSiswa'
	import EditSiswa from '@/components/Siswa/EditSiswa'
	import HapusSiswa from '@/components/Siswa/HapusSiswa'
	import Loader from '@/components/Loader.vue'

	import { mapState } from 'vuex'

	export default {
		props: ['hasilFilter'],

		components: {
			VDataTable, VAlert,
			VSpacer,
			HapusSiswa,
			EditSiswa,
			KosongkanSiswa,
			UploadSiswa,
			TambahSiswa,
			Loader
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
			search: ''
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
			}
		},

		created () {
			this.$store.dispatch('dataSiswa/getDataSiswa')
		},

		computed: {
			...mapState('dataSiswa', ['dataSiswa', 'status', 'isLoading']),
			result () {
				return this.dataSiswa
					.filter(siswa => siswa.group.name.includes(this.hasilFilter.group))
	        .filter(siswa => siswa.major.name.includes(this.hasilFilter.major))
	        .filter(siswa => siswa.room.name.includes(this.hasilFilter.room))
			}			
		}
	}
</script>