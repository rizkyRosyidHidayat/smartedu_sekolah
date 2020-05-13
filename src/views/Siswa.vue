<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-face</v-icon>
			<span class="ml-3 text-icon">Daftar Siswa</span>
		</div>
		<v-card-text>
			<v-form ref="form" v-model="valid">
				<v-row>
					<v-col cols="12" md="3" sm="3" class="py-0">
						<v-select
							:items="dataJurusan"
							item-text="major.name"
							return-object
							v-model="jurusan"
							label="Jurusan"
							outlined
							dense
						></v-select>
					</v-col>
					<v-col cols="12" md="3" sm="3" class="py-0">
						<v-select
							:items="detailKelas"
							item-text="group.name"
							return-object
							v-model="kelas"
							:disabled="jurusan === ''?true:false"
							label="Kelas"
							outlined
							dense
						></v-select>
					</v-col>
					<v-col cols="12" md="3" sm="3" class="py-0">
						<v-select
							:items="detailRuang"
							item-text="name"
							item-value="name"
							v-model="ruang"
							label="Ruang kelas"
							:disabled="kelas === ''?true:false"
							outlined
							dense
						></v-select>
					</v-col>
					<v-col cols="12" md="3" sm="3" class="py-0">
						<div class="d-flex">
							<v-spacer></v-spacer>
							<v-btn
								@click="reset"
								color="red"
								class="mr-3"
								dark
								depressed>
								reset		
							</v-btn>
							<v-btn
								:disabled="!valid"
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
			
			<DataSiswa :hasilFilter="hasilFilter" />
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon, VBtn,
		VRow, VSelect, VCol,
		VSpacer, VForm
	} from 'vuetify/lib'
	import DataSiswa from '@/components/Siswa/DataSiswa.vue'
	import { mapState } from 'vuex'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer, VForm,
			DataSiswa
		},

		data: () => ({
			jurusan: '',
			kelas: '',
			ruang: '',
			detailKelas: [],
			detailRuang: [],
			hasilFilter: {
				group: '',
				major: '',
				room: ''
			},
			valid: true,
			requiredRule: [v => !!v || 'Harus diisi']
		}),

		created() {
			this.$store.dispatch('dataMaster/getDataJurusan')
			this.$store.dispatch('dataMaster/getDataRuang')
			this.$store.dispatch('dataSiswa/updateIsLoading', true)
		},

		watch: {
			jurusan (val) {
				this.detailKelas = this.dataJurusan.filter(jurusan => jurusan.major.name === val.major.name)				
			},
			kelas (val) {
				this.detailRuang = this.dataRuang.filter(ruang => ruang.master_id === val.id)
			}
		},

		computed: {
			...mapState('dataMaster', ['dataJurusan', 'dataRuang']),
			...mapState('dataSiswa', ['isLoading']),
		},

		methods: {
			validate () {
				if (this.$refs.form.validate()) {
					this.hasilFilter = {
						group: this.kelas.group.name,
						major: this.jurusan.major.name,
						room: this.ruang
					}
				}
			},
			reset () {
				if (this.$refs.form.validate()) {
					this.jurusan = ''				        
					this.kelas = ''				        
					this.ruang = ''				        
					this.hasilFilter.group = ''				
					this.hasilFilter.major = ''				
					this.hasilFilter.room = ''				
				}							       
      },
		}
	}
</script>