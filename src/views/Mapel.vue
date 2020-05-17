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
							item-text="name"
							item-value="name"
							v-model="hasilFilter.major"
							label="Jurusan"
							outlined
							dense
						></v-select>
					</v-col>
					<v-col cols="12" md="4" sm="12" class="py-0">
						<v-select
							:items="dataKelas"
							item-text="name"
							item-value="name"
							v-model="hasilFilter.group"
							label="Kelas"
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
							<!-- <v-btn
								:disabled="!valid"
								type="submit"
								@click.prevent="validate"
								color="primary"
								depressed>
								Filter		
							</v-btn> -->
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
			hasilFilter: {
				major: '',
				group: ''
			}
		}),

		created() {
			this.$store.dispatch('dataMaster/getDataJurusan')
			this.$store.dispatch('dataMaster/getDataKelas')
		},

		computed: {
			...mapState('dataMaster', ['dataJurusan', 'dataKelas'])
		},

		methods: {
			validate () {
				if (this.$refs.form.validate()) {
					this.hasilFilter				
				}
			},
			reset () {
				if (this.$refs.form.validate()) {		        
					this.hasilFilter.group = ''				
					this.hasilFilter.major = ''				
				}							       
      },
		}
	}
</script>