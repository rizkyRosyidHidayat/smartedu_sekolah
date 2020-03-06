<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-face</v-icon>
			<span class="ml-3 text-icon">Master Data Kelas</span>
		</div>
		<v-card-text>
			<DataKelas/>
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
	import DataKelas from '@/components/Kelas/DataKelas'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer,
			DataKelas
		},

		data: () => ({
			kelas: '',
			ruang: '',
			data: ['foo', 'bar', 'zee']
		})
	}
</script>