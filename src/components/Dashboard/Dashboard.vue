<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-view-dashboard</v-icon>
			<span class="ml-3 text-icon">Dashboard</span>
		</div>
		<v-card-text>
			<v-row>
				<v-col 
					cols="12" 
					md="3" sm="6"
					v-for="(item, i) in informasi" :key="i">
					<v-sheet :class="item.color[0]" dark>
						<div class="pa-3">
							<div class="display-1 font-weight-bold">{{item.total}}</div>
							<div class="subtitle-1">
								<v-icon>{{item.icon}}</v-icon>
								<span class="text-icon ml-3">{{item.text}}</span>
							</div>
						</div>
						<div 
							:class="`pa-3 ${item.color[1]} text-center pointer radius`"
	        		@click="$router.push({name: item.link})">
							Selengkapnya <v-icon>mdi-chevron-right</v-icon>
						</div>
					</v-sheet>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon, VSheet,
		VRow, VCol
	} from 'vuetify/lib'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VSheet,
			VRow, VCol
		},

		data: () => ({
			informasi: [
				{ 
					total: '900.000', 
					text: 'Total Siswa', 
					color: ['green darken-3', 'green darken-4'],
					link: '',
					icon: 'mdi-face'
				},
				{ 
					total: 100, 
					text: 'Total Kelas', 
					color: ['yellow darken-3', 'yellow darken-4'],
					link: '',
					icon: 'mdi-school'
				},
				{ 
					total: 50, 
					text: 'Total Jurusan', 
					color: ['red darken-3', 'red darken-4'],
					link: '',
					icon: 'mdi-school'
				},
				{ 
					total: 150, 
					text: 'Total Mata Pelajaran', 
					color: ['cyan darken-3', 'cyan darken-4'],
					link: 'sekolah',
					icon: 'mdi-school'
				}
			]
		})
	}
</script>