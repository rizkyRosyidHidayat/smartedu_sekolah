<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-face</v-icon>
			<span class="ml-3 text-icon">Master Data Ruang</span>
		</div>
		<v-card-text>
			<DataRuang/>
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon
	} from 'vuetify/lib'
	import DataRuang from '@/components/Ruang/DataRuang'

	export default {
		components: {
			VCard, VCardText,
			VIcon,
			DataRuang
		},

		data: () => ({
			ruang: '',
			data: ['foo', 'bar', 'zee']
		})
	}
</script>