<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-information</v-icon>
			<span class="ml-3 text-icon">Informasi</span>
		</div>
		<v-card-text>
			<v-card 
				v-for="(item, i) in 4" :key="i"
				outlined 
				class="border-card"
				:class="i !== 3 ? 'mb-4':''">
				<div class="pa-3 border-bottom">
					<v-icon color="primary">mdi-email</v-icon>
					<span class="ml-3 text-icon">Informasi</span>
				</div>
				<v-card-text>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.
				</v-card-text>
			</v-card>
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon
	} from 'vuetify/lib'

	export default {
		components: {
			VCard, VCardText,
			VIcon
		},

		data: () => ({
		})
	}
</script>