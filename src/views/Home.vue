<template>
  <div>
    <Dashboard />
    <v-row>
			<v-col cols="12" md="6" sm="12">
				<Kontak />
				<Tutorial class="mt-3" />
			</v-col>
			<v-col cols="12" md="6" sm="12">
				<Informasi />
			</v-col>
    </v-row>
  </div>
</template>

<script>
	import {
		VRow, VCol
	} from 'vuetify/lib'
	import Dashboard from '@/components/Dashboard/Dashboard.vue'
	import Kontak from '@/components/Dashboard/Kontak.vue'
	import Tutorial from '@/components/Dashboard/Tutorial.vue'
	import Informasi from '@/components/Dashboard/Informasi.vue'

	export default {
		components: {
			VRow, VCol,
			Informasi,
			Tutorial,
			Kontak,
			Dashboard
		}
	}
</script>
