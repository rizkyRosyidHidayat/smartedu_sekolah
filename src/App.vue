<template>
  <div>
		<router-view/>
		<TokenExpired/>
	</div>
</template>

<style src="./assets/style.css"></style>
<script>
	import TokenExpired from '@/views/TokenExpired'
	export default {
		components: {
			TokenExpired
		}
	}
</script>