<template>
	<div>
		<Loader type="table" v-if="isLoading" />
		<v-data-table
			v-else
			:headers="header"
			:search="search"
			:items="dataKelas"
			:items-per-page="10">
			<template v-slot:top>
				<div>
					<div class="d-flex">
						<v-spacer></v-spacer>					
					</div>
					<v-text-field
						v-model="search"
						prepend-icon="mdi-magnify"
						label="Cari Kelas"
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
					<EditKelas :detail="detailKelas(item.id)"/>
				</div>
			</template>
		</v-data-table>
	</div>
</template>

<script>
	import { getDataKelas } from '@/config/kelas'
	import {
		VDataTable, VAlert,
		VSpacer
	} from 'vuetify/lib'
	import EditKelas from '@/components/Kelas/EditKelas'
	import Loader from '@/components/Loader'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer,
			EditKelas, 
			Loader
		},

		data: () => ({
			header: [
				// { text: 'No', value: 'no', sortable: false },
				{ text: 'Kelas', value: 'name', sortable: false },
				// { text: 'Total Ruang Kelas', value: 'ruang', sortable: false },
				{ text: 'Action', value: 'action', sortable: false }
			],
			data: [
				{
					ruang: '10 Ruang',
					kelas: 'X',
					no: 1
				}
			],
			dataKelas: [],
			search: '',
			isLoading: true
		}),

		methods: {
			detailKelas (id) {
				var hasil = this.dataKelas.filter(kelas => kelas.id === id)
				return {...hasil[0]}
			}
		},

		created () {
			this.isLoading = true
			getDataKelas ()
				.then(res => {
					if (res.status === 200) {
						this.dataKelas = res.data.data
						this.isLoading = false
					}
				})
				.catch(() => {
					this.isLoading = false
				})
		}
	}
</script>