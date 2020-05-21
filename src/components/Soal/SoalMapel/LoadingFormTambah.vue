<template>
	<div class="ma-6">		
		<v-skeleton-loader
      type="sentences"
    ></v-skeleton-loader>		
	</div>
</template>

<script>
	import { 
		VSkeletonLoader
	} from 'vuetify/lib'

	export default{
		components: {VSkeletonLoader}
	}
</script>