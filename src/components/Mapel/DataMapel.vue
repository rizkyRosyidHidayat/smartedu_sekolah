<template>
	<v-data-table
		:headers="header"
		:search="search"
		:items="dataMapel"
		:items-per-page="10">
		<template v-slot:top>
			<div>
				<div class="d-flex">
					<v-spacer></v-spacer>	
					<TambahMapel @updatedMapel="updatedMapel" />				
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

	import { getDataMapel } from '@/config/mapel'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer,
			TambahMapel,
			EditMapel
		},

		data: () => ({
			header: [
				// { text: 'No', value: 'no', sortable: false },
				{ text: 'Kelas', value: 'group', sortable: false },
				{ text: 'Jurusan', value: 'major', sortable: false },
				{ text: 'Mata Pelajaran', value: 'name', sortable: false },
				{ text: 'KKM', value: 'score', sortable: false },
				{ text: 'Action', value: 'action', sortable: false }
			],
			dataMapel: [],
			search: '',
			isLoading: false
		}),

		created () {
			this.isLoading = true
			getDataMapel ()
				.then(res => {
					if (res.status === 200) {
						this.dataMapel = res.data.data
						this.isLoading = false
					}
				})
				.catch(err => {
					this.isLoading = false					
				})
		},

		methods: {
			updatedMapel (val) {
				this.dataMapel = val
			}
		}
	}
</script>