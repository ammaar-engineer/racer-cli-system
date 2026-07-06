# Racer CLI system
Perlu diingat sistem ini membutuhkan sistem backend nya. Berikut link repo backend nya https://github.com/ammaar-engineer/racer-backend-system.git
Untuk saat ini sistem backend masih sedang dalam tahap development dan penyempurnaan

Sistem command telah diperbarui menjadi lebih readable dan mudah untuk diingat. Berikut list perintah-perintah CLI nya dan detail nya.

## 1. **Sistem snippet**

**Membuat snippet:** Untuk membuat snippet ada aturan nya. Snippet harus dibuat dalam bentuk sebuah array of object dan berada di dalam format file .racer, serta harus memiliki struktur seperti berikut.
```racer
[
  {
    "alias": ":racer",
    "content": "racer help --command",
    "description": "Get CLI tool guide"
  },
  {
    "alias": ":info",
    "content": "fastfetch",
    "description": "Get OS info"
  },
]
```
Baru setelah ini selesai. Jalankan perintah nya dan arahkan ke file berformat racer yang dibuat.
```racer
racer snippet --create snippet-file.racer
```

**Menggunakan snippet:** Cara menggunakan snippet adalah menggunakan perintah sebagai berikut.
```bash
racer snippet --execute :info
```
Atau jika kamu mau menggabungkan nya dengan perintah lain. Maka bisa juga dilakukan dengan cara yang hampir sama. Contoh
```bash
racer snippet --execute :info > myinfo.txt
```
atau bisa juga
```bash
echo $(racer snippet --execute :info)
```

**Mendownload snippet:** Cara mendownload dari sistem backend dapat menggunakan perintah
```bash
racer snippet --download
```
Maka hasil download nya akan langsung masuk ke dalam file **~/.racer/snippets.racer**

**Mengecek snippet yang terdownload:** Untuk melihat snippet-snippet yang telah didownload. Gunakan perintah berikut
```bash
racer snippet --list
```
Maka list snippet nya akan ditampilkan


## 2. **Sistem file**

**Upload file:** Untuk upload file bisa menggunakan perintah
```bash
racer file --upload file_target.txt namabucket
```
Setelah file terupload. Maka output nya adalah link akses sementara dari file tersebut

**Delete file:** Untuk menghapus file. Gunakan perintah berikut
```bash
racer file --delete file_target.txt namabucket
```

**Download file:** Untuk mendownload file. Gunakan perintah berikut
```bash
racer file --download file_target namabucket
```
Maka file akan tersimpan di tempat dimana perintah tersebut dijalankan

## 3. **Sistem bucket**

**Membuat bucket:** Untuk membuat bucket bisa menggunakan perintah
```bash
racer bucket --create namabucket
```

**Delete bucket:** Untuk menghapus bucket bisa menggunakan perintah
```bash
racer bucket --delete namabucket
```
Pastikan sebelum hapus bucket. Kamu harus membersihkan bucket dari isi-isi file yang ada di dalam nya

**Clear bucket:** Untuk membersihkan bucket dari file-file yang ada di dalam nya. Gunakan perintah berikut
```bash
racer bucket --clear namabucket
```

**Melihat isi bucket:** Untuk melihat file-file yang ada di dalam bucket. Gunakan perintah
```bash
racer bucket --peek namabucket
```

**Melihat list bucket:** Untuk melihat nama-nama bucket yang tersedia. Gunakan perintah
```bash
racer bucket --list
```

## 4. **Sistem AI**
Sebelum memulai dengan sistem AI. Perlu diketahui bahwa untuk mengatur provider AI. Pergi ke path **~.racer/config.racer**
dan set provider, API KEY, dan juga url dari provider AI kamu.

**Membuat sesi chat:** Untuk membuat sesi chat dengan AI. Gunakan perintah
```bash
racer ai --new-session namasession.racer
```
Session yang baru dibuat akan langsung digunakan. Detail nya bisa lihat di config.racer

**Menghapus sesi chat:** Untuk menghapus sesi chat. Gunakan perintah
```bash
racer ai --delete-session namasession.racer
```

**Menggunakan session:** Untuk menggunakan session chat. Gunakan perintah
```bash
racer ai --use-session namasession.racer
```
Session yang dipilih akan digunakan dan kamu bisa lihat isi nya pada config.racer

**Membersihkan seluruh session:** Untuk membersihkan seluruh session gunakan perintah
```bash
racer ai --clear-session
```

**Melihat list session:** Untuk melihat list session yang ada, gunakan perintah
```bash
racer ai --list-session
```

**Memulai chat dengan AI:** Untuk memulai chat dengan AI. Gunakan perintah berikut
```bash
racer ai --chat "konten"
```
Pastikan provider telah diatur sebelum mulai pembicaraan. Dan sudah memilih atau membuat session baru.

Semua pengaturan dan folder sesi chat terletak pada folder **~/.racer** yang berada di home directory. Di dalam folder memiliki struktur
```json
{
  "snippets.racer": "Berisi semua list snippet yang telah di download",
  "config.racer": "Berisi isi konfigurasi termasuk AI dan juga sesi chat yang digunakan",
  "aichat": "folder tempat sesi chat berada"
}
```