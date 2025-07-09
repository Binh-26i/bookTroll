const imgNames = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg",
  "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg",
  "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg",
  "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg",
  "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg",
  "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg",
  "37.jpg", "38.jpg", "39.jpg", "40.jpg", "41.jpg", "42.jpg",
  "43.jpg", "44.jpg", "45.jpg", "46.jpg", "47.jpg", "48.jpg",
  "49.jpg", "50.jpg", "51.jpg", "52.jpg", "53.jpg", "54.jpg",
  "55.jpg", "56.jpg", "57.jpg", "58.jpg"
];

const book = document.getElementById("book");
const totalSheets = Math.ceil(imgNames.length / 2) + 2;
let currentZIndex = 100;
let currentPageIndex = 0;

for (let i = 0; i < totalSheets; i++) {
  const page = document.createElement("div");
  page.className = "page";
  const pageInner = document.createElement("div");
  pageInner.className = "page-inner";

  const isCoverFront = i === 0;
  const isCoverBack = i === totalSheets - 1;

  const front = document.createElement("div");
  front.className = "front";
  const back = document.createElement("div");
  back.className = "back";

  if (isCoverFront) {
    front.innerHTML = `<div class="cover-title">Bộ sưu tập<br>
                          <p style="font-size: 12px;">Cân nhắc trước khi mở</p>
                      </div>`;
    back.innerHTML = `<img src="img/${imgNames[0]}" alt="Trang 1">`;
  } else if (isCoverBack) {
    back.innerHTML = `<div class="cover-title">Bìa Sau</div>`;
  } else {
    const frontImg = i * 2 - 1;
    const backImg = i * 2;

    if (frontImg < imgNames.length) {
      front.innerHTML = `<img src="img/${imgNames[frontImg]}" alt="Trang ${frontImg + 1}">`;
    }

    if (backImg < imgNames.length) {
      back.innerHTML = `<img src="img/${imgNames[backImg]}" alt="Trang ${backImg + 1}">`;
    }
  }

  pageInner.appendChild(front);
  pageInner.appendChild(back);
  page.appendChild(pageInner);

  page.style.zIndex = currentZIndex--;

  page.addEventListener("click", () => {
    if (page.classList.contains("flipped")) {
      page.classList.remove("flipped");
      currentPageIndex = Math.max(currentPageIndex - 1, 0);
    } else {
      page.classList.add("flipped");
      currentPageIndex = Math.min(currentPageIndex + 1, totalSheets - 1);
    }
  });

  book.appendChild(page);
}

let touchStartX = 0;
let touchEndX = 0;
let isFlipping = false;

book.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

book.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (isFlipping) return;

  const pages = document.querySelectorAll(".page");

  if (touchEndX < touchStartX - 50) {
    // Vuốt sang trái → lật tới
    const nextPage = Array.from(pages).find(p => !p.classList.contains("flipped"));
    if (nextPage) {
      isFlipping = true;
      nextPage.classList.add("flipped");
      currentPageIndex++;
      setTimeout(() => isFlipping = false, 1000);
    }
  } else if (touchEndX > touchStartX + 50) {
    // Vuốt sang phải → lật về
    const lastFlipped = Array.from(pages).reverse().find(p => p.classList.contains("flipped"));
    if (lastFlipped) {
      isFlipping = true;
      lastFlipped.classList.remove("flipped");
      currentPageIndex--;
      setTimeout(() => isFlipping = false, 1000);
    }
  }
}
