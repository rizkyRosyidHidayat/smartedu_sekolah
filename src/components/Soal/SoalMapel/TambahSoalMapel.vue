<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-file</v-icon>
			<span class="ml-3 text-icon">Tambah Soal {{ name }}</span>
		</div>
		<v-card-text>
			<Notif :msg="msg" :status="status" @visible="visible" />
			<div class="title">Soal</div>
			<VueCkeditor v-model="dataSoal.pertanyaan" />
			<br>
			<div class="title">Kunci Jawaban</div>
			<v-select
				:items="kunci"
				v-model="dataSoal.kunci"
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
					<VueCkeditor v-model="dataSoal.jawabanA" />
	      </v-tab-item>
	      <v-tab-item value="tab-1">
					<br>
					<VueCkeditor v-model="dataSoal.jawabanB" />
	      </v-tab-item>
	      <v-tab-item value="tab-2">
					<br>
					<VueCkeditor v-model="dataSoal.jawabanC" />
	      </v-tab-item>
	      <v-tab-item value="tab-3">
					<br>
					<VueCkeditor v-model="dataSoal.jawabanD" />
	      </v-tab-item>
	      <v-tab-item value="tab-4">
					<br>
					<VueCkeditor v-model="dataSoal.jawabanE" />
	      </v-tab-item>
			</v-tabs>
			<br>		
			<div class="title">Pembahasan</div>
			<VueCkeditor v-model="dataSoal.pembahasan" />
		</v-card-text>
		<v-card-actions>
			<v-snackbar
				v-model="valid"
				color="warning"
				dark
				timeleft="2000">
				Data yang dimasukan belum lengkap, silahkan lengkapi
				terlebih dahulu.
				<v-btn
	        icon
	        dark
	        @click="valid = false">
	        <v-icon>mdi-close-circle</v-icon>
	      </v-btn>
			</v-snackbar>
			<v-spacer></v-spacer>
			<v-btn text color="primary" @click="$router.go(-1)">kembali</v-btn>
			<v-btn 
				depressed
				:loading="isLoading" 
				color="primary" 
				@click="simpan">
				simpan
			</v-btn>
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
		VTab, VTabItem, VCardActions, VSnackbar
	} from 'vuetify/lib'

	import { postDataSoal } from '@/config/soal'

	import Loader from '@/components/Loader'
	// import VueCkeditor from './vueckeditor'
	import Notif from '@/components/Notif'

	// initSample()

	export default {
		props: ['id', 'name'],

		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer, VTabs, VTabsSlider,
			VTab, VTabItem, VCardActions, VSnackbar,
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
			valid: false,
			dataSoal: {
				pertanyaan: '',
				kunci: '',
				jawabanA: '',
				jawabanB: '',
				jawabanC: '',
				jawabanD: '',
				jawabanE: '',
				pembahasan: '',
				id_subject: 0
			},
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
			isLoading: false,
			status: null,
			msg: {
				success: 'Soal berhasil ditambahkan',
				error: 'Soal gagal ditambahkan',
				visible: false
			}
		}),

		methods: {
			simpan () {
				// this.dataSoal.jawabanA = this.option[0]
				// this.dataSoal.jawabanB = this.option[1]
				// this.dataSoal.jawabanC = this.option[2]
				// this.dataSoal.jawabanD = this.option[3]
				// this.dataSoal.jawabanE = this.option[4]
				this.dataSoal.id_subject = parseInt(this.id)

				var hasil = []

				for (let [key, value] of Object.entries(this.dataSoal)) {
				  hasil.push(value)
				}
				var kosong = hasil.includes('')
				
				if (!kosong) {
					this.isLoading = true
					postDataSoal (this.dataSoal)
						.then(res => {
							// console.log(res)
							if (res.status === 201) {
								this.isLoading = false
								this.status = true
								this.$router.go(-1)							
							}
						})
						.catch(err => {
							this.isLoading = false
							this.status = false
						})
					this.msg.visible = true
					window.scrollTo({
	          top: 0,
	          left: 0,
	          behavior: 'smooth'
	        });					
				} else {
					this.valid = true
				}
			},
			visible(val) {
				this.msg.visible = val
			}
		}
	}
</script>