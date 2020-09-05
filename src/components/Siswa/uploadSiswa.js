import { uniqBy } from 'lodash'

// export function dataKelas(sheet) {
// 	var dataKelas = []
// 	sheet.map(sheet => {
// 		var kelas = uniqBy(sheet, 'KELAS')
// 		kelas.map((kelas, i) => {
// 			dataKelas.push({ 
// 				name: kelas.KELAS
// 			})
// 		})
// 	})

// 	dataKelas = uniqBy(dataKelas, 'name')
// 	console.log(dataKelas)	
// 	return dataKelas	
// }

// export function dataJurusan(sheet) {
// 	var dataJurusan = []
// 	sheet.map(sheet => {
// 		var kelas = uniqBy(sheet, 'KELAS')
// 		kelas.map(siswa => dataJurusan.push({
// 			name: siswa.JURUSAN,
// 			group: siswa.KELAS
// 		}))
// 	})

// 	console.log(dataJurusan)	
// 	return dataJurusan	
// }

function generateText(len) {
  let text = "";
  let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  for (let i = 0; i < len; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return text;
}

export function dataRuang(sheet) {
	var school = JSON.parse(window.localStorage.getItem('data_sekolah'))
	var dataRuang = {
		data: {
			room: [],
			group: [],
			major: [],
			participant: [],
			school_id: school.id
		}
	}
	sheet.map(sheet => {		
		sheet.map(siswa => {
			var dataSiswa = {
				name: siswa.NAMA,
				nisn: siswa.NISN,
				password: generateText(6),
				visible: generateText(6),
				major: siswa.JURUSAN,
				room: siswa['RUANG KELAS'],
				group: siswa.KELAS
			}
			dataRuang.data.participant.push(dataSiswa)
		})

		var kelas = uniqBy(sheet, 'KELAS')
		kelas.map(kelas => {
			var dataKelas = sheet.filter(siswa => siswa.KELAS === kelas.KELAS)
			var ruang = uniqBy(dataKelas, 'RUANG KELAS')
			ruang.map(siswa => {
				dataRuang.data.room.push(siswa['RUANG KELAS'])
				dataRuang.data.group.push(siswa.KELAS)
				dataRuang.data.major.push(siswa.JURUSAN)
			})
		})		
	})

	// console.log(JSON.stringify(dataRuang))	
	return dataRuang	
}