<template>
	<div>
		<Loader type="table" v-if="isLoading" />
		<v-data-table
			v-else
			:headers="header"
			:search="search"
			:items="dataRuang"
			:items-per-page="10">
			<template v-slot:top>
				<div>
					<div class="d-flex">
						<v-spacer></v-spacer>					
					</div>
					<v-text-field
		        v-model="search"
		        prepend-icon="mdi-magnify"
		        label="Cari Ruang"
		        single-line
		        autocomplete="off"
		        hide-details
		      ></v-text-field>
				</div>
			</template>
			<template v-slot:item.name="{ item }">
	      {{ item.group.name }} {{ namaJurusan(item.major.name) }} {{ item.name }}
	    </template>
			<template v-slot:no-result>
	      <v-alert type="info" class="mt-4">
	        <div>Data tidak ditemukan</div>
	      </v-alert>
	    </template>
			<template v-slot:item.action="{item}">
				<div class="d-flex">
					<EditRuang :data="item" />
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
	import {mapState} from 'vuex'
	import EditRuang from '@/components/Ruang/EditRuang'
	import Loader from '@/components/Loader'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer,
			EditRuang,
			Loader
		},

		data: () => ({
			header: [
				// { text: 'No', value: 'no', sortable: false },
				{ text: 'Jurusan', value: 'major.name', sortable: false },
				{ text: 'Kelas', value: 'group.name', sortable: false },
				{ text: 'Ruang Kelas', value: 'name', sortable: false },
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
			},
			// detailRuang (id) {
			// 	var hasil = this.dataRuang.filter(ruang => ruang.id === id)
			// 	return {...hasil[0]}
			// }
		},		

		created () {
			this.$store.dispatch('dataMaster/getDataKelas')
			this.$store.dispatch('dataMaster/getDataRuang')
			this.$store.dispatch('dataMaster/getDataJurusan')
			this.$store.dispatch('dataMaster/updateIsLoading', true)
		},

		computed: {
			...mapState('dataMaster', ['isLoading', 'dataRuang']),
		}
	}
</script>