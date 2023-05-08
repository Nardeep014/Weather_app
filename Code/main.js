
const apiKey = "d14b802f19f5f929d5d60fd290bf5922";
const apiURL = "http://localhost/NaraRaj_Bhurtel%20_2332963_Second_Prototype/Code/index.php?&units=metric&q=El Paso"
const apiURL1 = "http://localhost/NaraRaj_Bhurtel%20_2332963_Second_Prototype/Code/index.php?&units=metric&q=";

const searchBox = document.querySelector(".search-city input");
const searchBtn = document.querySelector(".search-city button");

const weatherIcon = document.querySelector(".weather-icon");



async function checkWeather(){
    const response = await fetch(apiURL + `&appid=${apiKey}`);
    var data = await response.json();


    const options = { month: 'short', day: 'numeric', year: 'numeric' };


    document.querySelector(".weather-condition").innerHTML = data.weather[0].main;
    document.querySelector(".city").innerHTML = data.name+ ","+ data.sys.country;
    document.querySelector(".temp").innerHTML = data.main.temp+ "&#176C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".pressure").innerHTML = data.main.pressure+ " "+ "hpa";
    document.querySelector(".date").innerHTML = new Date().toLocaleDateString('en-US', options);
    document.querySelector(".wind").innerHTML = data.wind.speed+"km/hr";


    if (data.weather[0].main=="Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if (data.weather[0].main=="Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main=="Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if (data.weather[0].main=="Drizzle"){
        weatherIcon.src ="images/drizzle.png";
    }
    else if (data.weather[0].main=="Mist"){
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").getElementsByClassName.display = "block";
}

async function checkWeather1(city){
    const response = await fetch(apiURL1 + city + `&appid=${apiKey}`);
    var data = await response.json();

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
 
    console.log(data);

    document.querySelector(".weather-condition").innerHTML = data.weather[0].main;
    document.querySelector(".city").innerHTML = data.name + ","+ data.sys.country;
    document.querySelector(".temp").innerHTML = data.main.temp+ "&#176C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".pressure").innerHTML = data.main.pressure+ " "+ "hpa";
    document.querySelector(".date").innerHTML = new Date().toLocaleDateString('en-US', options);
    document.querySelector(".wind").innerHTML = data.wind.speed+"km/hr";


    if (data.weather[0].main=="Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if (data.weather[0].main=="Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main=="Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if (data.weather[0].main=="Drizzle"){
        weatherIcon.src ="images/drizzle.png";
    }
    else if (data.weather[0].main=="Mist"){
        weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    }


    
}
var input = document.querySelector('input');
input.addEventListener('keyup', (e)=>{
if(e.keyCode===13){
    checkWeather1(searchBox.value);
}

});
searchBtn.addEventListener("click", ()=>{
checkWeather1(searchBox.value); 
});
checkWeather();
