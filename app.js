
const map = L.map('map').setView([0, 0], 13);
const Ip = document.getElementById("Ip-address")
const locator = document.getElementById("locator")
const Time = document.getElementById("Timezone")
const Isp = document.getElementById("isp")

const form = document.getElementById('caller')

form.addEventListener('submit', loadData)

function loadData(e){
    let input = form.querySelector('input[type="text"]').value

    console.log(input)
    const xhr = new XMLHttpRequest()

    // xhr.open('GET', `https://geo.ipify.org/api/v2/country,city?apiKey=at_2WdB5SncZoHfeUSffFXYGJhKaSlX8&ipAddress=${input}`, true)

    xhr.onload = function(){
        if(this.status === 200){
          const response = JSON.parse(this.responseText)
          Ip.innerHTML = response.ip

          locator.innerHTML = `${response.location.region}, ${response.location.city}`

          Time.innerHTML = response.location.timezone
          Isp.innerHTML = response.isp
           
          const latitude = response.location.lat
          const longitude = response.location.lng
          console.log(latitude)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([latitude, longitude]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
        }

    }

    xhr.send()
    e.preventDefault()
    form.querySelector('input[type="text"]').value = ''

}
       
window.addEventListener('DOMContentLoaded', getUser)

function getUser() {
    fetch('https://api.ipify.org/?format=json')
   .then(response => response.json())
    .then(data => { 
        let User = data.ip

        const xml = new XMLHttpRequest()

        // xml.open('GET', `https://geo.ipify.org/api/v2/country,city?apiKey=at_2WdB5SncZoHfeUSffFXYGJhKaSlX8&ipAddress=${User}`, true)
    
        xml.onload = function(){
            if(this.status === 200){
              const response = JSON.parse(this.responseText)
              Ip.innerHTML = response.ip
    
              locator.innerHTML = `${response.location.region}, ${response.location.city}`
    
              Time.innerHTML = response.location.timezone
              Isp.innerHTML = response.isp
               
              const latitude = response.location.lat
              const longitude = response.location.lng
              console.log(latitude)
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
            }
    
        }
    
        // xml.send()
        

    })

}