//---------------------------infolo.js-------------------------------------
var FrFor11='', OpusCollect='';
//------Выбор категории----------------------------------------------------
function Category(Punct) {
  Info('Выбор категории');
  var mnuA = document.getElementById('menuA');
  mnuA.textContent=Punct;
  var mnuA0 = document.getElementById('menuA0');
  mnuA0.style.visibility='hidden';
  FltrCtgr('cd',Punct);
  Info('Выбор категории: Сработало');
}//
//------Фильтр категорий---------------------------------------------------
function FltrCtgr(Frm,Prefix){
  Info('Фильтр категорий');
  if(Frm.length===2){var FrAdd =Frm[1];Frm=Frm[0];}
  var FrX = document.getElementById('Fr' + Frm.toUpperCase());
  if(!FrX){alert('не обнаружен фрейм' + 'Fr' + Frm.toUpperCase());return;}
  var ElsX = FrX.getElementsByTagName("h1");
  var Sz = ElsX.length;
  for(var i = 0; i < Sz; i++){
    var IdH = ElsX[i].getAttribute("id");
    var ElZ=document.getElementById(IdH+'00');
    if(ElsX[i].dataset.ctgr===Prefix){
      ElsX[i].style.display='';
      if(ElZ){ElZ.style.display='';}
    }else{
      ElsX[i].style.display='none';
      if(ElZ){ElZ.style.display='none';}
     }
  }//for
  if(FrAdd){FltrCtgr(FrAdd,Prefix);}
  Info('Фильтр категорий: Сработало');
}//
//===     
//------Фильтр коллекции по классу-----------------------------------------
function FltrClas(Frm,Qery) {
  Info('Фильтр коллекции по классу');
  var Type=Qery.substring(0,1);
  var Offs=+Qery.substring(1,3);
  var Leng=+Qery.substring(3,4);
  var Prm=Qery.substring(5);
  var FrX = document.getElementById('Fr' + Frm.toUpperCase());
  if(!FrX){ alert('не обнаружен фрейм' + 'Fr' + Frm.toUpperCase());return;}
  var ElsX = FrX.getElementsByTagName("*");
  var Sz = ElsX.length;
  if(Prm.length>0){
    for (var i = 0; i < Sz; i++) {
      if(ElsX[i].dataset.rec){
        var nn=+Offs+Leng;
        ElsX[i].style.display='none';
        ElsX[i].parentElement.style.display='none';
      }
    }
  }else{
    for (var i = 0; i < Sz; i++) {ElsX[i].style.display='';}
  }
  for (var i = 0; i < Sz; i++) {
    if(ElsX[i].dataset.rec){
      var nn=+Offs+Leng;
      var Sstr=ElsX[i].dataset.rec.substring(Offs,nn);
      if(Sstr===Prm&&ElsX[i].dataset.rec[0]===Type){
        ElsX[i].style.display='';
        ElsX[i].parentElement.style.display='';
        ElsX[i].parentElement.parentElement.style.display='';
//ElsX[i].parentElement.parentElement.parentElement.style.display='';
      }else{
        if(Sstr===Prm.substring(0,Sstr.length)&&ElsX[i].dataset.rec[0]===Type){
          ElsX[i].style.display='';
          ElsX[i].parentElement.style.display='';
          ElsX[i].parentElement.parentElement.style.display='';
//ElsX[i].parentElement.parentElement.parentElement.style.display='';
        }
      }
    }
  }//for
  Info('Фильтр коллекции по классу: Сработало');
}//
//===     
//------Фильтр опуса по коллекции------------------------------------------
function FltrOpus(Frm,Prefix,Qery) {
  Info('Фильтр опуса по коллекции');
  if(document.getElementById(Prefix+'books')){
    Info('Прежняя коллекция');
    if(Qery){FltrClas(Frm,Qery);}
    return;
  }
  if(this.Fr11){var Frm11 = this.Fr11;} 
  else{ alert('Fr11Loaded:не обнаружен iфрейм: Fr11'); return;}
  var FrX = document.getElementById('Box' + Frm.toUpperCase());
  if(!FrX) 
    {alert('FltrOpus:не обнаружен бокс:'+'Box'+Frm.toUpperCase());return;}
  if(FrFor11!==Frm.toUpperCase()) {FrFor11=Frm.toUpperCase();}
  LoadList = '$';
  Frm11.location = Prefix+'//'+Prefix+'.html';
  Info('Фильтр опуса по коллекции: Сработало');
}//
//===     Загрузка
//------Загрузка коллекции опусов------------------------------------------
function LoadInf(Frm,IdrPre,IdrPst) {
  Info('Загрузка коллекции');
  if(document.getElementById(Prefix+'books'))
    {Info('LoadInf:та же коллекция'); return;} 
  var FrTo = document.getElementById('Fr' + Frm.toUpperCase());
  if(!FrTo){alert('LoadInf:не обнаружен фрейм: Fr'+Frm); return;}
  if (!this.Fr00){alert('LoadInf:не обнаружен iфрейм: Fr00'+Frm); return;}
  OpusCollect=Idr;
  LoadList = Frm.toUpperCase();
  FrTo.location = IdrPre+'//'+IdrPre+IdrPst+'.html';
  Info('Загрузка коллекции: Загрузка');
}//
//------загрузка документа во фрейм и перегрузка в соответствующий бокс---
function Fr11Loaded() {
  Info('Загрузка во фрейм');
  if(FrFor11.length===0){return;}
  if(this.Fr11){ var Frm11 = this.Fr11; } 
  else{ alert('Fr11Loaded:не обнаружен iфрейм: Fr11'); return; }
  var BoxXX = document.getElementById('Box' + FrFor11);
  if(!BoxXX){ alert('FltrOpus:не обнаружен бокс:'+'Box'+FrFor11);return;}
  var Body11 = Frm11.document.body;
  if(!Body11){alert('Fr11Loaded:не доступно Fr11.document.body');return;}
  BoxXX.innerHTML = Body11.innerHTML;
  Info('Загрузка во фрейм: Сработало');
}//
//---------------------------infolo.js-------------------------------------