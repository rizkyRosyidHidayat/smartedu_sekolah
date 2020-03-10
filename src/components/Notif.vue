<template>
	<div 
		v-if="status === true" 
		v-show="msg.visible" 
		class="pa-4 radius green white--text mb-5"
	>
		<div class="d-flex">
			<div>
				<v-btn icon small class="white green--text mr-3">
					<v-icon small>mdi-check</v-icon>
				</v-btn>
				{{ msg.success }}
			</div>
			<v-spacer></v-spacer>
			<v-btn @click="close" icon small dark>
				<v-icon small>mdi-close</v-icon>
			</v-btn>
		</div>
	</div>
	<div 
		v-else-if="status === false" 
		v-show="msg.visible" 
		class="pa-4 radius red white--text mb-5"
	>
		<div class="d-flex">
			<div>
				<v-btn icon small class="white red--text mr-3">
					<v-icon small>mdi-close</v-icon>
				</v-btn>
				{{ msg.error }}
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
		props: ['status', 'msg'],

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