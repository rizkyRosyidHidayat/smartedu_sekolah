<template>
	<v-card outlined class="border-card">
		<div class="pa-3 se-primary white--text">
			<v-icon color="white">mdi-school</v-icon>
			<span class="ml-3 text-icon">Data Sekolah</span>
		</div>
		<v-card-text>
			<div class="border-bottom border-bold">
				<v-chip label class="se-primary white--text tile">
					IDENTITAS SEKOLAH
				</v-chip>
			</div>

			<v-row>
				<v-col cols="12" md="4" sm="12">
					<center>
						<v-avatar size="150" class="mt-3">
							<img :src="require('@/assets/se.png')" alt="profile" />
            </v-avatar>

						<v-file-input
							class="mt-3"			        
							prepend-icon="mdi-file-image"
							accept="image/*"
							show-size
							counter
							label="Logo sekolah"
						></v-file-input>
					</center>
				</v-col>
				<v-col cols="12" md="4" sm="12">
					<v-select
            label="Jenjang"
            :rules="requiredRule"
            autocomplete="off"
          ></v-select>
          <v-select
            label="Provinsi"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-select>
          <v-text-field
            label="Nama Sekolah"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            label="Email"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
				</v-col>
				<v-col cols="12" md="4" sm="12">
					<v-select
            label="Status"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-select>
          <v-select
            label="Kabuoaten/Kota"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-select>
          <v-text-field
            label="NPSN"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            label="No. Telp Sekolah"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
				</v-col>
			</v-row>

			<div class="border-bottom border-bold">
				<v-chip label class="se-primary white--text tile">
					BIODATA KEPALA SEKOLAH
				</v-chip>
			</div>

			<v-row>
				<v-col cols="12" md="6" sm="12">
          <v-text-field
            label="Nama lengkap"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            label="No. Telp"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
				</v-col>
				<v-col cols="12" md="6" sm="12">
          <v-text-field
            label="NIP"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
				</v-col>
			</v-row>

			<div class="border-bottom border-bold">
				<v-chip label class="se-primary white--text tile">
					BIODATA PROKTOR
				</v-chip>
			</div>

			<v-row>
				<v-col cols="12" md="6" sm="12">
          <v-text-field
            label="Nama Proktor 1"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            label="Nama Proktor 2"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
				</v-col>
				<v-col cols="12" md="6" sm="12">
          <v-text-field
            label="No. Telp Proktor 1"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            label="No. Telp Proktor 2"            
            :rules="requiredRule"
            autocomplete="off"
          ></v-text-field>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<div>
				<v-checkbox
					v-model="checkbox"
					:rules="[v => !!v || 'Anda harus mennyetujuinya']"
					label="Saya menerima kebijakan yang diberikan oleh SmartEdu"
					class="mt-0"
					required
				></v-checkbox>
				<center>
					<v-btn
						color="primary" class="mb-3">
						Simpan
					</v-btn>
				</center>
			</div>
			<v-spacer></v-spacer>
		</v-card-actions>
	</v-card>
</template>

<script>
	import { 
		VCard, VCardText,
		VIcon, VBtn,
		VRow, VSelect, VCol,
		VSpacer, VChip, VTextField,
		VCheckbox
	} from 'vuetify/lib'

	export default {
		components: {
			VCard, VCardText,
			VIcon, VBtn,
			VRow, VSelect, VCol,
			VSpacer, VChip, VTextField,
			VCheckbox
		},

		data: () => ({
			checkbox: false,
			requiredRule: [v => !!v || 'Data harus di isi']
		}),
	}
</script>