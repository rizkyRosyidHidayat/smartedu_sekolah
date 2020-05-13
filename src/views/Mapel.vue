<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-face</v-icon>
			<span class="ml-3 text-icon">Master Data Mata Pelajaran</span>
		</div>
		<v-card-text>
			<v-form ref="form" v-model="valid">
				<v-row>
					<v-col cols="12" md="4" sm="12" class="py-0">
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
					<v-col cols="12" md="4" sm="12" class="py-0">
						<v-select
							:items="detailKelas"
							item-text="group.name"
							item-value="group.name"
							v-model="hasilFilter.group"
							label="Kelas"
							:disabled="jurusan === ''?true:false"
							outlined
							dense
						></v-select>
					</v-col>
					<v-col cols="12" md="4" sm="12" class="py-0">
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
								type="submit"
								@click.prevent="validate"
								color="primary"
								depressed>
								Filter		
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-form>

			<DataMapel :hasilFilter="hasilFilter" />
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
	import DataMapel from '@/components/Mapel/DataMapel'
	import { mapState } from 'vuex'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer,
			DataMapel
		},

		data: () => ({
			valid: true,
			requiredRule: [v=>!!v || 'Harus diisi'],
			jurusan: '',
			kelas: '',
			detailKelas: [],
			hasilFilter: {
				major: '',
				group: ''
			}
		}),

		created() {
			this.$store.dispatch('dataMaster/getDataJurusan')
		},

		watch: {
			jurusan (val) {
				this.detailKelas = this.dataJurusan.filter(kelas => kelas.major.name === val.major.name)
			}
		},

		computed: {
			...mapState('dataMaster', ['dataJurusan'])
		},

		methods: {
			validate () {
				if (this.$refs.form.validate()) {
					this.hasilFilter.major = this.jurusan.major.name				
				}
			},
			reset () {
				if (this.$refs.form.validate()) {
					this.jurusan = ''				        
					this.hasilFilter.group = ''				
					this.hasilFilter.major = ''				
				}							       
      },
		}
	}
</script>