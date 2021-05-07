let curr_temp = $("#temp");
let img = $("#icon");
let desc = $("#desc");
let name = $("#name");
let country = $("#country");
let feels = $("#feel");
let curr_notes = $("#note");
let wind = $("#wind");
let pressure = $("#pressure");
let humidity = $("#humidity");
let forecast_wrapper = $(".scrolling-wrapper");
let month = new Array(12);
let popup = $("#popup-wrapper");
let time = $("#time");
// time.hide();
time.fadeOut(50);
//show time
$(".name").click(() => {
  $(".arrow").toggleClass("fa-angle-down fa-angle-up");
  // time.toggleClass("view hide");
  if ($(".arrow").hasClass("fa-angle-up")) time.fadeIn(400);
  if ($(".arrow").hasClass("fa-angle-down")) time.fadeOut(400);
});
// $(".section").fadeOut(400);
// $("#home").fadeIn(100);

// list.forEach((elements, index) => {
//   elements.addEventListener("click", function (event) {
//     let id = elements.dataset.id;
//     console.log(id);
//     $(".section").fadeOut(400);
//     $(`#${id}`).fadeIn(800);
//   });
// });

//create months array
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "Septempber";
month[9] = "October";
month[10] = "November";
month[11] = "December";
//show preloader
let preloader = $("#container");
// preloader.addClass("on");
//set theme
if (window.localStorage.theme == "light") {
  $("body").attr("class", "light");
  $("img.toggler").attr("src", "images/sun.svg");
  window.localStorage.theme = "light";
} else {
  $("body").attr("class", "dark");
  $("img.toggler").attr("src", "images/moon.svg");
  window.localStorage.theme = "dark";
}

