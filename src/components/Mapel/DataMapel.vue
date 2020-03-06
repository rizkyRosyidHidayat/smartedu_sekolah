<template>
	<v-data-table
		:headers="header"
		:search="search"
		:items="data"
		:items-per-page="10">
		<template v-slot:top>
			<div>
				<div class="d-flex">
					<v-spacer></v-spacer>	
					<TambahMapel/>				
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
		<template v-slot:item.action="{item}">
			<div class="d-flex">
				<EditMapel/>
			</div>
		</template>
	</v-data-table>
</template>

<script>
	import {
		VDataTable, VAlert,
		VSpacer
	} from 'vuetify/lib'
	import EditMapel from '@/components/Mapel/EditMapel'
	import TambahMapel from '@/components/Mapel/TambahMapel'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer,
			TambahMapel,
			EditMapel
		},

		data: () => ({
			header: [
				{ text: 'No', value: 'no', sortable: false },
				{ text: 'Kelas', value: 'kelas', sortable: false },
				{ text: 'Jurusan', value: 'jurusan', sortable: false },
				{ text: 'Mata Pelajaran', value: 'nama', sortable: false },
				{ text: 'KKM', value: 'kkm', sortable: false },
				{ text: 'Action', value: 'action', sortable: false }
			],
			data: [
				{
					nama: 'Bahasa Indonesia',
					kelas: 'X',
					jurusan: 'Akuntansi',
					kkm: '75',
					no: 1
				}
			],
			search: ''
		})
	}
</script>