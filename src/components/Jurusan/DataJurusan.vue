<template>
	<v-data-table
		:headers="header"
		:search="search"
		:items="dataJurusan"
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
				<EditJurusan :detail="detailJurusan(item.id)" :kelas="dataKelas" />
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
	import { getDataJurusan } from '@/config/jurusan'
  import { getDataKelas } from '@/config/kelas'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer,
			EditJurusan
		},

		data: () => ({
			header: [
				// { text: 'No', value: 'no', sortable: false },
				{ text: 'Jurusan', value: 'major', sortable: false },
				{ text: 'Kelas', value: 'group', sortable: false },
				{ text: 'Action', value: 'action', sortable: false }
			],
			dataJurusan: [],
			search: '',
			isLoading: false,
			dataKelas: []
		}),

		methods: {
			detailJurusan (id) {
				var hasil = this.dataJurusan.filter(jurusan => jurusan.id === id)
				return {...hasil[0]}
			}
		},

		created () {
			this.isLoading = true
			getDataJurusan ()
				.then(res => {
					if (res.status === 200) {
						this.dataJurusan = res.data.data
						this.isLoading = false
						// console.log(this.dataJurusan)
					}
				})
				.catch(err => {
					this.isLoading = false
				})

			getDataKelas()
        .then(res => {
          if (res.status === 200) {
            this.dataKelas = res.data.data
          }
        })
		}
	}
</script>