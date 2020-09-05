<template>
	<div>
		<v-toolbar elevation="0">
			<v-toolbar-title>Rekapitulasi Nilai Ujian</v-toolbar-title>
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
			:items="dataResult"
			:items-per-page="10">
			<template v-slot:item.no="{item}">
				{{dataResult.map(x => x.user_nisn).indexOf(item.user_nisn)+1}}
			</template>
			<template v-slot:item.exam_score="{item}">
				{{item.exam_score.toFixed(2)}}
			</template>
			<template v-slot:no-data>
				<v-alert type="info" class="mt-4">
					<div>Data tidak ditemukan</div>
				</v-alert>
			</template>
		</v-data-table>
	</div>
	</template>

<script>
	import { mapState } from 'vuex'
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
				{ text: 'NISN', value: 'user_nisn', sortable: false },
				{ text: 'Nama', value: 'user_name', sortable: false },
				{ text: 'Nilai', value: 'exam_score', sortable: false },
			],
			search: ''
		}),

		methods: {
		},

		computed: {
			...mapState('dataResult', ['dataResult', 'isLoading'])
		}
	}
</script>