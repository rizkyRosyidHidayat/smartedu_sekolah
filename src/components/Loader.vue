<template>
	<v-skeleton-loader
    class="mx-auto"
    style="width: 100%;"
    :type="type"
  ></v-skeleton-loader>
</template>

<script>
	import { VSkeletonLoader } from 'vuetify/lib'

	export default {
		props: {
			type: {
				type: String,
				default: 'card'
			}
		},

		components: { VSkeletonLoader }
	}
</script>