<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-pencil</v-icon>
			<span class="ml-3 text-icon">Daftar Tes</span>
		</div>
		<v-card-text>
			<div class="d-flex">
				<div>
					<v-select
						:items="data"
						v-model="hari"
						label="Hari"
						outlined
						dense
					></v-select>
				</div>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					depressed>
					Filter		
				</v-btn>
			</div>

			<DataTes/>
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon, VBtn,
		VSelect,
		VSpacer
	} from 'vuetify/lib'
	import DataTes from '@/components/Tes/DataTes'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VSelect,
			VSpacer,
			DataTes
		},

		data: () => ({
			hari: '',
			kelas: '',
			ruang: '',
			data: ['foo', 'bar', 'zee']
		})
	}
</script>