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
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs : [
        {
            name:'Đau nhất là lặng im',
            singer:"Erik",
            path: "./musics/DauNhatLaLangIm-ERIK-7130326.mp3",
            image: "./images/dau-nhat-la-lang-im.jpg",
            id:1 ,

        },
        {
            name:'Chờ ngày anh nhận ra em',
            singer:"Thùy Chi",
            path: "./musics/ChoNgayAnhNhanRaEmMoiTinhDauCuaToiOST-ThuyChi-5845024.mp3",
            image: './images/cho-ngay-anh-nhan-ra-em.jpg',
            id:2 ,
        },
        {
            name:'Cần gì hơn',
            singer:"Tiên Tiên",
            path: "./musics/CanGiHon-TienTienJustaTee-6236038.mp3",
            image: './images/can-gi-hon.jpg',
            id:3 ,
        },
        {
            name:'Chạy về nơi phía anh',
            singer:"Khắc Việt",
            path: "./musics/ChayVeNoiPhiaAnh-KhacViet-7129688.mp3",
            image: "./images/chay-ve-noi-phia-anh.jpg",
            id:4 ,
        },
        {
            name:'See tình',
            singer:"Hoàng Thùy Linh",
            path: "./musics/SeeTinh-HoangThuyLinh-7130526.mp3",
            image: "./images/see-tinh.jpg",
            id:5 ,
        },
        {
            name:'Bầu trời bình yên',
            singer:"Bình Boo",
            path: "./musics/BauTroiNhoYen-BinhBoo-7127857.mp3",
            image: "./images/bau-troi-binh-yen.jpg",
            id:6 ,
        },
        {
            name:'Cưới em',
            singer:"Bray",
            path: "./musics/CuoiEm-BRay-7130027.mp3",
            image: "./images/cuoi-em.jpg",
            id:7 ,
        },
        {
            name:'Ước mơ của mẹ',
            singer:"Quân A.P",
            path: "./musics/UocMoCuaMe1-QuanAP-7127567.mp3",
            image: "./images/uoc-mo-cua-me.jpg",
            id:8 ,
        },
        {
            name:'Ngày đầu tiên',
            singer:"Đức Phúc",
            path: "./musics/NgayDauTien-DucPhuc-7129810.mp3",
            image: "./images/ngay-dau-tien.jpg",
            id:9 ,
        },
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song" id='${song.id}'>
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

        //next/ prev bai hat 
        nextBtn.onclick = function() {
            if(app.isRandom) {
                app.randomSong()
            } else {
                app.nextSong()
            }  
            audio.play()

        }
        prevBtn.onclick = function () {
            if(app.isRandom) {
                app.randomSong()
            } else {
                app.prevSong();
            }
            audio.play()
        }
        //random bai hat 
        randomBtn.onclick = function() {
            if(!app.isRandom) {
                randomBtn.classList.add("active")
                app.isRandom = true;
                
            } else {
                randomBtn.classList.remove("active")
                app.isRandom = false;
            }
        }
        // khi ket thuc bai hat 
        audio.onended = function () {
            nextBtn.click()
        }
        // repeat bai hat
        repeatBtn.onclick = function () {
            if(!app.isRepeat) {
                repeatBtn.classList.add("active")
                app.isRepeat = true;
                
            } else {
                repeatBtn.classList.remove("active")
                app.isRepeat = false;
            }
        }
    },
    nextSong: function() {
        this.currentIndex++;
        if ( this.currentIndex >= this.songs.length) {
            this.currentIndex= 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if ( this.currentIndex < 0) {
            this.currentIndex= this.songs.length -1;
        }
        console.log(this.currentIndex)
        this.loadCurrentSong();
    },
    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random()*this.songs.length)
        } while (this.currentIndex === newIndex )
        this.currentIndex = newIndex;
        this.loadCurrentSong()
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
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
