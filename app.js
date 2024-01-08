let btn = document.querySelector("button");
let cards = document.querySelector(".cards");
let url = "http://universities.hipolabs.com/search?name=";
let url2 = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

btn.addEventListener("click", async () => {
    let colArr = await getData();
    showData(colArr);
})

async function showData(colArr){
    cards.innerHTML = ``;
    for (col of colArr){
        let imgLink = await getLink();
        let card = document.createElement("div");
        let imgCont = document.createElement("div");
        let cardCont = document.createElement("div");
        let a = document.createElement("a");
        let h3 = document.createElement("h3");
        let img = document.createElement("img");
        img.setAttribute("src", imgLink);
        h3.innerText = col.name;
        a.setAttribute("href", "https://"+col.domains[0]);
        a.setAttribute("target", "_blank");
        a.innerHTML = `visit page: <u>${col.domains[0]}</u>`;
        // console.log(col.domains[0]);
        card.classList.add("card");
        imgCont.classList.add("card-img");
        cardCont.classList.add("card-content");
        imgCont.appendChild(img);
        cardCont.appendChild(h3);
        cardCont.append(a);
        card.append(imgCont);
        card.append(cardCont);
        cards.append(card);
    }
}

async function getData(){
    let country = document.querySelector("input").value;
    if (country == ""){
        alert("please enter country");
        throw("Country is empty");
    }
    try {
        let res = await axios.get(url+country, {Headers: {Accept: "application/json"}});
        return res.data;
    }
    catch(e) {
        console.log("ERROR : ", e);
    }
}


async function getLink(){
    let imgId = Math.floor(Math.random() * 1000);
    try {
        let res = await axios.get(url2 + imgId, {Headers: {Accept: "application/json"}});
        let link = res.data.primaryImageSmall ;
        if (link == "") {
            return getLink();
        }
        else {
            return link;
        }
    }
    catch(e) {
        console.log("ERROR : ", e);
        return getLink();
    }
    // console.log(res)
}




