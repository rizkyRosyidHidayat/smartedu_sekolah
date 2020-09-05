<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-file</v-icon>
			<span class="ml-3 text-icon">Tambah Soal {{ name }}</span>
		</div>
		<FormTambahSoalMapel/>
	</v-card>
</template>

<script>
	import { 
		VCard, VIcon
	} from 'vuetify/lib'
	import LoadingFormTambah from './LoadingFormTambah'
	export default{
		components: { 
			VCard, VIcon,
			FormTambahSoalMapel: () => ({
        component: import('./FormTambahSoalMapel'),
        loading: LoadingFormTambah,
        // error: {
        //   template: `<div>error</div>`
        // },
        delay: 200,
        timeout: 3000
      }),
		},

		props: ['name']
	}
</script>