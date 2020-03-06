<template>
	<v-form v-model="valid" ref="form">
		<v-card-text class="pb-0">
			<v-row dense>
				<v-col cols="12" md="6" sm="12">
					<v-select
	          :items="tahun"
	          v-model="dataLogin.tahun"
	          label="Tahun Ajaran"
	          outlined
	          dense
	          :rules="requiredRule"              
	        ></v-select> 
				</v-col>
				<v-col cols="12" md="6" sm="12">
					<v-select
	          :items="semester"
	          v-model="dataLogin.semester"
	          label="Semester"
	          outlined
	          dense
	          :rules="requiredRule"              
	        ></v-select>
				</v-col>
			</v-row>	
			<v-text-field
	      v-model="dataLogin.username"
	      label="Username"
	      outlined
	      dense
	      :rules="requiredRule"
	      autocomplete="off"
	    ></v-text-field>
			<v-text-field
	      v-model="dataLogin.password"
	      label="Password"
	      outlined
	      dense
	      :rules="requiredRule"
	      autocomplete="off"
	    ></v-text-field>
		</v-card-text>
		<v-divider></v-divider>
		<v-card-actions class="ma-2">
			<div class="w-100 mb-2">
				<v-btn
					:disabled="!valid"
					depressed block
					type="submit"
					@click.prevent="validate"
					class="se-primary mb-3 white--text">
					Login
				</v-btn>

				<div>Contact Person :</div>
				<v-chip label class="se-primary" dark>
					<v-icon small class="mr-3">mdi-phone</v-icon>
					Irma Yanti : 0821-3826-9314
				</v-chip>
			</div>
		</v-card-actions>		
	</v-form>
</template>

<script>
	import {
		VForm, VRow, VCol,
		VBtn, VChip, VIcon
	} from 'vuetify/lib'

	export default{
		components: {
			VForm, VRow, VCol,
			VBtn, VChip, VIcon
		},

		data: () => ({
			valid: true,
			dataLogin: {
				tahun: '',
				semester: '',
				username: '',
				password: ''
			},
			semester: ['Ganjil', 'Genap'],
			requiredRule: [v => !!v || 'Data harus diisi']
		}),

		computed: {
			tahun () {
				var year = new Date().getUTCFullYear()
				return [year-1+'/'+year, year+'/'+(year+1)]
			}
		},

		methods: {
			validate () {
				if (this.$refs.form.validate()) {
					console.log(this.dataLogin)
				}
			}
		}
	}
</script>