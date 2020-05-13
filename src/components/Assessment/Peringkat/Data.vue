<template>
	<div>
		<v-toolbar elevation="0">
			<v-toolbar-title>Peringkat Ujian</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-text-field
				label="Cari siswa"
				outlined
				class="mt-7"
				append-icon="mdi-magnify"
				dense
			></v-text-field>
		</v-toolbar>
		<v-data-table
			:headers="header"
			:search="search"
			:items="dataJurusan"
			:items-per-page="10">
			<template v-slot:no-result>
	      <v-alert type="info" class="mt-4">
	        <div>Data tidak ditemukan</div>
	      </v-alert>
	    </template>
		</v-data-table>
	</div>
</template>

<script>
	import {
		VDataTable, VAlert,
		VSpacer, VToolbar, VToolbarTitle,
		VTextField
	} from 'vuetify/lib'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer, VToolbar, VToolbarTitle,
			VTextField
		},

		data: () => ({
			header: [
				{ text: 'No', value: 'no', sortable: false },
				{ text: 'NISN', value: 'no', sortable: false },
				{ text: 'Nama', value: 'no', sortable: false },
				{ text: 'Jurusan', value: 'major', sortable: false },
				{ text: 'Kelas', value: 'group', sortable: false },
				{ text: 'Ruang Kelas', value: 'group', sortable: false },
				{ text: 'Total Nilai', value: 'group', sortable: false },
				{ text: 'Rata-Rata', value: 'group', sortable: false },
				{ text: 'Ranking', value: 'group', sortable: false },
			],
			dataJurusan: [],
			search: '',
			isLoading: false,
			dataKelas: []
		}),

		methods: {
		},

		created () {
		}
	}
</script>