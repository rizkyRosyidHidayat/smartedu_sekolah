<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-file</v-icon>
			<span class="ml-3 text-icon">Edit Soal</span>
		</div>
		<v-card-text>
			<Notif :msg="msg" :status="status" @visible="visible" />
			<div class="title">Soal</div>
			<VueCkeditor v-model="detailSoal.pertanyaan" />
			<br>
			<div class="title">Kunci Jawaban</div>
			<v-select
				:items="kunci"
				v-model="detailSoal.kunci"
				label="Jurusan"
				outlined
				dense
			></v-select>

			<div class="title">Pilihan</div>
			<v-tabs v-model="tab">
				<v-tabs-slider></v-tabs-slider>
				<v-tab
					v-for="(item, i) in tabs" :key="i"
					:href="`#tab-${i}`"
					active-class="outlined-tab">
					{{ item.text }}
				</v-tab>
				<v-tab-item value="tab-0">
					<br>
					<VueCkeditor id="jawabanA" v-model="detailSoal.jawabanA" />
	      </v-tab-item>
	      <v-tab-item value="tab-1">
					<br>
					<VueCkeditor id="jawabanB" v-model="detailSoal.jawabanB" />
	      </v-tab-item>
	      <v-tab-item value="tab-2">
					<br>
					<VueCkeditor id="jawabanC" v-model="detailSoal.jawabanC" />
	      </v-tab-item>
	      <v-tab-item value="tab-3">
					<br>
					<VueCkeditor id="jawabanD" v-model="detailSoal.jawabanD" />
	      </v-tab-item>
	      <v-tab-item value="tab-4">
					<br>
					<VueCkeditor id="jawabanE" v-model="detailSoal.jawabanE" />
	      </v-tab-item>
			</v-tabs>
			<br>		
			<div class="title">Pembahasan</div>
			<VueCkeditor v-model="detailSoal.pembahasan" />
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text color="primary" @click="$router.go(-1)">kembali</v-btn>
			<v-btn depressed :loading="isLoading" color="primary" @click="simpan">simpan</v-btn>
		</v-card-actions>
	</v-card>
</template>

<style>
	.outlined-tab{ border: 1px solid #48AEF0; }
	.v-tabs-slider{ width: 0;height: 0; }
</style>

<script>
	import { 
		VCard, VCardText,
		VIcon, VBtn,
		VRow, VSelect, VCol,
		VSpacer, VTabs, VTabsSlider,
		VTab, VTabItem, VCardActions
	} from 'vuetify/lib'

  import { getDataSoal } from '@/config/soal'
	import { postDataSoal } from '@/config/soal'

	import Loader from '@/components/Loader'
	import Notif from '@/components/Notif'

	import { mapState } from 'vuex'

	export default {
		props: ['idSoal', 'idMapel'],

		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer, VTabs, VTabsSlider,
			VTab, VTabItem, VCardActions,
			VueCkeditor: () => ({
	      component: import('./vueckeditor.vue'),
	      loading: Loader,
	      error: {
	        template: '<div>...error</div>'
	      },
	      delay: 200,
	      timeout: 3000
	    }),
	    Notif
		},

		data: () => ({
			// dataSoal: {
			// 	pertanyaan: '',
			// 	kunci: '',
			// 	jawabanA: '',
			// 	jawabanB: '',
			// 	jawabanC: '',
			// 	jawabanD: '',
			// 	jawabanE: '',
			// 	pembahasan: ''
			// },
			kunci: ['A', 'B', 'C', 'D', 'E'],
			tab: null,
			indexTab: 0,
			tabs: [{
				text: 'Jawaban A'				
			}, 
			{
				text: 'Jawaban B'				
			},
			{
				text: 'Jawaban C'				
			},
			{
				text: 'Jawaban D'				
			},
			{
				text: 'Jawaban E'				
			}],
			msg: {
				success: 'Soal berhasil ditambahkan',
				error: 'Soal gagal ditambahkan',
				visible: false
			}
		}),

		created () {			
      this.$store.dispatch('dataSoal/getDetailSoal', {
      	id_mapel: parseInt(this.idMapel),
      	id_soal: parseInt(this.idSoal)
      })
      this.$store.dispatch('dataSoal/updateIsLoading', true)
			// getDataSoal()
   //      .then(res => {
   //        if (res.status === 200) {
   //          var soal = res.data.filter(soal => soal.id === parseInt(this.idSoal))
   //          var detailSoal = {...soal[0]}
   //          this.dataSoal.id = detailSoal.id
   //          this.dataSoal.id_subject = this.idMapel
   //          this.dataSoal.pertanyaan = detailSoal.pertanyaan
   //          this.dataSoal.kunci = detailSoal.jawaban[0].kunci
   //          this.dataSoal.jawabanA = detailSoal.pilihanjawaban[0].teks
   //          this.dataSoal.jawabanB = detailSoal.pilihanjawaban[1].teks
   //          this.dataSoal.jawabanC = detailSoal.pilihanjawaban[2].teks
   //          this.dataSoal.jawabanD = detailSoal.pilihanjawaban[3].teks
   //          this.dataSoal.jawabanE = detailSoal.pilihanjawaban[4].teks
   //          this.dataSoal.pembahasan = detailSoal.pembahasan
   //        }
   //      })
    },

    computed: {
    	...mapState('dataSoal', ['status', 'isLoading', 'detailSoal'])    	
    },

		methods: {
			simpan () {
				this.$store.dispatch('dataSoal/putDataSoal', this.detailSoal)
				this.$store.dispatch('dataSoal/updateIsLoading', true)
				this.msg.visible = true
				window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.$router.go(-1)
			},
			visible(val) {
				this.msg.visible = val
			}
		}
	}
</script>