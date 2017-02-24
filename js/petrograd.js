window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    //læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
}


function visProduktListe(listen) {
    console.table (listen);
    listen.forEach(visProdukt);
}

function visProdukt(produkt) {
    console.log(produkt);
    // klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil( produkt.pris * (1-(produkt.rabatsats/100)));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;
    console.log(rabatpris)

    klon.querySelector(".data_billede").src = "/imgs/small/" + produkt.billede + "-sm.jpg";

    klon.querySelector('button').dataset.id = produkt.id;
    klon.querySelector('button').addEventListener('click', knapKlikketPå)


   if(produkt.udsolgt == false) {
        //produktet er ikke udsolgt
        //udsolgttekst skal fjernes
    var udsolgttekst = klon.querySelector(".udsolgttekst");
    udsolgttekst.parentNode.removeChild( udsolgttekst );
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");

    }
    if(produkt.udsolgt == true || produkt.rabatsats == 0){
        //der er ikke rabat, rabat-prisen skal fjernes
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else{
        klon.querySelector(".pris").classList.add("rabat");
    }

        // append klon til .produkt_liste

    document.querySelector("." + produkt.kategori).appendChild(klon);
    //Linjen ovenfor er ens med de 10 linjer nedenfor:
    /*if(produkt.kategori=='forretter'){
        document.querySelector(".forretter").appendChild(klon);
    } else if(produkt.kategori=='hovedretter'){
        document.querySelector(".hovedretter").appendChild(klon);
    } else if(produkt.kategori=='desserter'){
        document.querySelector(".desserter").appendChild(klon);
    } else if(produkt.kategori=='sideorders'){
        document.querySelector(".sideorders").appendChild(klon);
    } else if(produkt.kategori=='drikkevarer'){
        document.querySelector(".drikkevarer").appendChild(klon);
    } */

}

//(e) = oplysninger om eventet
function knapKlikketPå(oplysningerOmEventet){

    var produktId = oplysningerOmEventet.target.dataset.id;

    //send forespørgsel til http://petlatkea.dk/2017/dui/api/product?callback=?&id=21
    //med det rigtige id
   $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?&id="+produktId, visModalIndhold);
}

function visModalIndhold(mereInfo){
    console.log(mereInfo);

    document.querySelector('#myModalLabel').textContent=mereInfo.navn;
    document.querySelector('#myModal .modal-body p').textContent=mereInfo.langbeskrivelse;
}















