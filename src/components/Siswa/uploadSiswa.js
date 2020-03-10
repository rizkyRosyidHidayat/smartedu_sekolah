import { uniqBy } from 'lodash'

export function dataKelas(sheet) {
	var dataKelas = []
	sheet.map(sheet => {
		var kelas = uniqBy(sheet, 'KELAS')
		kelas.map((kelas, i) => {
			dataKelas.push({ 
				name: kelas.KELAS
			})
		})
	})

	dataKelas = uniqBy(dataKelas, 'name')
	console.log(dataKelas)	
	return dataKelas	
}

export function dataJurusan(sheet) {
	var dataJurusan = []
	sheet.map(sheet => {
		var kelas = uniqBy(sheet, 'KELAS')
		kelas.map(siswa => dataJurusan.push({
			name: siswa.JURUSAN,
			group: siswa.KELAS
		}))
	})

	console.log(dataJurusan)	
	return dataJurusan	
}

export function dataRuang(sheet) {
	var dataRuang = []
	sheet.map(sheet => {
		var kelas = uniqBy(sheet, 'KELAS')
		kelas.map(kelas => {
			var dataKelas = sheet.filter(siswa => siswa.KELAS === kelas.KELAS)
			var ruang = uniqBy(dataKelas, 'RUANG KELAS')
			ruang.map(siswa => dataRuang.push({
				name: siswa['RUANG KELAS'],
				group: siswa.KELAS,
				major: siswa.JURUSAN
			}))
		})		
	})

	console.log(dataRuang)	
	return dataRuang	
}