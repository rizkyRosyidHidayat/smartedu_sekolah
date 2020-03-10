<template>
  <v-navigation-drawer app :permanent="permanent">
  	<div class="d-flex justify-center my-3">
  		<div class="text-center">
  			<v-avatar size="100">
		  		<img :src="require('@/assets/profil.jpg')" alt="profile" />
		  	</v-avatar>
		  	<div class="title mt-3">
		  		SMK N 1 Wonosobo
		  	</div>
		  	<div class="subtitle-1">
		  		Wonosobo
		  	</div>
  		</div>
  	</div>

    <v-list
      dense
      nav
    >
      <v-list-item-group v-model="list" color="primary">
      	<v-list-item
	        v-for="item in items"
	        :key="item.title"
	        link
	        @click="$router.push({name: item.link})"
	      >
	        <v-list-item-icon>
	          <v-icon>{{ item.icon }}</v-icon>
	        </v-list-item-icon>

	        <v-list-item-content>
	          <v-list-item-title>{{ item.title }}</v-list-item-title>
	        </v-list-item-content>
	      </v-list-item>
	      <v-list-group
          no-action
          :value="false"
        >
          <template v-slot:activator>
          	<v-list-item-icon>
		          <v-icon>mdi-database</v-icon>
		        </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Master Data</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(admin, i) in data"
            :key="i"
            link
            @click="$router.push({name: admin.link})">
            <v-list-item-title v-text="admin.title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="admin.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-item
          link
          @click="keluar">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Keluar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>      
    </v-list>
  </v-navigation-drawer>	
</template>

<script>
	import { 
		VNavigationDrawer,
		VList, VListItem, VListItemIcon, 
		VListItemContent, VListItemTitle, VListItemGroup,
		VAvatar, VListGroup
	} from 'vuetify/lib'

	export default {
		props: ['permanent'],		

		components: {
			VNavigationDrawer,
			VList, VListItem, VListItemIcon, VListItemContent, 
			VListItemTitle, VListItemGroup, VListGroup,
			VAvatar			
		},

		data: () => ({
			list: 0,
			items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: 'home' },
        { title: 'Daftar Siswa', icon: 'mdi-face', link: 'siswa' },
        { title: 'Manage Soal', icon: 'mdi-file', link: 'soal' },
        { title: 'Manage Tes', icon: 'mdi-pencil', link: 'tes' }
      ],
      data: [
        { title: 'Kelas', icon: 'mdi-google-analytics', link: 'kelas' },
        { title: 'Jurusan', icon: 'mdi-medal', link: 'jurusan' },
        { title: 'Ruang Kelas', icon: 'mdi-door', link: 'ruang' },
        { title: 'Mata Pelajaran', icon: 'mdi-book', link: 'mapel' }
      ]
		}),

    methods: {
      keluar () {
        window.localStorage.removeItem('token_sekolah')
        this.$router.push({name: 'login'})
      }
    }
	}
</script>