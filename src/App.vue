<template>
  <div>
  	<router-view></router-view>
  	<TokenExpired/>
  </div>
</template>

<style>
  .se-primary{ background-color: #00923F !important; }
  .text-icon{ position: relative;top: 2px; }
  .pointer{ cursor: pointer; }
  .border-card{ border: 1px solid #00923F !important; }
  .border-bottom{ border-bottom: 1px solid #00923F !important; }
  .border-bold{ border-width: 3px !important; }
  .border-top{ border-top: 1px solid #00923F !important; }
  .w-100{ width: 100%; }
  .radius{ border-radius: 3px !important; }
  .tile{ border-radius: 0px !important; }
  .decoration-none{ text-decoration: none !important; }
</style>

<script>
	import TokenExpired from '@/views/TokenExpired'
	export default {
		components: {
			TokenExpired
		}
	}
</script>