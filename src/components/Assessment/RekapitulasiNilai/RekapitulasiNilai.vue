<template>
	<div class="mt-3">
		<div class="title">Rekapitulasi Nilai berdasarkan</div>
		<v-form ref="form" v-model="valid">
			<v-row>
				<v-col sm="12" class="py-0">
					<v-select
						:items="dataMapel"
						item-text="name"
						item-value="id"
						v-model="hasilFilter.subject_id"
						label="Mata pelajaran"
						required
						:rules="requiredRule"
						outlined
						dense
					></v-select>
				</v-col>
				<v-col sm="12" class="py-0">
					<v-select
						:items="dataKelas"
						item-text="name"
						item-value="id"
						return-object
						v-model="kelas"
						label="Kelas"
						required
						:rules="requiredRule"
						outlined
						dense
					></v-select>
				</v-col>
				<v-col sm="12" class="py-0">
					<v-select
						:items="detailJurusan"
						item-text="major.name"
						item-value="major.id"
						return-object
						:disabled="kelas === ''?true:false"
						v-model="jurusan"
						label="Jurusan"
						required
						:rules="requiredRule"
						outlined
						dense
					></v-select>
				</v-col>
				<v-col sm="12" class="py-0">
					<v-select
						:items="detailRuang"
						item-text="name"
						item-value="id"
						v-model="hasilFilter.room_id"
						label="Ruang kelas"
						:disabled="kelas === ''?true:false"
						required
						:rules="requiredRule"
						outlined
						dense
					></v-select>
				</v-col>
				<v-col sm="12" class="py-0">
					<div class="d-flex">
						<v-spacer></v-spacer>
						<v-btn
							:disabled="!valid"
							:loading="isLoading"
							@click.prevent="validate"
							type="submit"
							color="primary"
							depressed>
							Filter		
						</v-btn>
					</div>
				</v-col>
			</v-row>
		</v-form>

		<v-divider></v-divider>

		<div class="my-3">
			<v-btn
				depressed
				class="mr-3"
				color="orange"
				dark>
				<v-icon class="mr-2">mdi-file-export-outline</v-icon>
				export ke pdf
			</v-btn>
			<v-btn
				depressed
				class="mr-3"
				color="orange"
				dark>
				<v-icon class="mr-2">mdi-file-excel-outline</v-icon>
				export ke exel
			</v-btn>
		</div>

		<v-divider></v-divider>
		
		<Data :hasilFilter="hasilFilter" />
	</div>
</template>

<script>
	import {  
		VBtn, VIcon,
		VRow, VSelect, VCol,
		VSpacer, VForm, VDivider
	} from 'vuetify/lib'
	import Data from './Data'
	import { mapState } from 'vuex'

	export default {
		components: {
			VBtn, VIcon,
			VRow, VSelect, VCol,
			VSpacer, VForm, VDivider,
			Data
		},

		data: () => ({
			jurusan: '',
			kelas: '',
			ruang: '',
			detailJurusan: [],
			detailRuang: [],
			hasilFilter: {
				group_id: '',
				major_id: '',
				room_id: '',
				subject_id: ''
			},
			valid: true,
			requiredRule: [v => !!v || 'Harus diisi']
		}),

		created() {
			this.$store.dispatch('dataMaster/getDataKelas')
			this.$store.dispatch('dataMaster/getDataJurusan')
			this.$store.dispatch('dataMaster/getDataMapel')
			this.$store.dispatch('dataMaster/getDataRuang')
		},

		watch: {
			kelas (val) {
				this.detailJurusan = this.dataJurusan.filter(jurusan => jurusan.group.id === val.id)
				this.hasilFilter.group_id = val.id
			},
			jurusan (val) {
				this.detailRuang = this.dataRuang.filter(ruang => ruang.group.id === val.group.id && ruang.major.id === val.major.id)
				this.hasilFilter.major_id = val.major.id
			}
		},

		computed: {
			...mapState('dataMaster', ['dataKelas', 'dataJurusan', 'dataRuang', 'dataMapel']),
			...mapState('dataResult', ['isLoading'])
		},

		methods: {
			validate () {
				if (this.$refs.form.validate()) {
					this.$store.dispatch('dataResult/getDataResultFilter', this.hasilFilter)
					this.$store.dispatch('dataResult/updateIsLoading', true)
				}
			}
		}
	}
</script>