<template>
	<v-app>
		<v-overlay class="bg-login" :style="`background-image: url(${require('@/assets/bg.jpeg')})`">
			<v-card light color="white" width="500px">
				<v-card-title>
					<div class="text-center" style="width: 100%;">
						<img src="@/assets/se.png" alt="logo" class="mx-auto" height="60px" />
					</div>
					<Header/>
				</v-card-title>
				<v-divider></v-divider>
				<LoginSekolah/>
			</v-card>
		</v-overlay>
	</v-app>
</template>

<style scoped>
	.bg-login{ background-size: cover; }
</style>

<script>
	import {
		VApp, VOverlay, VCard,
		VCardTitle, VCardText, VCardActions,
		VDivider,
	} from 'vuetify/lib'
	import Header from '@/components/Login/Header'
	import LoginSekolah from '@/components/Login/LoginSekolah'

	export default{
		props: ['user'],

		components: {
			VApp, VOverlay, VCard,
			VCardTitle, VCardText, VCardActions,
			VDivider,
			Header, LoginSekolah
		}
	}
</script>