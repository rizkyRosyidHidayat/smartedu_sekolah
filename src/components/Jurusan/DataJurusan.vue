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
				</div>
				<v-text-field
	        v-model="search"
	        prepend-icon="mdi-magnify"
	        label="Cari Jurusan"
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
				<EditJurusan/>
			</div>
		</template>
	</v-data-table>
</template>

<script>
	import {
		VDataTable, VAlert,
		VSpacer
	} from 'vuetify/lib'
	import EditJurusan from '@/components/Jurusan/EditJurusan'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer,
			EditJurusan
		},

		data: () => ({
			header: [
				{ text: 'No', value: 'no', sortable: false },
				{ text: 'Jurusan', value: 'jurusan', sortable: false },
				{ text: 'Kelas', value: 'kelas', sortable: false },
				{ text: 'Action', value: 'action', sortable: false }
			],
			data: [
				{
					jurusan: 'Jawa Tengah',
					kelas: 'X',
					no: 1
				}
			],
			search: ''
		})
	}
</script>