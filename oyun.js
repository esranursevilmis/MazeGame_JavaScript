var cvs = document.getElementById("myCanvas");
var ctx = cvs.getContext("2d");
//canvas alanının boyutları
cvs.width = 600; 
cvs.height = 600;

let moves = 0;//oyuncunun hareket sayısını tutan değişken.
let map = [ //Labirentin iki boyutlu bir dizi olarak temsil edildiği matris.
//bu matriste 0 oyuncunun hareket edemediği duvarları, 1 ise hareket edebildiği yolları, 2 ise kemiği temsil ediyor.
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1,0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
];
//
let collbox = [];

//sayfada kullanılan resimler
let pavement = new Image();
pavement.src = "pavement.jpg";

let brick = new Image();
brick.src = "brick.jpg";

let dog = new Image();
dog.src = "dog.png";

let dog_rev = new Image();
dog_rev.src = "dog_rev.png";

let bone = new Image();
bone.src = "bone.png";

function drawMap(m) { //sayfa ilk yüklendiğinde çalışan ve haritayı oluşturan fonksiyon.
  var mapWidth = m[0].length * 30; // haritanın genişliği
  var mapHeight = m.length * 30; // haritanın yüksekliği
  var x = (cvs.width - mapWidth) / 2; // x koordinatı hesaplandı
  var y = (cvs.height - mapHeight) / 2; // y koordinatı hesaplandı

  for (i = 0; i < m.length; i++) {
    collbox.push([]);// map matrisinde alınan indis değerleri sıra sıra yeni eleman olarak eklendi.
    for (j = 0; j < m[i].length; j++) { 
      if (m[i][j] == 0) { 
        ctx.beginPath();
        ctx.drawImage(brick, j * 30, i * 30, 30, 30);//hareket alanı olmayan yerlere duvar resmi çizildi

      } else if (m[i][j] == 2) {
        ctx.beginPath();
        ctx.drawImage(pavement, j * 30, i * 30, 30, 30);
        ctx.drawImage(bone, j * 30, i * 30, 30, 30);//köpeğin ulaşacağı kemik resmi çizildi.

      } else {
        ctx.beginPath();
        ctx.drawImage(pavement, j * 30, i * 30, 30, 30);//hareket edilebilen yerlere kaldırım resmi çizildi
      }
      collbox[i].push({ //koordinatları ve hücrelerin boyutları belirlendi.
        x: j * 30,
        y: i * 30,
        status: m[i][j] === 1 ? 1 : m[i][j] === 2 ? 2 : 0,
      });
    }
  }
}

var pos = 1;
function drawPlayer(x, y) {
  ctx.beginPath();
// pos değişkeni ile sağ ve sol tuşlarına basıldığında köpeğin dönüş hareketleri yapıldı.
  if (pos === -1) {
    ctx.drawImage(dog_rev, x, y, 30, 30);//köpeğin sola dönük hali
  } else if (pos === 1) {
    ctx.drawImage(dog, x, y, 30, 30);//köpeğin sağa dönük hali
  }
}

function move(x, y) {
  drawMap(map);
  drawPlayer(x, y);
// hareket fonksiyonu köpeğin konumu sürekli güncelleniyor.
  player.x = player.newX;
  player.y = player.newY;

  moves = moves + 1;
  document.querySelector("span").innerHTML = moves;
}

let player = {//oyuncunun bulunduğu ilk ve yenilenen konumları.
  x: 0,
  y: 0,
  newX: 0,
  newY: 0,
};

var isGameOver = false;
function checkColl() { //bu fonksiyon geçtiğimiz her ücrenin duvar, kaldırım veya kemik olup olmadığını kontrol eder.
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      let b = collbox[i][j];
      if (player.newX === b.x && player.newY === b.y) {
        if (b.status === 0) {
          console.log("Hit Rock");//tuğlaya çarptığımızda hiçbir hareket yapılmaz 
        } else if (b.status === 2) {
          console.log("WIN");
          isGameOver = true;//kemiğe ulaşıldığı için oyunun bitme durumu güncellenir.
          move(player.newX, player.newY);
          document.querySelector(".winMessage").style.display = "block";//kullanıcıya bilgi verilir.
        } else if (player.newX < 0 || player.newX > 600 ||
                   player.newY < 0 || player.newY > 600 ){
          //oyuncu canvas alanında matris içinden çıkmamalıdır.
          console.log("Hit Wall");
        } else {
          if (!isGameOver) {
            move(player.newX, player.newY); //eğer oyun bitmediyse yolda ilerlemeye devam edilir.
          }
        }
      }
    }
  }
}
var secondsLeft = 30;
let timer = setInterval(function() {
  if(!isGameOver){ 
    secondsLeft--; } //oyun bitmediği sürece saniye azaltılır.
  document.getElementById("timer").innerHTML = "Game ends in: "+secondsLeft+" seconds";//kalan her saniye burada gösterilir.
  if (secondsLeft === 0) {
    clearInterval(timer); //zamanlayıcı durdurulur 
    isGameOver=true;//süre dolmuştur ve isGameOver durumu true olarak ayarlanır.
    if(isGameOver){
     document.querySelector(".timeMessage").style.display = "block"; } //oyuncuya bilgi verilir.
  }
}, 1000);


window.onkeydown = function (e) {//kullanıcı klavyede bastığı tuşlara göre köpeğin konumları ayarlanır.
  if (e.keyCode === 37) {
    pos = -1;
    player.newX = player.x - 30;
    player.newY = player.y;
    console.log("LEFT");
  }
  if (e.keyCode === 39) {
    pos = 1;
    player.newX = player.x + 30;
    player.newY = player.y;
    console.log("RIGHT");
  }
  if (e.keyCode === 38) {
    player.newY = player.y - 30;
    player.newX = player.x;
    console.log("UP");
  }
  if (e.keyCode === 40) {
    player.newY = player.y + 30;
    player.newX = player.x;
    console.log("DOWN");
  }
  //move(player.newX, player.newY); //bu olunca duvardan direkt geçiliyor.
  checkColl(); //önce buna gidip oranın duvar mı kontrol ediliyor.
};
window.onload = function () {// sayfa yüklendiğinde çalışacak fonksiyonlar.
  drawMap(map);
  drawPlayer(0, 0);
};
