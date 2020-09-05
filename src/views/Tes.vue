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
						item-text="text"
						item-value="value"
						v-model="hari"
						label="Hari"
						outlined
						dense
					></v-select>
				</div>
			</div>

			<DataTes/>
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon,
		VSelect
	} from 'vuetify/lib'
	import DataTes from '@/components/Tes/DataTes'

	export default {
		components: {
			VCard, VCardText,
			VIcon,
			VSelect,
			DataTes
		},

		data: () => ({
			hari: '',
			kelas: '',
			ruang: '',
			data: [
				{ text: 'Ujian hari ke 1', value: 1 },
				{ text: 'Ujian hari ke 2', value: 2 },
				{ text: 'Ujian hari ke 3', value: 3 },
				{ text: 'Ujian hari ke 4', value: 4 },
				{ text: 'Ujian hari ke 5', value: 5 },
				{ text: 'Ujian hari ke 6', value: 6 },
				{ text: 'Ujian hari ke 7', value: 7 },
				{ text: 'Ujian hari ke 8', value: 8 },
				{ text: 'Ujian hari ke 9', value: 9 },
				{ text: 'Ujian hari ke 10', value: 10 },
				{ text: 'Ujian hari ke 11', value: 11 },
				{ text: 'Ujian hari ke 12', value: 12 },
				{ text: 'Ujian hari ke 13', value: 13 },
				{ text: 'Ujian hari ke 14', value: 14 },
				{ text: 'Ujian hari ke 15', value: 15 },
				{ text: 'Ujian hari ke 16', value: 16 },
				{ text: 'Ujian hari ke 17', value: 17 },
				{ text: 'Ujian hari ke 18', value: 18 },
				{ text: 'Ujian hari ke 19', value: 19 },
				{ text: 'Ujian hari ke 20', value: 20 },
				{ text: 'Ujian hari ke 21', value: 21 },
				{ text: 'Ujian hari ke 22', value: 22 },
				{ text: 'Ujian hari ke 23', value: 23 },
				{ text: 'Ujian hari ke 24', value: 24 },
				{ text: 'Ujian hari ke 25', value: 25 },
				{ text: 'Ujian hari ke 26', value: 26 },
				{ text: 'Ujian hari ke 27', value: 27 },
				{ text: 'Ujian hari ke 28', value: 28 },
				{ text: 'Ujian hari ke 29', value: 29 },
				{ text: 'Ujian hari ke 30', value: 30 },
			]
		}),

		watch: {
			hari (val) {
				this.$store.dispatch('dataTes/getDataTesByHari', val)
			}
		}
	}
</script>