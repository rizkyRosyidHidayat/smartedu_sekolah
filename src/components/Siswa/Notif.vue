<template>
	<div 
		v-if="status === true" 
		v-show="visible" 
		class="pa-4 radius green white--text mb-0 mt-4"
	>
		<div class="d-flex">
			<v-btn icon small class="white green--text mr-3">
				<v-icon small>mdi-check</v-icon>
			</v-btn>
			<div>
				Proses upload berhasil. <br>
				Status: <br>
				<span>					
					{{upload.group}} kelas, 
				</span>
				<span>					
					{{upload.major}} jurusan, 
				</span>
				<span>					
					{{upload.room}} ruang kelas, 
				</span>
				<span>					
					{{upload.participant}} siswa
				</span>
			</div>
			<v-spacer></v-spacer>
			<v-btn @click="close" icon small dark>
				<v-icon small>mdi-close</v-icon>
			</v-btn>
		</div>
	</div>
	<div 
		v-else-if="status === false" 
		v-show="visible" 
		class="pa-4 radius red white--text mb-0 mt-4"
	>
		<div class="d-flex">
			<div>
				<v-btn icon small class="white red--text mr-3">
					<v-icon small>mdi-close</v-icon>
				</v-btn>
				Data gagal diupload
			</div>
			<v-spacer></v-spacer>
			<v-btn @click="close" icon small dark>
				<v-icon small>mdi-close</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
	import {
		VBtn, VIcon, VSpacer
	} from 'vuetify/lib'

	export default {
		props: ['status', 'visible', 'upload'],

		components: {
			VBtn, VIcon, VSpacer			
		},

		methods: {
			close () {
				this.$emit('visible', false)
			}
		}
	}
</script>