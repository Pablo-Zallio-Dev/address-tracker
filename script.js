const d = document,
  $ipAddres = d.querySelector(".data__info--ip"),
  $address = d.querySelector(".data__info--address"),
  $time = d.querySelector(".data__info--time"),
  $isp = d.querySelector(".data__info--isp"),
  $headerInputValue = d.querySelector(".header__input"),
  $headerBtn = d.querySelector(".header__btn");

var map = L.map("map").setView([51.505, -0.09], 11);

L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var marker = null;

let dirIP = $headerInputValue.value;
dataIp(dirIP);

d.addEventListener("click", (e) => {
  if (
    e.target.matches(".header__btn") ||
    e.target.matches(".header__btn img")
  ) {
    if ($headerInputValue.value === "") {
    } else {
      console.log($headerInputValue.value);

      let dirIP = $headerInputValue.value;
      dataIp(dirIP);
    }
  }
});

d.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if ($headerInputValue.value === "") {
    } else {
      console.log("Numero");
      e.preventDefault();
      let dirIP = $headerInputValue.value;
      dataIp(dirIP);
    }
  }
});

async function dataIp(numberIp) {
  try {
    let res = await fetch(
        `https://api.ipdata.co/${numberIp}?api-key=2b382e406c68770de8b49c0d80fa05f4186b97943564d93d2fd05976`
      ),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    $ipAddres.textContent = json.ip;
    $address.textContent = `${json.city}, ${json.region}, ${json.country_name}`;
    $time.textContent = `${json.time_zone.abbr}, ${json.time_zone.offset}`;
    $isp.textContent = `${json.asn.asn}, ${json.asn.name}`;

    map.flyTo([json.latitude, json.longitude]);
    if (marker !== null) {
      map.removeLayer(marker);
    }
    marker = L.marker([json.latitude, json.longitude]);
    marker.addTo(map);
  } catch (err) {
    console.log(err);
    let msg = err.statusText || "Ha ocurrido un error";
    console.log(msg);
    $ipAddres.textContent = "Direccion IP Incorrecta";
    $address.textContent = `${msg}`;
    $time.textContent = `${msg} `;
    $isp.textContent = `${msg} `;
  }
}
