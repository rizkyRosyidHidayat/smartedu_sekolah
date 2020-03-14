<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-face</v-icon>
			<span class="ml-3 text-icon">Daftar Mata Pelajaran</span>
		</div>
		<v-card-text>
			<v-row>
				<v-col cols="12" md="4" sm="4" class="py-0">
					<v-select
						:items="data"
						v-model="jurusan"
						label="Jurusan"
						outlined
						dense
					></v-select>
				</v-col>
				<v-col cols="12" md="4" sm="4" class="py-0">
					<v-select
						:items="data"
						v-model="kelas"
						label="Kelas"
						:disabled="jurusan === ''?true:false"
						outlined
						dense
					></v-select>
				</v-col>
				<!-- <v-col cols="12" md="4" sm="4" class="py-0">
					<v-select
						:items="data"
						v-model="ruang"
						label="Ruang kelas"
						:disabled="kelas === ''?true:false"
						outlined
						dense
					></v-select>
				</v-col> -->
				<v-col cols="12" md="4" sm="4" class="py-0">
					<div class="d-flex">
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							depressed>
							Filter		
						</v-btn>
					</div>
				</v-col>
			</v-row>

			<DataSoal/>
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon, VBtn,
		VRow, VSelect, VCol,
		VSpacer
	} from 'vuetify/lib'
	import DataSoal from '@/components/Soal/DataSoal'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer,
			DataSoal
		},

		data: () => ({
			jurusan: '',
			kelas: '',
			ruang: '',
			data: []
		})
	}
</script>