<template>
	<v-app v-if="modalToken">
		<v-overlay :value="modalToken">
			<v-card max-width="400px" color="white" light>
	  		<v-card-text class="title">
	  			Sesi telah berakhir, silahkan login kembali
	  		</v-card-text>
	  		<v-card-actions>
	  			<v-spacer></v-spacer>
	  			<v-btn color="primary" text depressed dark @click="login">Login</v-btn>
	  		</v-card-actions>
	  	</v-card>
		</v-overlay>
	</v-app>
</template>

<script>
	import { mapState } from 'vuex'
	import {
		VApp, VOverlay, VCard, VCardActions,
		VCardText, VBtn, VSpacer
	} from 'vuetify/lib'

	export default {
		components: {
			VApp, VOverlay, VCard, VCardActions,
			VCardText, VBtn, VSpacer
		},

		methods: {
			login () {
				this.$store.dispatch('updateModalToken', false)
				window.localStorage.removeItem('token_sekolah')
				this.$router.replace({name: 'login'})
			}
		},	

		computed: {
			...mapState(['modalToken'])
		}	
	}
</script>