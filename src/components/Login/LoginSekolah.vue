<template>
	<v-form v-model="valid" ref="form">
		<v-card-text class="pb-0">
			<!-- <v-row dense>
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
			</v-row> -->	
			<v-text-field
	      v-model="dataLogin.username"
	      label="Username"
	      outlined
	      v-mask="mask"
	      dense
	      :rules="requiredRule"
	      autocomplete="off"
	    ></v-text-field>
			<v-text-field
	      v-model="dataLogin.password"
	      label="Password"
	      :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
	      :type="showpassword ? 'text' : 'password'"
	      @click:append="showpassword = !showpassword"
	      outlined
	      dense
	      v-mask="mask"
	      :rules="requiredRule"
	      autocomplete="off"
	    ></v-text-field>

	    <Notif :msg="msg" :status="status" @visible="visible" />
		</v-card-text>
		<v-divider></v-divider>
		<v-card-actions class="ma-2">
			<div class="w-100 mb-2">
				<v-btn
					:disabled="!valid"
					depressed block
					:loading="isLoading"
					type="submit"
					@click.prevent="validate"
					class="se-primary mb-3 white--text">
					Login
				</v-btn>

				<div>Contact Person :</div>
				<v-chip label class="se-primary" dark>
					<v-icon small class="mr-3">mdi-phone</v-icon>
					Fandu : 0821-3826-9314
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
	import { postDataLogin } from '@/config/login'
	import { mask } from 'vue-the-mask'
	import Notif from '@/components/Notif'

	export default{
		directives: {
			mask
		},

		components: {
			VForm, VRow, VCol,
			VBtn, VChip, VIcon,
			Notif
		},

		data: () => ({
			valid: true,
			isLoading: false,
			showpassword: false,			
			dataLogin: {
				tahun: '',
				semester: '',
				username: '',
				password: ''
			},
			mask: 'XXXXXX',
			semester: ['Ganjil', 'Genap'],
			requiredRule: [v => !!v || 'Data harus diisi'],
			status: null,
			msg: {
				success: 'Login berhasil',
				error: 'Login gagal',
				visible: false
			}
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
					var data = {
						username: this.dataLogin.username,
						password: this.dataLogin.password
					}
					this.isLoading = true					
					postDataLogin (data)
						.then(res => {
							this.isLoading = false							
							this.status = true
							window.location.href="/"
						})
						.catch(err => {
							this.isLoading = false
							this.status = false
						})
					this.msg.visible = true
				}
			},
			visible (val) {
				this.msg.visible = val
			}
		}
	}
</script>