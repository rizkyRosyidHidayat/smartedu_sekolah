<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-file</v-icon>
			<span class="ml-3 text-icon">Edit Soal</span>
		</div>
		<FormEditSoalMapel/>
	</v-card>
</template>

<script>
	import { 
		VCard, VIcon
	} from 'vuetify/lib'
	import LoadingFormTambah from './LoadingFormTambah'
	export default{
		props: ['idSoal', 'idMapel'],

		components: { 
			VCard, VIcon,
			FormEditSoalMapel: () => ({
        component: import('./FormEditSoalMapel'),
        loading: LoadingFormTambah,
        // error: {
        //   template: `<div>error</div>`
        // },
        delay: 200,
        timeout: 3000
      }),
		},

		created () {			
      this.$store.dispatch('dataSoal/getDetailSoal', {
				id_mapel: parseInt(this.idMapel),
				id_soal: parseInt(this.idSoal)
      })
      this.$store.dispatch('dataSoal/updateIsLoading', true)
    },
	}
</script>