const getJSON = function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      const status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

getJSON('http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=92e1a79652b2d6263924d1f105522a8c&units=metric',
function(err, data) {
  if (err !== null) {
    alert('죄송합니다. 예상치 못한 오류가 발생했습니다. ' + err);
  } else {
    loadWeather(data);
    loadImg(data);
    dailyClothes(data);
  }
});

//날씨 받아오기
function loadWeather(data) {
    let location = document.querySelector(".location");
    let currentTime = document.querySelector(".current-time");
    let currentTemp = document.querySelector(".current-temp");
    let feelsLike = document.querySelector(".feels-like");
    let minTemp = document.querySelector(".min-temp");
    let maxTemp = document.querySelector(".max-temp");
    let icon = document.querySelector(".icon");
    let weatherIcon = data.weather[0].icon;

    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    location.append(`${data.name}의 현재 온도는 ${(data.main.temp).toFixed(1)}도 입니다`);
    //currentTemp.append(`${data.main.temp}°`);
    feelsLike.append(`${(data.main.feels_like).toFixed(1)}°`);
    maxTemp.append(`${(data.main.temp_max).toFixed(1)}°`);
    minTemp.append(`${(data.main.temp_min).toFixed(1)}°`);
    //icon.innerHTML= `<img src='https://openweathermap.org/img/wn/${weatherIcon}.png'>`;

    currentTime.append(`${month}월 ${day}일 ${hours}시 ${minutes}분`);
}

