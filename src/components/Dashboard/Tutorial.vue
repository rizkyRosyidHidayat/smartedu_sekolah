<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-book-open-variant</v-icon>
			<span class="ml-3 text-icon">Cara Penggunaan</span>
		</div>
		<v-card-text>
			<div v-for="(item, i) in 4" :key="i">				
				<div class="subtitle-1 font-weight-bold">Cara Penggunaan</div>	
				<v-row>
					<v-col 
						cols="12" 
						md="4">
						<img 
							width="100%" 
							:src="require('@/assets/pembahasan.jpeg')" 
							alt="img-tutorial" />
					</v-col>
					<v-col 
						cols="12" 
						md="8">
						<div>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
						</div>
					</v-col>
				</v-row>
				<div class="d-flex justify-space-between">
					<v-spacer></v-spacer>
					<v-btn small dark class="primary" depressed>Baca</v-btn>					
				</div>
				<v-divider class="my-3" v-show="i !== 3"></v-divider>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon, VBtn,
		VRow, VCol,
		VDivider, VSpacer
	} from 'vuetify/lib'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VCol,
			VDivider, VSpacer
		},

		data: () => ({
		})
	}
</script>