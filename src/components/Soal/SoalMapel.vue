<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-file</v-icon>
			<span class="ml-3 text-icon">{{name}}</span>
		</div>
		<v-card-text>
			<DataSoalMapel/>
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
	import DataSoalMapel from '@/components/Soal/SoalMapel/DataSoalMapel'

	export default {
		props: ['name'],
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer,
			DataSoalMapel
		}
	}
</script>