//날씨에 따라 배경 이미지 전환
function loadImg(data) {
  let background = document.querySelector(".weather-container");
  let temp = data.weather[0].icon;
  //let temp = '09n';
  const season = (url) => {
    background.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)),url(${url})`;
  };

  if (temp.includes('01')) {
    return season('./img/clear_sky.jpeg');  //개선필요
  }
  if (temp.includes('02')) {
    return season('./img/few_clouds.jpeg');  //개선필요
  }
  if (temp.includes('03')) {
    return season('./img/scattered_clouds2.jpeg');  //개선필요
  }
  if (temp.includes('04')) {
    return season('./img/broken_clouds.jpeg');  //개선필요
  }
  if (temp.includes('09')) {
    return season('./img/shower_rain.png');  //개선필요
  }
  if (temp.includes('10')) {
    return season('./img/rain.png');  //개선필요
  }
  if (temp.includes('11')) {
    return season('./img/thunder_storm.png');
  }
  if (temp.includes('13')) {
    return season('./img/snow.webp');
  }
  if (temp.includes('50')) {
    return season('./img/mist.png');
  }

  console.error(new Error(`${temp}, 배경을 불러오지 못했습니다.`));
}

//오늘의 코디 추천
function dailyClothes(data) {
  let clothes = document.querySelector(".item-button");
  //let currentTemp = data.main.temp;
  let currentTemp = 18;

  let winter = currentTemp <= 4;
  let earlyWinter = currentTemp >= 5 && currentTemp < 9;
  let beginWinter = currentTemp >= 9 && currentTemp < 12;
  let fall = currentTemp >= 12 && currentTemp < 17;
  let earlyFall = currentTemp >= 17 && currentTemp < 20;
  let earlySummer = currentTemp >= 20 && currentTemp < 23;
  let beginSummer = currentTemp >= 23 && currentTemp < 28;
  let summer = currentTemp >= 28;

  const winterArr = new Array('패딩','두꺼운 코트','목도리','기모의류');
  const earlyWinterArr = new Array('코트','가죽자켓','발열내의','니트','레깅스');
  const beginWinterArr = new Array('자켓','트렌치코트','야상','니트','청바지','스타킹');
  const fallArr = new Array('얇은 니트','맨투맨','가디건','청바지');
  const earlyFallArr = new Array('얇은 가디건','긴팔','면바지','청바지');
  const earlySummerArr = new Array('얇은 가디건','얇은 셔츠','반바지','면바지');
  const beginSummerArr = new Array('반팔','얇은 셔츠','반바지','면바지');
  const summerArr = new Array('민소매','반팔','반바지','면바지','원피스');  


  if (winter){
    clothes.innerHTML = `
    <button class="w-btn w-btn-indigo" type="button">
    ${winterArr[0]}
    </button>
    <button class="w-btn w-btn-green" type="button">
    ${winterArr[1]}
    </button>
    <button class="w-btn w-btn-green2" type="button">
    ${winterArr[2]}
    </button>
    <button class="w-btn w-btn-brown" type="button">
    ${winterArr[3]}
    </button>
    `;
  } 
  else if (earlyWinter){
    clothes.innerHTML = `
    <button class="w-btn w-btn-indigo" type="button">
    ${earlyWinterArr[0]}
    </button>
    <button class="w-btn w-btn-green" type="button">
    ${earlyWinterArr[1]}
    </button>
    <button class="w-btn w-btn-green2" type="button">
    ${earlyWinterArr[2]}
    </button>
    <button class="w-btn w-btn-brown" type="button">
    ${earlyWinterArr[3]}
    </button>
    <button class="w-btn w-btn-blue" type="button">
    ${earlyWinterArr[4]}
    </button>
    `;
  }
  else if (beginWinter){
    clothes.innerHTML = `
    <button class="w-btn w-btn-indigo" type="button">
    ${beginWinterArr[0]}
    </button>
    <button class="w-btn w-btn-green" type="button">
    ${beginWinterArr[1]}
    </button>
    <button class="w-btn w-btn-green2" type="button">
    ${beginWinterArr[2]}
    </button>
    <button class="w-btn w-btn-brown" type="button">
    ${beginWinterArr[3]}
    </button>
    <button class="w-btn w-btn-blue" type="button">
    ${beginWinterArr[4]}
    </button>
    <button class="w-btn w-btn-pink" type="button">
    ${beginWinterArr[5]}
    </button>
    `;
  }
  else if (fall){
    clothes.innerHTML = `
    <button class="w-btn w-btn-indigo" type="button">
    ${fallArr[0]}
    </button>
    <button class="w-btn w-btn-green" type="button">
    ${fallArr[1]}
    </button>
    <button class="w-btn w-btn-green2" type="button">
    ${fallArr[2]}
    </button>
    <button class="w-btn w-btn-brown" type="button">
    ${fallArr[3]}
    </button>
    `;

  }
  else if (earlyFall){
    clothes.innerHTML = `
    <button class="w-btn w-btn-indigo" type="button">
    ${earlyFallArr[0]}
    </button>
    <button class="w-btn w-btn-green" type="button">
    ${earlyFallArr[1]}
    </button>
    <button class="w-btn w-btn-green2" type="button">
    ${earlyFallArr[2]}
    </button>
    <button class="w-btn w-btn-brown" type="button">
    ${earlyFallArr[3]}
    </button>
    `;
  }
  else if (earlySummer){
    clothes.innerHTML = `
    <button class="w-btn w-btn-indigo" type="button">
    ${earlySummerArr[0]}
    </button>
    <button class="w-btn w-btn-green" type="button">
    ${earlySummerArr[1]}
    </button>
    <button class="w-btn w-btn-green2" type="button">
    ${earlySummerArr[2]}
    </button>
    <button class="w-btn w-btn-brown" type="button">
    ${earlySummerArr[3]}
    </button>
    `;
  }
  else if (beginSummer){
    clothes.innerHTML = `
    <button class="w-btn w-btn-indigo" type="button">
    ${beginSummerArr[0]}
    </button>
    <button class="w-btn w-btn-green" type="button">
    ${beginSummerArr[1]}
    </button>
    <button class="w-btn w-btn-green2" type="button">
    ${beginSummerArr[2]}
    </button>
    <button class="w-btn w-btn-brown" type="button">
    ${beginSummerArr[3]}
    </button>
    `;
  }
  else if (summer){
    clothes.innerHTML = `
    <button class="w-btn w-btn-indigo" type="button">
    ${summerArr[0]}
    </button>
    <button class="w-btn w-btn-green" type="button">
    ${summerArr[1]}
    </button>
    <button class="w-btn w-btn-green2" type="button">
    ${summerArr[2]}
    </button>
    <button class="w-btn w-btn-brown" type="button">
    ${summerArr[3]}
    </button>
    <button class="w-btn w-btn-blue" type="button">
    ${summerArr[4]}
    </button>
    `;
  }
}
