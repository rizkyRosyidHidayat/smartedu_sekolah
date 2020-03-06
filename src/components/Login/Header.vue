<template>	
	<v-row dense>
		<v-col cols="12" md="6" sm="12">
			<v-btn
				depressed block outlined
				color="primary">
				<v-icon class="mr-3">mdi-school</v-icon>
				Login sekolah
			</v-btn>
		</v-col>
		<v-col cols="12" md="6" sm="12">
			<v-btn
				depressed block
				color="primary">
				<v-icon class="mr-3">mdi-face</v-icon>
				Login siswa
			</v-btn>
		</v-col>
	</v-row>	
</template>

<script>
	import {
		VRow, VCol, VBtn,
		VIcon
	} from 'vuetify/lib'

	export default{
		components: {
			VRow, VCol, VBtn,
			VIcon
		}
	}
</script>
