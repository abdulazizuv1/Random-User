const body = document.querySelector("body")
const mode = document.querySelector(".mode")
const boxes = document.querySelector(".boxes")
const input = document.querySelector("input")
const refresh = document.querySelector(".refresh")
const clear = document.querySelector(".clear")
const main_modal = document.querySelector(".main_modal")
var api_link = "https://randomuser.me/api/?results=9"

const savedMode = localStorage.getItem("mode");

if (savedMode) {
    body.classList.add(savedMode);
}


mode.addEventListener("click", ()=>{
    body.classList.toggle("active")
    const isActive = body.classList.contains("active");
    localStorage.setItem("mode", isActive ? "active" : "");
})

const getData = async (link)=>{
    const req = await fetch(link)
    const data = await req.json()
    writeData(data.results)
}

getData(api_link)

const writeData = (data)=>{
    boxes.innerHTML = ""
    data.forEach((item) => {
        boxes.innerHTML +=`
        <div class="box">
                <div class="trash">
                    <i class="fa-solid fa-trash trashBtn"></i>
                </div>
                <img src="${item.picture.large}" alt="">
                <p class="name"><i class="fa-solid fa-address-card"></i> - ${item.name.title} ${item.name.first} ${item.name.last}</p>
                <p><i class="fa-solid fa-cake-candles"></i> - ${item.dob.age} years old</p>
                <p><i class="fa-solid fa-location-dot"></i> - ${item.location.city}, ${item.location.country}</p>
                <p><i class="fa-solid fa-person"></i> - ${item.gender}</p>
            </div>
        `
    });
}
input.addEventListener("input", ()=>{
    const cards = document.querySelectorAll(".box")
    cards.forEach((item)=>{
        var name = item.querySelector(".name").textContent.toLowerCase()
        var inputValue = input.value.toLowerCase().trim().replaceAll(" ", "")
        if(!name.includes(inputValue)){
            item.classList.add("hidden")
        }else{
            item.classList.remove("hidden")
        }
    })
})

clear.addEventListener("click", ()=>{
    boxes.innerHTML = ""
})

refresh.addEventListener("click", ()=>{
    main_modal.style = "display: flex;"
    writeData()
    main_modal.style = "display: none;"

})

document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("trashBtn")){
        e.target.parentElement.parentElement.remove()
    }
})
