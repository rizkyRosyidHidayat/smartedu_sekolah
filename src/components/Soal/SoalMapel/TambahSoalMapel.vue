<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-file</v-icon>
			<span class="ml-3 text-icon">Tambah Soal X_RPL_Bahasa Indonesia</span>
		</div>
		<v-card-text>
			<div class="title">Soal</div>
			<ckeditor v-model="dataSoal.soal"></ckeditor>
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
				<v-tab-item
	        v-for="(item, i) in tabs"
	        :key="i"
	        :value="'tab-' + i">
	        <br>
					<ckeditor v-model="tab"></ckeditor>
	      </v-tab-item>
			</v-tabs>
		</v-card-text>
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
		VTab, VTabItem
	} from 'vuetify/lib'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer, VTabs, VTabsSlider,
			VTab, VTabItem
		},

		data: () => ({
			dataSoal: {
				soal: '',
				kunci: '',
				a: '',
				b: '',
				c: '',
				d: '',
				e: ''
			},
			kunci: ['A', 'B', 'C', 'D', 'E'],
			tab: null,
			tabs: [{
				text: 'Jawaban A',
				value: 'dataSoal.a'
			}, 
			{
				text: 'Jawaban B',
				value: 'dataSoal.b'
			},
			{
				text: 'Jawaban C',
				value: 'dataSoal.c'
			},
			{
				text: 'Jawaban D',
				value: 'dataSoal.d'
			},
			{
				text: 'Jawaban E',
				value: 'dataSoal.e'
			}]
		})
	}
</script>