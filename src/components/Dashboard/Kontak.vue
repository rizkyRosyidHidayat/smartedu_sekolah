<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-contacts</v-icon>
			<span class="ml-3 text-icon">Kontak</span>
		</div>
		<v-card-text>
			<p class="text-uppercase title">
				selamat datang di sistem smartedu
			</p>
			<!-- <div class="subtitle-1">Kontak</div> -->
			<v-chip rounded color="primary">
				<v-icon small>mdi-phone</v-icon>
				<span class="ml-3">Fandu: 089778583384</span>
			</v-chip>
			<v-chip rounded color="success" class="ml-3">
				<v-icon small>mdi-phone</v-icon>
				<span class="ml-3">Fandu: 089778583384</span>
			</v-chip>
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon, VChip
	} from 'vuetify/lib'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VChip
		},

		data: () => ({
		})
	}
</script>