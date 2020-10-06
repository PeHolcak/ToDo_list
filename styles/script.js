window.addEventListener('load', function () {
let zobrazTlacitko = document.getElementsByClassName('zobrazitPoznamky');
let addTlacitko = document.getElementById('addButton');
let editTlacitko = document.getElementById('editButton');
let formular = document.getElementById('novyTask');
let editovaciFormular = document.getElementById('upravitTask');
let rozkliknutyUkol = document.getElementById('prohlizejTask');
let upravenyTitle = document.getElementById('upravenyNadpis');
let title = document.getElementById('title');
let description = document.getElementById('description');
let jsonBut= document.getElementById('jsonButton');
let logoutBut= document.getElementById('logoutButton');
let upravenydescription = document.getElementById('upravenyPopisek');
let shoveDoneCheckbox = document.getElementById('showDoneTasks');
let shoveActualCheckbox = document.getElementById('showActualTasks');
let poznamky = document.getElementsByClassName('zobrazitPoznamky');
let hotovePoznamky = document.getElementsByClassName('zobrazitHotovePoznamky');
let heslo =  document.getElementById('heslo');
let heslo2 =  document.getElementById('znovuHeslo');
let infoText =  document.getElementById('infoText');
let email =  document.getElementById('email');
let jmeno =  document.getElementById('jmeno');
let upravenyNadpis =  document.getElementById('upravenyNadpis');
let upravenyPopisek =  document.getElementById('upravenyPopisek');
let nadpis =  document.getElementById('nadpis');
let popisek =  document.getElementById('popisek');

if(addTlacitko!=null){
addTlacitko.addEventListener('click', function(){
    if(rozkliknutyUkol!=null)    
    rozkliknutyUkol.style.display ='none';
        formular.style.display ='block';
});
}

if(editTlacitko!=null){
editTlacitko.addEventListener('click', function(){
    editovaciFormular.style.display="block";
    upravenyTitle.value=title.textContent
    upravenydescription.value=description.textContent
})}
if(shoveActualCheckbox!=null){
shoveActualCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        Array.from(poznamky).forEach(element => element.style.display="block");
    
    } else {
        Array.from(poznamky).forEach(element => element.style.display="none");
    }
  })
}
if( shoveDoneCheckbox!=null){
  shoveDoneCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        Array.from(hotovePoznamky).forEach(element => element.style.display="block");
    
    } else {
        Array.from(hotovePoznamky).forEach(element => element.style.display="none");
    }
  })}
  if(jsonBut!=null){
    if (window.location.href.indexOf("json") > -1) {
        jsonButton.innerHTML="UI";
        jsonButton.href="/home";
    }else if(window.location.href.indexOf("home") > -1){
        jsonButton.innerHTML="JSON";
        jsonButton.href="json";
    }
    else{
        jsonButton.innerHTML="";
        jsonButton.href="/home";
        logoutBut.innerHTML=""
    }
}
if(infoText!=null){
if(heslo!=null){
    heslo.oninput= function(){
        if(heslo.value.length<8){
            infoText.innerHTML="heslo musí být dlouhé alespoň 8 znaků"
        }
        else{
            infoText.innerHTML=""
        }
    }
if(heslo2!=null){
    heslo2.oninput= function(){
        if(heslo.value!=heslo2.value){
            infoText.innerHTML="Hesla se neshodují"
        }
        else{
            infoText.innerHTML=""
        }
    }
}
if(email!=null){
    email.oninput= function(){
        if(email.value==""){
            infoText.innerHTML="políčko email nesmí být prázdné"
        }
        else{
            infoText.innerHTML=""
        }
    }
}
if(jmeno!=null){
    jmeno.oninput= function(){
        if(jmeno.value==""){
            infoText.innerHTML="políčko jmeno nesmí být prázdné"
        }
        else{
            infoText.innerHTML=""
        }
    }
}
}
if(upravenyNadpis!=null){
    upravenyNadpis.oninput= function(){
        if(upravenyNadpis.value==""){
            infoText.innerHTML="políčko nadpis nesmí být prázdné"
        }
        else{
            infoText.innerHTML=""
        }
    }
}
if(nadpis!=null){
    nadpis.oninput= function(){
        if(nadpis.value==""){
            infoText.innerHTML="políčko nadpis nesmí být prázdné"
        }
        else{
            infoText.innerHTML=""
        }
    }
}
if(upravenyPopisek!=null){
    upravenyPopisek.oninput= function(){
        if(upravenyPopisek.value==""){
            infoText.innerHTML="políčko popisku nesmí být prázdné"
        }
        else{
            infoText.innerHTML=""
        }
    }
}
if(popisek!=null){
    popisek.oninput= function(){
        if(popisek.value==""){
            infoText.innerHTML="políčko popisku nesmí být prázdné"
        }
        else{
            infoText.innerHTML=""
        }
    }
}
}
});
