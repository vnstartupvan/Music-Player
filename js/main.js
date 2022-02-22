/* 
1. Render songs
2. Scroll top
3. Play / pause / seek
4. CD rotate
5. Next/ prev
6. Random
7. Next / repeat when ended
8. Active song
9. Scroll active song into view
10. Play song when click
*/

var $= document.querySelector.bind(document);
var $$= document.querySelectorAll.bind(document);

const cd = $(".cd") 
const cdWidth = cd.offsetWidth;
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const app = {
    currentIndex: 0,
    isPlaying: false,
    songs : [
        {
            name:'Đau nhất là lặng im',
            singer:"Erik",
            path: "./musics/DauNhatLaLangIm-ERIK-7130326.mp3",
            image: "./images/dau-nhat-la-lang-im.jpg",

        },
        {
            name:'Chờ ngày anh nhận ra em',
            singer:"Thùy Chi",
            path: "./musics/ChoNgayAnhNhanRaEmMoiTinhDauCuaToiOST-ThuyChi-5845024.mp3",
            image: './images/cho-ngay-anh-nhan-ra-em.jpg',
        },
        {
            name:'Cần gì hơn',
            singer:"Tiên Tiên",
            path: "./musics/CanGiHon-TienTienJustaTee-6236038.mp3",
            image: './images/can-gi-hon.jpg',
        },
        {
            name:'Chạy về nơi phía anh',
            singer:"Khắc Việt",
            path: "./musics/ChayVeNoiPhiaAnh-KhacViet-7129688.mp3",
            image: "./images/chay-ve-noi-phia-anh.jpg",
        },
        {
            name:'See tình',
            singer:"Hoàng Thùy Linh",
            path: "./musics/SeeTinh-HoangThuyLinh-7130526.mp3",
            image: "./images/see-tinh.jpg",
        },
        {
            name:'Bầu trời bình yên',
            singer:"Bình Boo",
            path: "./musics/BauTroiNhoYen-BinhBoo-7127857.mp3",
            image: "./images/bau-troi-binh-yen.jpg",
        },
        {
            name:'Cưới em',
            singer:"Bray",
            path: "./musics/CuoiEm-BRay-7130027.mp3",
            image: "./images/cuoi-em.jpg",
        },
        {
            name:'Ước mơ của mẹ',
            singer:"Quân A.P",
            path: "./musics/UocMoCuaMe1-QuanAP-7127567.mp3",
            image: "./images/uoc-mo-cua-me.jpg",
        },
        {
            name:'Ngày đầu tiên',
            singer:"Đức Phúc",
            path: "./musics/NgayDauTien-DucPhuc-7129810.mp3",
            image: "./images/ngay-dau-tien.jpg",
        },
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function(){
        Object.defineProperty(this,'currentSong', {
            get:function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        //xoay cd khi play/ dung khi stop
        const cdThumbRotate = cdThumb.animate([
            {transform:'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        cdThumbRotate.pause();

        //xu ly phong to/ thu nho cd
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop       
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth
        }

        //Xu ly khi click play
        playBtn.addEventListener("click",function() {
            //kiem tra xem bai hat co dang phat
            if(!app.isPlaying) {
                audio.play();
                audio.onplay= function () {
                    app.isPlaying = true;
                    player.classList.add("playing")
                    cdThumbRotate.play()
                }
            }else {
                audio.pause();
                audio.onpause= function () {
                    app.isPlaying = false;
                    player.classList.remove("playing")
                    cdThumbRotate.pause()
                }
            }
        })
        // Khi bai hat thay doi
        audio.ontimeupdate = function () {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
                progress.value = progressPercent;
            }
        }
        //xu ly khi tua song
        progress.onchange = function (e){
            const timePercent = audio.duration/100;
            audio.currentTime =e.target.value * timePercent
        }
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path;
        // audio.play()
    },
    start: function() {
        //define properties for the object
        this.defineProperties()
        //listen and execute events (DOM events)
        this.handleEvents();
        //Render the first song to UI at the first opened time.
        this.loadCurrentSong();
        //render playlist
        this.render();

    },
}
app.start()

const route = function () {
    
}
// route()





// transform: rotate(100deg);
