<template>
	<div>
		<Loader type="table" v-if="isLoading" />
		<v-data-table
			v-else
			:headers="header"
			:search="search"
			:items="detailJurusan"
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
					<EditJurusan :data="item"/>
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
	import EditJurusan from '@/components/Jurusan/EditJurusan'
	import { mapState } from 'vuex'
	import { uniqBy } from 'lodash'
	import Loader from '@/components/Loader'

	export default {
		components: {
			VDataTable, VAlert,
			VSpacer,
			EditJurusan,
			Loader
		},

		data: () => ({
			header: [
				// { text: 'No', value: 'no', sortable: false },
				{ text: 'Jurusan', value: 'major.name', sortable: false },
				{ text: 'Kelas', value: 'group.name', sortable: false },
				{ text: 'Action', value: 'action', sortable: false }
			],
			search: '',
		}),
		
		created () {			
      this.$store.dispatch('dataMaster/getDataJurusan')
      this.$store.dispatch('dataMaster/getDataRuang')
			this.$store.dispatch('dataMaster/updateIsLoading', true)
		},

		computed: {
			...mapState('dataMaster', ['dataJurusan', 'dataRuang', 'isLoading']),
			detailJurusan() {
				return uniqBy(this.dataRuang, 'major.id')
			}
		}
	}
</script>