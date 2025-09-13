document.addEventListener('DOMContentLoaded', function () {
    // --- GANTI URL INI DENGAN URL API ANDA ---
    const apiUrl = 'URL_API_ANDA_DI_SINI';
    // -----------------------------------------

    const video = document.getElementById('videoPlayer');
    const channelList = document.getElementById('channels');
    let hls;

    // Fungsi untuk memuat dan memutar stream
    function playStream(url) {
        if (Hls.isSupported()) {
            if (hls) {
                hls.destroy(); // Hancurkan instance lama jika ada
            }
            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Untuk Safari di iOS/macOS yang mendukung HLS secara native
            video.src = url;
            video.addEventListener('loadedmetadata', function () {
                video.play();
            });
        }
    }

    // Ambil data dari API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Asumsi API mengembalikan array of objects,
            // contoh: [{ name: 'Channel 1', url: 'http://.../stream.m3u8' }, ...]
            // SESUAIKAN 'item.name' dan 'item.url' jika nama field di API Anda berbeda.
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.name; // Ambil nama channel
                listItem.dataset.streamUrl = item.url; // Simpan URL stream
                channelList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching API:', error);
            channelList.innerHTML = '<li>Gagal memuat daftar channel. Cek konsol (F12).</li>';
        });

    // Tambahkan event listener ke daftar channel
    channelList.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === 'LI') {
            const streamUrl = e.target.dataset.streamUrl;
            if (streamUrl) {
                console.log('Playing:', streamUrl);
                playStream(streamUrl);
            }
        }
    });
});
