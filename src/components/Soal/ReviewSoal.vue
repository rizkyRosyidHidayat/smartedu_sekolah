<template>
  <v-app>
    <v-app-bar app elevation="2" class="white px-md-12">
  		<v-btn icon @click="$router.go(-1)">
				<v-icon>mdi-chevron-left</v-icon>    			
  		</v-btn>
      <v-toolbar-title>
        SmartEdu
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="primary">
				<v-icon class="mr-3">mdi-pencil</v-icon>
				Edit    			
  		</v-btn>
  		<v-btn text color="error">
				<v-icon class="mr-3">mdi-trash-can</v-icon>   
				hapus 			
  		</v-btn>
    </v-app-bar>

    <v-content>
    	<v-container>
    		<div class="my-6">
	    		Soal 1
	    		<span class="ml-3 font-weight-bold">Bahasa Indonesia</span>
	    	</div>
	      <v-card class="scroll pa-4" max-height="63vh" height="63vh">
	      	<v-card-text>
	      		<p>
	      			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	      			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	      			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
	      		</p>

	      		<div class="mt-6 ml-3">
	      			<div 
								class="custom-control custom-radio my-2" 
								v-for="(item, index) in jawaban" 
								:key="index">
							  <input 
							  	type="radio" 
							  	name="jawaban" 
							  	:id="`jawaban${index}`"
							  	v-model="selected" 
							  	:value="item.huruf" 
							  	class="custom-control-input"
							  	:class="`radio${index}`" />
							  <label 
							  	:class="`custom-control-label huruf${index}`"
							  	:for="`jawaban${index}`" 
							  	v-html="item.teks"
							  ></label>
							</div>
	      		</div>
	      	</v-card-text>
	      </v-card>
    	</v-container>
    </v-content>    

    <v-footer app absolute bottom inset class="py-0 white">      
    	<div class="content-footer">
				<div class="pagination">
					<v-btn 
						depressed
						dark
						color="orange"
						class="pa-0 mr-2">					
						<v-icon>mdi-chevron-left</v-icon>					
					</v-btn>
					<template v-for="(item, index) in 50">
						<!-- <span v-for="(val, i) in local" :key="i+100"> -->
							<v-btn
								depressed 
								color="primary" 
								outlined
								class="pa-0 mx-1"
								:key="index">
								{{ index+1 }}
							</v-btn>
						<!-- </span>					 -->
					</template>
					<v-btn 
						depressed
						dark
						color="orange"
						class="pa-0 ml-2">					
						<v-icon>mdi-chevron-right</v-icon>					
					</v-btn>
				</div>
			</div>      
    </v-footer>
  </v-app>
</template>

<style scoped>
	.scroll{ overflow: auto; }
	/*style jawaban*/
	.custom-control p{ margin-bottom: 0px; }
	.custom-control{
		position: relative;
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5rem;
	}
	input[type=radio] {
    box-sizing: border-box;
    padding: 0;
	}
	.custom-control-input {
    position: absolute;
    z-index: -1;
    opacity: 0;
	}
	.custom-control-label {
    margin-bottom: 0;
	}
	label {
    display: inline-block;
	}
	.custom-control-label::before {
    border-radius: 50%;
	}
	.custom-control-label::before {
    position: absolute;
    top: 0rem;
    left: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    content: "";
    font-size: 14px;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #fff;    
    border: 1px solid silver;
	}
	.custom-control:hover .custom-control-label::before{
    background-color: #dee2e6;    		
	}
	.huruf0::before{
    content: "A";		
	}
	.huruf1::before{
    content: "B";		
	}
	.huruf2::before{
    content: "C";		
	}
	.huruf3::before{
    content: "D";		
	}
	.huruf4::before{
    content: "E";		
	}
	input[type=radio]:checked + .custom-control-label::before {
	  background-color: #599CDE;
	  color: #fff;
	}
	/*style pagination*/
	.v-btn:not(.v-btn--round).v-size--default{
		min-width: 36px !important;
	}
	.bt{ box-shadow: 0 0 0 1px #cfcfcf; }
	.content-footer{
		margin: 0 auto;
		max-width: 100%;
		overflow: auto;
		display: flex;
	}
	.pagination{
		display: flex;
		list-style: none;
		padding: 8px 0px !important;
	}
</style>

<script>
  import { 
    VApp, 
    VContent, 
    VFooter,
    VAppBar, VSpacer,
    VAppBarNavIcon,
    VToolbarTitle,
    VCard, VCardText, 
    VContainer, VPagination
  } from 'vuetify/lib'

  export default {
    components: {
      VApp,
      VContent,
      VFooter,
      VAppBar, VSpacer,
      VAppBarNavIcon,
      VToolbarTitle,
      VCard, VCardText, 
      VContainer, VPagination
    },

    data: () => ({
    	page: 1,
    	jawaban: [
    		{ teks: 'lorem ipsum dolor', huruf: 'A' },
    		{ teks: 'lorem ipsum dolor', huruf: 'B' },
    		{ teks: 'lorem ipsum dolor', huruf: 'C' },
    		{ teks: 'lorem ipsum dolor', huruf: 'D' },
    		{ teks: 'lorem ipsum dolor', huruf: 'E' }
    	],
    	selected: '',
			option: ['a', 'b', 'c', 'd', 'e']
    })
  }
</script>
