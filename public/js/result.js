let time = $("#time");
let curr_notes = $("#note");
let forecast_wrapper = $(".scrolling-wrapper");
let month = new Array(12);
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
time.fadeOut(50);
$(".name").click(() => {
  $(".arrow").toggleClass("fa-angle-down fa-angle-up");
  // time.toggleClass("view hide");
  if ($(".arrow").hasClass("fa-angle-up")) time.fadeIn(400);
  if ($(".arrow").hasClass("fa-angle-down")) time.fadeOut(400);
});
let note;
let localtime = time.html();
let hour_time = localtime.substr(10, localtime.length);
let ctime = parseInt(hour_time.substr(0, 3));
if (ctime > 5 && ctime < 12) note = "Morning";
else if (ctime > 12 && ctime < 5) note = "Afternoon";
else if (ctime >= 5 && ctime < 8) note = "Evening";
else note = "Night";
curr_notes.html(note);

let meridian = "AM",
  forecastToday = [],
  tempToday = [],
  feelsLike = [];
fore.forEach((el, index) => {
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
