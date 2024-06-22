let cities = [
  {
    arabicName: "القاهرة",
    iso: "C"
  },
  {
    arabicName: "طنطا",
    iso: "GH"
  },
  {
    arabicName: "الاسكندرية",
    iso: "ALX"
  }
];

for (let city of cities) {
  let content = `
    <option >${city.arabicName}</option>
    `;
  document.getElementById("cities-selected").innerHTML += content;
}

document
  .getElementById("cities-selected")
  .addEventListener("change", function () {
    document.getElementById("the-city").innerHTML = this.value;
    let cityName = "";
    for (let city of cities) {
      if (city.arabicName == this.value) {
        cityName = city.iso;
      }
    }
    timingsOfCity(cityName);
  });

function timingsOfCity(cityName) {
  let params = {
    country: "EG",
    city: cityName
  };
  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: params
    })
    .then(function (response) {
      let timings = response.data.data.timings;
      fillTime("Fajr", timings.Fajr);
      fillTime("Sunrise", timings.Sunrise);
      fillTime("Dhuhr", timings.Dhuhr);
      fillTime("Asr", timings.Asr);
      fillTime("Maghrib", timings.Maghrib);
      fillTime("Isha", timings.Isha);

      const readableDate = response.data.data.date.readable;
      const weekday = response.data.data.date.hijri.weekday.ar;
      document.getElementById("readable-date").innerHTML =
        weekday + " " + readableDate;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fillTime(id, time) {
  document.getElementById(id).innerHTML = time;
}

timingsOfCity("C");
