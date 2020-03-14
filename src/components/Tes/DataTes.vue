<template>
	<div>
		<v-text-field
      v-model="search"
      prepend-icon="mdi-magnify"
      label="Cari Mapel"
      class="mb-3"
      single-line
      autocomplete="off"
      hide-details
    ></v-text-field>
		<v-row>
			<v-col 
				v-for="(item, i) in 8" :key="i"
				cols="12" 
				md="4" sm="6">
				<v-card outlined class="border-card">
					<div class="pa-2 se-primary white--text d-flex">
						<span class="text-icon subtitle-1">pendidikan kewarganegaraan</span>
						<v-spacer></v-spacer>
						<v-btn 
							fab title="Edit jadwal"
							x-small 
							depressed 
							color="white" 
							class="mr-3">
							<v-icon small color="primary">mdi-pencil</v-icon>
						</v-btn>
						<v-btn 
							fab title="Hapus jadwal"
							x-small 
							depressed 
							color="white">
							<v-icon small color="error">mdi-trash-can</v-icon>
						</v-btn>
					</div>
					<v-card-text>
						<table>
							<tbody>
								<tr v-for="(item, i) in detail" :key="i">
									<template v-if="item.colom === 'Token'">
										<td>{{ item.colom }}</td>
										<td>:</td>
										<td>
											<v-chip label>
									      <b>{{ item.value }}</b>
									    </v-chip>
										</td>
									</template>
									<template v-else>
										<td>{{ item.colom }}</td>
										<td>:</td>
										<td>{{ item.value }}</td>
									</template>
								</tr>
							</tbody>
						</table>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
				    <v-spacer></v-spacer>
			    	<v-btn 
				    	color="success"
				    	depressed>
				    	mulai tes
				    </v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="12" md="4" sm="6">
				<v-sheet 
					class="d-flex justify-center align-center"
					color="grey lighten-2" 
					height="100%">
					<TambahTes/>
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { 
		VCard, VCardText, VBtn,
		VRow, VCol,
		VSpacer, VIcon, VChip,
		VSheet
	} from 'vuetify/lib'
	import TambahTes from '@/components/Tes/TambahTes'

	export default{
		components: {
			VCard, VCardText, VBtn,
			VRow, VCol,
			VSpacer, VIcon, VChip,
			VSheet,
			TambahTes
		},

		data: () => ({
			detail: [
				{ colom: 'Kelas', value: 'X' },
				{ colom: 'Jurusan', value: 'Rekayasa Perangkat Lunak' },
				{ colom: 'Tanggal Sync', value: '29/03/2020' },
				{ colom: 'Tanggal Tes', value: '30/03/2020' },
				{ colom: 'Token', value: 'THK765' }
			],
			search: ''
		})
	}
</script>