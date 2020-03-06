<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-file</v-icon>
			<span class="ml-3 text-icon">Tambah Soal X_RPL_Bahasa Indonesia</span>
		</div>
		<v-card-text>
			<ckeditor v-model="editorData"></ckeditor>

			<!-- <div id="editor">
				<h1>ss</h1>
			</div> -->
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon, VBtn,
		VRow, VSelect, VCol,
		VSpacer
	} from 'vuetify/lib'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer
		},

		data: () => ({
			editorData: '<p>Content of the editor.</p>',
      // editorConfig: {
      //     // The configuration of the editor.
      // }
		})
	}
</script>