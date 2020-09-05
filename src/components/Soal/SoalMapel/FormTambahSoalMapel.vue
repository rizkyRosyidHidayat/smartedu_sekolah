<template>
	<div>
		<v-card-text>
			<Notif :msg="msg" :status="status" @visible="visible" />
			<div class="title">Soal</div>
      <ckeditor :editor="editor" v-model="dataSoal.pertanyaan" :config="editorConfig"></ckeditor>
			<!-- <VueCkeditor v-model="dataSoal.pertanyaan" /> -->
			<br>
			<div class="title">Kunci Jawaban</div>
			<v-select
				:items="kunci"
				v-model="dataSoal.kunci"
				placeholder="Kunci"
				outlined
				dense
			></v-select>

			<div class="title">Pilihan</div>
			<v-tabs v-model="tab">
				<v-tabs-slider></v-tabs-slider>
				<v-tab
					v-for="(item, i) in tabs" :key="i"
					@click="changeTab({
						index: i,
						value: item.value
					})"
					:href="`#tab-${i}`"
					active-class="outlined-tab">
					{{ item.text }}
				</v-tab>
			</v-tabs>

			<br>
			<ckeditor :editor="editor" v-model="dataJawaban" :config="editorConfig"></ckeditor>
			<br>		
			<div class="title">Pembahasan</div>
      <ckeditor :editor="editor" v-model="dataSoal.pembahasan" :config="editorConfig"></ckeditor>
			<!-- <VueCkeditor v-model="dataSoal.pembahasan" /> -->
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
	</div>
</template>

<style>
	.outlined-tab{ border: 1px solid #48AEF0; }
	.v-tabs-slider{ width: 0;height: 0; }
</style>

<script>
	import { 
		VCardText,
		VIcon, VBtn, VSelect,
		VSpacer, VTabs, VTabsSlider,
		VTab, VCardActions, VSnackbar
	} from 'vuetify/lib'

	import { postDataSoal } from '@/config/soal'

	// import VueCkeditor from './vueckeditor'
	import Notif from '@/components/Notif'
	import CKEditor from '@ckeditor/ckeditor5-vue';
	import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

	// initSample()

	export default {
		components: {
			VCardText,
			VIcon, VBtn, VSelect,
			VSpacer, VTabs, VTabsSlider,
			VTab, VCardActions, VSnackbar,
			ckeditor: CKEditor.component,
			Notif
		},

		data: () => ({
			editor: ClassicEditor,
      editorConfig: {},
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
				text: 'Jawaban A',
				value: 'jawabanA',
				index: 0
			}, 
			{
				text: 'Jawaban B',				
				value: 'jawabanB',
				index: 1
			},
			{
				text: 'Jawaban C',				
				value: 'jawabanC',
				index: 2
			},
			{
				text: 'Jawaban D',				
				value: 'jawabanD',
				index: 3
			},
			{
				text: 'Jawaban E',				
				value: 'jawabanE',
				index: 4
			}],
			tabItem: 'jawabanA',
			isLoading: false,
			status: null,
			msg: {
				success: 'Soal berhasil ditambahkan',
				error: 'Soal gagal ditambahkan',
				visible: false
			}
		}),

		computed: {
			dataJawaban: {
				get() {
					return this.dataSoal[this.tabItem]
				},
				set(val) {
					this.dataSoal[this.tabItem] = val 
				}
			}
		},

		methods: {
			changeTab(val) {
				this.tabItem = val.value
				// this.dataSoal[this.tabItem] = val
			},
			simpan () {
				this.dataSoal.id_subject = parseInt(this.$route.params.id)

				var hasil = []

				for (let [key, value] of Object.entries(this.dataSoal)) {
					hasil.push(value)
					console.log(key)
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
								this.$router
								.push({name: 'soal-mapel', 
									params: { 
										id: parseInt(this.$route.params.id), 
										name: this.$route.params.name
									}
								})							
							}
						})
						.catch(() => {
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