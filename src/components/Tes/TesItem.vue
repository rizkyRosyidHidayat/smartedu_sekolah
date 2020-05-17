<template>
	<v-card outlined class="border-card">
		<div class="pa-2 se-primary white--text d-flex">
			<span class="text-icon subtitle-1">
				{{ data.subject.name }}
			</span>
			<v-spacer></v-spacer>
			<EditTes :data="data" />
			<HapusTes :id="data.id" />
		</div>
		<v-card-text>
			<table>
				<tbody>
					<tr>
						<td>Kelas</td>
						<td>:</td>
						<td>{{ data.group.name }}</td>
					</tr>
					<tr>
						<td>Jurusan</td>
						<td>:</td>
						<td>{{ data.major.name }}</td>
					</tr>
					<tr>
						<td>Tanggal Sync</td>
						<td>:</td>
						<td>{{ data.sync_date }}</td>
					</tr>
					<tr>
						<td>Tanggal Tes</td>
						<td>:</td>
						<td>{{ data.date_implementation }}</td>
					</tr>
					<tr>
						<td>Waktu Tes</td>
						<td>:</td>
						<td>{{ data.hours_implementation }}</td>
					</tr>
					<tr>
						<td>Durasi</td>
						<td>:</td>
						<td>{{ data.duration_work }}</td>
					</tr>
					<tr>
						<td>Token</td>
						<td>:</td>
						<td>
							<v-chip label>
					      <b>{{ data.token }}</b>
					    </v-chip>
						</td>
					</tr>
				</tbody>
			</table>
		</v-card-text>
		<v-divider></v-divider>
		<v-card-actions>
	    <v-spacer></v-spacer>
    	<v-btn 
	    	v-if="data.status === 0"
	    	color="success"
	    	:loading="isLoadingToken"
	    	@click="mulaiTes(data.id)"
	    	depressed>
	    	mulai tes
	    </v-btn>
	    <v-btn 
    		v-else
	    	color="error"
	    	:loading="isLoadingToken"
	    	@click="akhiriTes(data.id)"
	    	depressed>
	    	akhiri tes
	    </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import { mapState } from 'vuex'
	import HapusTes from '@/components/Tes/HapusTes'
	import EditTes from '@/components/Tes/EditTes'

	export default{
		props: ['data', 'index'],
		components: {
			HapusTes,
			EditTes
		},
		computed: {
			...mapState('dataTes', ['isLoadingToken', 'dataToken']),		
		},
		methods: {			
			mulaiTes(val) {
				this.$store.dispatch('dataTes/postMulaiTes', {
					id: val
				})
				this.$store.dispatch('dataTes/updateIsLoadingToken', true)
			},
			akhiriTes(val) {
				this.$store.dispatch('dataTes/postAkhiriTes', {
					id: val
				})
				this.$store.dispatch('dataTes/updateIsLoadingToken', true)
			}
		}
	}
</script>