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
      <v-btn icon color="primary" @click="$router.push({ name: 'edit-soal', params: { idSoal: dataSoal[page].id, idMapel: $route.params.id } })">
				<v-icon small>mdi-pencil</v-icon>		
  		</v-btn>
  		<!-- <v-btn text color="error">
				<v-icon class="mr-3">mdi-trash-can</v-icon>   
				hapus 			
  		</v-btn> -->
  		<HapusSoalMapel :id="dataSoal[page].id" :idMapel="$route.params.id" />
    </v-app-bar>

    <v-content>
    	<v-container class="review-soal">
    		<div class="my-6">
	    		Soal {{ page+1 }}
	    		<span class="ml-3 font-weight-bold">{{ name }}</span>
	    	</div>
	      <v-card class="scroll pa-4" max-height="63vh" height="63vh">
	      	<Loader type="paragraph" v-if="isLoading" />
	      	<template v-else-if="dataSoal.length === 0">
	      		<v-alert type="info">
	      			Soal pada mata pelajaran ini masih kosong, silahkan tambahkan soalnya terlebih dahulu.
	      		</v-alert>
	      	</template>
	      	<template v-else v-for="(item, index) in dataSoal">
		      	<v-card-text v-if="index === page" :key="index" class="black--text">		      		
		      		<div v-html="item.pertanyaan"></div>

		      		<div class="mt-6 ml-3">
		      			<div 
									class="custom-control custom-radio my-2" 
									v-for="(jawaban, index) in item.pilihanjawaban" 
									:key="index">
								  <input 
								  	type="radio" 
								  	name="jawaban" 
								  	:id="`jawaban${index}`"
								  	v-model="selected" 
								  	readonly 
								  	:value="jawaban.key" 
								  	class="custom-control-input"
								  	:class="`radio${index}`" />
								  <label 
								  	:class="`custom-control-label huruf${index}`"
								  	:for="`jawaban${index}`" 
								  	v-html="jawaban.teks"
								  ></label>
								</div>
		      		</div>
		      	</v-card-text>	      		
	      	</template>
	      </v-card>
    	</v-container>
    </v-content>    

    <v-footer app absolute bottom inset class="py-0 white">      
    	<div class="content-footer">
				<div class="pagination">
					<v-btn 
						depressed
						:style="{'display': page === 0?'none':'inline-block'}"
						dark
						@click="page = page-1"
						color="orange"
						class="pa-0 mr-2">					
						<v-icon>mdi-chevron-left</v-icon>					
					</v-btn>
					<template v-for="(item, index) in dataSoal.length">
						<!-- <span v-for="(val, i) in local" :key="i+100"> -->
							<v-btn
								depressed 
								color="primary" 
								:outlined="index === page?false:true"
								class="pa-0 mx-1"
								@click="page = index"
								:key="index">
								{{ index+1 }}
							</v-btn>
						<!-- </span>					 -->
					</template>
					<v-btn 
						depressed
						:style="{'display': page === dataSoal.length-1?'none':'inline-block'}"
						@click="page = page+1"
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
	/*.custom-control:hover .custom-control-label::before{
    background-color: #dee2e6;    		
	}*/
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
    VContainer
  } from 'vuetify/lib'
  import HapusSoalMapel from '@/components/Soal/SoalMapel/HapusSoalMapel'  
  import Loader from '@/components/Loader'
  import {getDataSoal} from '@/config/soal'

  export default {
  	props: ['id', 'name'],

    components: {
      VApp,
      VContent,
      VFooter,
      VAppBar, VSpacer,
      VAppBarNavIcon,
      VToolbarTitle,
      VCard, VCardText, 
      VContainer,
      HapusSoalMapel,
      Loader
    },

    data: () => ({
    	page: 0,
    	dataSoal: [{ id: 0 }],
    	jawaban: [
    		{ teks: 'lorem ipsum dolor', huruf: 'A' },
    		{ teks: 'lorem ipsum dolor', huruf: 'B' },
    		{ teks: 'lorem ipsum dolor', huruf: 'C' },
    		{ teks: 'lorem ipsum dolor', huruf: 'D' },
    		{ teks: 'lorem ipsum dolor', huruf: 'E' }
    	],
    	selected: '',
			option: ['a', 'b', 'c', 'd', 'e'],
			isLoading: false
    }),

    created () {
      this.isLoading = true
      getDataSoal(parseInt(this.id))
        .then(res => {
          if (res.status === 200) {
            this.dataSoal = res.data
            this.selected = res.data[this.page].jawaban[0].kunci
            this.isLoading = false
          }
        })
        .catch(err => {
          this.isLoading = false
        })
    },

    watch: {
    	page (val) {
    		this.dataSoal.filter((soal, index) => {
    			if (index === val) {
    				soal.pilihanjawaban.filter(jawaban => {
    					if (jawaban.key === soal.jawaban[0].kunci) {
    						this.selected = jawaban.key
    					}
    				})
    			}
    		})
    	}
    }
  }
</script>