$(document).ready(() => {
  // close popup
  $(".popup-content span").click(() => {
    popup.removeClass("show");
    location.reload();
  });

  // toggle dark/light theme
  $("img.toggler").on({
    click: function () {
      var src =
        $(this).attr("src") === "images/moon.svg" ? "images/sun.svg" : "images/moon.svg";
      $(this).fadeOut(300);
      setTimeout(() => $(this).attr("src", src), 310);
      $(this).fadeIn(300);

      if (src === "images/sun.svg") {
        $("body").attr("class", "light");
        window.localStorage.theme = "light";
      } else {
        $("body").attr("class", "dark");
        window.localStorage.theme = "dark";
      }
    },
  });
  let checkGPS = () => {
    let lng, lat;
    navigator.geolocation.getCurrentPosition((position) => {
      lng = position.coords.longitude;
      lat = position.coords.latitude;
      alert(lat);
      alert(lng);
      if (lng == null || lat == null) {
        // alert("GPS not activated!");
        let error = $("#err");
        error.html("Please enable the GPS.");
        popup.addClass("show");
      } else {
        popup.removeClass("show");
      }
    });
  };
  checkGPS();
  //get latitude and longitude
  function getLocation() {
    let uLat = 0,
      uLon = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        uLat = position.coords.latitude;
        uLon = position.coords.longitude;
        alert(uLat);
        alert(uLon);
        preloader.removeClass("on");
        popup.removeClass("show");

        // console.log(`${uLat}`, `${uLon}`);
        // if (uLat == 0 || uLon == 0) {
        // alert("GPS not activated!");
        //   let error = $("#err");
        //   error.html("Please enable the GPS.");
        //   popup.addClass("show");
        // } else {
        //   popup.removeClass("show");
        // }
        const settings = {
          async: true,
          crossDomain: true,
          url: `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${uLat},${uLon}&days=3`,
          method: "GET",
          headers: {
            "x-rapidapi-key": "55e00f5629msha9991ea81532a93p18a9e0jsnc0f29c202338",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          },
        };
        // API call
        $.ajax(settings).done(function (response) {
          console.log(response);
          preloader.fadeOut("slow");
          let info = response.current;
          let location = response.location;
          let state = location.region;
          let region = location.country;
          let localtime = location.localtime,
            txt = "AM";
          if (parseInt(localtime.substr(10, 3)) >= 12) txt = "PM";

          time.html(localtime.split(" ").join(", ") + " " + txt);
          let hour_time = localtime.substr(10, localtime.length);
          let humidity_val = info.humidity;
          let wind_val = info.wind_kph;
          let pressure_val = info.pressure_in;
          let note;
          let ctime = parseInt(hour_time.substr(0, 3));
          console.log(ctime);
          if (ctime > 5 && ctime < 12) note = "Morning";
          else if (ctime >= 12 && ctime < 17) note = "Afternoon";
          else if (ctime >= 17 && ctime < 20) note = "Evening";
          else note = "Night";
          curr_notes.html(note);
          let description = info.condition.text;
          let temp = info.temp_c;
          let icon = info.condition.icon;
          feels.html(parseInt(info.feelslike_c));
          country.html(`, ${region}`);
          name.html(state);
          desc.html(description);
          img.attr("src", icon);

          curr_temp.html(parseInt(temp));
          pressure.html(`${pressure_val}<span>inHg</span>`);
          humidity.html(`${humidity_val}<span>%</span>`);
          wind.html(`${wind_val}<span>kph</span>`);

          //forecast daily
          let sunrise = response.forecast.forecastday[0].astro.sunrise;
          let sunset = response.forecast.forecastday[0].astro.sunset;
          $("#sunrise-time").html(sunrise);
          $("#sunset-time").html(sunset);
          let forecast = response.forecast.forecastday[0].hour,
            meridian = "AM",
            forecastToday = [],
            tempToday = [],
            feelsLike = [];
          forecast.forEach((el, index) => {
            let dtime = el.time.substr(10, 3);
            parseInt(dtime) >= 12 ? (meridian = "PM") : (meridian = "AM");
            if (parseInt(dtime) === 0) {
              dtime = 12;
            }
            if (parseInt(dtime) > 12) {
              dtime -= 12;
            }
            forecastToday.push(parseInt(dtime) + " " + meridian.toLocaleLowerCase());
            tempToday.push(el.temp_c);
            feelsLike.push(el.feelslike_c);
            forecast_wrapper.append(`
            <div class="card" id=${index}>
            <p class="time-forecast">${parseInt(dtime)} ${meridian}</p>
              <img src="${el.condition.icon}">
              <p class="temp-forecast">${el.temp_c}°C</p>
            </div>
        `);
          });
          var ctx = document.getElementById("myChart");

          var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: "line",

            // The data for our dataset
            data: {
              labels: forecastToday,
              datasets: [
                {
                  label: "Temperature",
                  backgroundColor: "#3c41c67e",
                  borderColor: "#3c40c6",
                  data: tempToday,
                  pointRadius: 2,
                  pointHoverRadius: 5,
                },
                // {
                //   label: "Real Feel",
                //   backgroundColor: "#ef540070",
                //   borderColor: "#ef5200",
                //   data: feelsLike,
                // },
              ],
            },

            options: {
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    // gridLines: {
                    //   zeroLineColor: "transparent",
                    // },
                    ticks: {
                      fontColor: "#999",
                    },
                    scaleLabel: {
                      display: true,
                      // labelString: "Time",
                      fontColor: "#999",
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      display: false,
                    },
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Temperature (°C)",
                      fontColor: "#999",
                    },
                  },
                ],
              },
              animation: {
                easing: "easeInOutElastic",
                // easing: "easeInBounce",
                duration: 2000,
                tension: {
                  duration: 1000,
                  easing: "linear",
                  from: 1,
                  to: 0,
                  loop: true,
                },
              },
              legend: {
                display: false,
              },
            },
          });
          let forecastThree = response.forecast.forecastday;
          // console.log(forecastThree);
          forecastThree.forEach((e) => {
            let date = e.date;
            let dt = date.split(" ", 1);
            let today = dt[0].split("-").reverse().join("-");
            let day = parseInt(today.substr(0, 2));
            let index = parseInt(today.substr(3, 2));
            let mon = month[index - 1];
            let tempIcon = e.day.condition.icon;
            // alert(tempIcon);
            let tempMax = parseInt(e.day.maxtemp_c);
            let tempMin = parseInt(e.day.mintemp_c);
            // console.log(mon, day, tempMax, tempMin);
            $("#forecast").append(`
          <tr>
            <td class="date">${mon} ${day}</td>
            <td><img src="${tempIcon}" alt="" height="40" /></td>
            <td class="max">${tempMax}°C</td>
            <td class="min">${tempMin}°C</td>
          </tr>
        `);
          });

          window.location.href = `#${ctime}`;
          $(window).scrollTop(0);
        });
      });
      console.log(uLat);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  getLocation();
});
