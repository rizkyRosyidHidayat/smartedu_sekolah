<template>
	<div class="mt-3">
		<div class="title">Rekapitulasi Nilai berdasarkan</div>
		<v-form ref="form" v-model="valid" class="mb-3">
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
						v-model="hasilFilter.group_id"
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
						:disabled="hasilFilter.group_id===''?true:false"
						v-model="hasilFilter.major_id"
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
						:disabled="hasilFilter.major_id === ''?true:false"
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
							:loading="isLoading"
							@click="reset"
							color="error"
							class="mr-3"
							depressed>
							reset		
						</v-btn>
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

		<div class="my-3 d-flex">
			<v-btn
				depressed
				class="mr-3"
				color="orange"
				dark>
				<v-icon class="mr-2">mdi-file-export-outline</v-icon>
				export ke pdf
			</v-btn>
			<export-excel
				:data="dataExcel"
				:fields="fields"
				worksheet="Rekapitulasi nilai"
				name="Rekapitulasi_nilai.xls">
				<v-btn
					depressed
					class="mr-3"
					color="orange"
					dark>
					<v-icon class="mr-2">mdi-file-excel-outline</v-icon>
					export ke exel
				</v-btn>
			</export-excel>
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
			detailRuang: [],
			hasilFilter: {
				group_id: '',
				major_id: '',
				room_id: '',
				subject_id: ''
			},
			fields: {
				'Nomor': 'no',
				'NISN': 'user_nisn',
				'Nama': 'user_name',
				'Nilai': 'exam_score'
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
			'hasilFilter.major_id': function (val) {
				this.detailRuang = this.dataRuang.filter(ruang => ruang.group.id === this.hasilFilter.group_id && ruang.major.id === val)				
			}
		},

		computed: {
			...mapState('dataMaster', ['dataKelas', 'dataJurusan', 'dataRuang', 'dataMapel']),
			...mapState('dataResult', ['isLoading', 'dataResult']),
			dataExcel() {
				return this.dataResult.map((x, i) => {
					x.no = i+1
					return x
				})
			},
			detailJurusan: {
        set(val) {
          this.dataJurusan.filter(jurusan => jurusan.id === this.hasilFilter.major_id)
        },
        get() {
          return this.dataRuang.filter(ruang => ruang.group.id === this.hasilFilter.group_id)
        }
      }
		},

		methods: {
			validate () {
				if (this.$refs.form.validate()) {
					this.$store.dispatch('dataResult/getDataResultFilter', this.hasilFilter)
					this.$store.dispatch('dataResult/updateIsLoading', true)
				}
			},
			reset() {
				this.$store.dispatch('dataResult/getDataResult')
				this.$store.dispatch('dataResult/updateIsLoading', true)
				this.hasilFilter.group_id = ''
				this.hasilFilter.room_id = ''
				this.hasilFilter.major_id = ''
				this.hasilFilter.subject_id = ''
			}
		}
	}
</script>