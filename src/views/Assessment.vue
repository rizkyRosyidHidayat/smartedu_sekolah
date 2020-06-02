<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-file-document</v-icon>
			<span class="ml-3 text-icon">Daftar Assessment</span>
		</div>
		<v-card-text>
			<div class="mb-3">
				<v-btn
					depressed
					class="mr-3"
					color="orange"
					@click="$router.push({ name: 'nilai' })"
					:outlined="$route.name === 'nilai'?false:true"
					dark>
					rekapitulasi nilai
				</v-btn>
				<!-- <v-btn
					depressed
					class="mr-3"
					color="orange"
					@click="$router.push({ name: 'statistik' })"
					:outlined="$route.name === 'statistik'?false:true"
					dark>
					statistik hasil nilai
				</v-btn>
				<v-btn
					depressed
					class="mr-3"
					color="orange"
					@click="$router.push({ name: 'raport' })"
					:outlined="$route.name === 'raport'?false:true"
					dark>
					raport digital
				</v-btn>
				<v-btn
					depressed
					class="mr-3"
					color="orange"
					@click="$router.push({ name: 'peringkat' })"
					:outlined="$route.name === 'peringkat'?false:true"
					dark>
					peringkat
				</v-btn> -->
			</div>
			<v-divider></v-divider>
			<router-view></router-view>
		</v-card-text>
	</v-card>
</template>

<script>	
	import { 
		VCard, VCardText,
		VIcon, VBtn, VDivider
	} from 'vuetify/lib'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn, VDivider
		},
		created() {
			this.$store.dispatch('dataResult/getDataResult')
			this.$store.dispatch('dataResult/updateIsLoading', true)
		}
	}
</script>