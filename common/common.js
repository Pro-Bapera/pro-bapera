//---------------------------Common.js-------------------------------------
var LoadList='#'; AddList=''; FileList='';
var FrmForLoad1='';LoadFile1=''; FrmForLoad2='';LoadFile2='';
var MarkIdr=0; BdIdr=0; WinOpenUrl=''; WinList=0; WinBiblo=null;
var LinkOff=0; NotLoad='';
//------информирующее сообщение--------------------------------------------
function Info(Txt){
  var InfId = window.top.document.getElementById('InfoBox');
  if (InfId) {InfId.textContent = Txt; InfId.style.visibility = 'visible';}
}//
//------информирующее сообщение--------------------------------------------
function Msg(Txt0,Txt1,Txt2){
  var InfId = window.top.document.getElementById('MsgBox');
  if (InfId) {
    if(!Txt1){Txt1='';} if(!Txt2){Txt2='';}
    window.top.document.getElementById('Msg0').textContent=Txt0;
    window.top.document.getElementById('Msg1').textContent=Txt1;
    window.top.document.getElementById('Msg2').textContent=Txt2;
    InfId.style.visibility = 'visible';
  }
}//
//------информирующее сообщение--------------------------------------------
function MsgClose(){
  var InfId = window.top.document.getElementById('MsgBox');
  if (InfId) {InfId.style.visibility='hidden';}
}//
//------Визуализация iframe------------------------------------------------
function Fr00Visi() {
  Info('Визуализация iframe для ie недоделана');
  var Frm0 = window.frames.fr00i;
  if(!Frm0){alert('не обнаружен iфрейм: Fr00');return;}
}//
//------Бипереключатель флажка опции (до смены страницы)-------------------
function BiSwitch(Num) {//не задействован
  var SwId = document.getElementById('Sw' + Num);
  if(SwId){//галочка и х-крестик
    if(SwId.textContent==='\u2714'){SwId.textContent='\u2716';}
    else{SwId.textContent='\u2714';}
  }
}//
//===     Загрузка
//------Стартовая загрузка------------------------------------------------
function LoadBegin(ListLoad) {
  window.addEventListener("message", ONmsg);
  var Frm0=window.frames.fr00i; if(!Frm0){alert('нет iфрейма: Fr00');return;}
  var Config = document.getElementById('Config');
  if (Config){LoadList=Config.dataset.loadlist;Fr00Loaded();}
  Info('Начало загрузки фреймов');
}//
//------Загрузить Во Бокс-Фрейм--------------------------------------------
function Load1Frame(FileLoc,Frame) {
  var Frm0=window.frames.fr00i; if(!Frm0){alert('нет iфрейма: Fr00');return;}
  var WinLoc=Frm0.location; //ie
  if(!WinLoc){WinLoc=Frm0.contentWindow.WinCont.location;}
  if(!WinLoc){alert('URL не прописывается в iframe');return;}
  if(FileLoc.length===0){FileLoc=prompt('Адрес страницы');}
  if(Frame.length===0){Frame=prompt('Символ фрейма');}
  LoadList=Frame[0];
  NotLoad='';
  WinLoc.href=FileLoc.toLowerCase();
}//
//------Загрузить Во Бокс-Фрейм--------------------------------------------
function LoadFrame(File,Frame) {
  LoadList='#'+Frame[0]; FileList=File+'.html;';
  NotLoad='';
  Fr00Loaded();
  var Frm = document.getElementById('Fr'+Frame[0]);
  if(Frm){Frm.style.visibility='visible';}
  if(Frame.length>1){
    var FrmX = document.getElementById('Fr'+Frame[1]);
    if(FrmX){FrmX.innerHTML ='';}
  }
}//
//------переЗагрузить контекстный навигатор коллекции----------------------
function ReLoadBiFrames(Frms) {
  var Fr1='X';var Fr2='Y';
  if(Frms){Fr1=Frms[0];Fr2=Frms[1];}
  var BoxCfg = window.top.document.getElementById('Config');
  if(BoxCfg){
    var Fl = BoxCfg.dataset['load'+Fr1.toLowerCase()];
    if(Fl){FileList = Fl+';';}
    var F2 = BoxCfg.dataset['load'+Fr2.toLowerCase()];
    if(F2){FileList += F2+';';}
  LoadList='#'+Fr1+Fr2; //+'#'
  NotLoad='';
  Fr00Loaded();
  var Fr1 = document.getElementById('Fr'+Fr1);
  if(Fr1){Fr1.style.visibility='visible';}
  var Fr2 = document.getElementById('Fr'+Fr2);
  if(Fr2){Fr2.style.visibility='visible';}
  }
}//
//------Загрузить Во Help-Фрейм--------------------------------------------
function LoadHelp(File,HelpFr) {
  var HelpFr1='R'; var HelpFr2='S';
  if(HelpFr){HelpFr1=HelpFr[0];HelpFr2=HelpFr[1];}
  LoadList='#'+HelpFr1+HelpFr2; //+'#'
  FileList=File+HelpFr1.toLowerCase()+'.html;'+File+HelpFr2.toLowerCase()+'.html;';
  NotLoad='';
  Fr00Loaded();
  var FrR = document.getElementById('Fr'+HelpFr1);
  if(FrR){FrR.style.visibility='visible';}
  var FrS = document.getElementById('Fr'+HelpFr2);
  if(FrS){FrS.style.visibility='visible';}
}//
//===           Загрузка
//------Загрузка коллекции опусов------------------------------------------
function LoadInf(Frm,IdrFldr,IdrFile) {
  var Frm0=window.frames.fr00i; if(!Frm0){alert('нет iфрейма: Fr00');return;}
  //Info('Загрузка коллекции');
  //if(document.getElementById(IdrFile))
  //{Info('LoadInf:та же коллекция'); return;} 
  var FrTo = document.getElementById('Fr' + Frm.toUpperCase());
  if(!FrTo){alert('LoadInf:не обнаружен фрейм: Fr'+Frm); return;}
  //OpusCollect=IdrPst;
  LoadList = Frm.toUpperCase();
  var LoadName ='../'+IdrFldr+'/'+IdrFile+'.html'; 
//  LoadName = UrlTest(LoadName);
//  if(LoadName[0]==='#'){Info('не обнаружен:'+LoadName);return;}
  var WinLoc=Frm0.location; //ie .hostname .pathname
  if(!WinLoc){
    var WinCont=Frm0.contentWindow;
    if(!WinCont){Info('URL не прописывается в iframe');}
    else{var WinLoc=WinCont.location;}//не ie
  }
  NotLoad='';
  WinLoc.href=LoadName.toLowerCase();
  if(WinList!==0){
  var Win_List=window.open(LoadName,'list','scrollbars=yes,resizable=yes');
  if(Win_List===null){alert('плавающие окна заблокированы браузером');}
  else{Win_List.focus();}
  }
  //Info('Загрузка коллекции: Загрузка');
}//
//===     Загрузка
//------загрузка документа во фрейм и перегрузка в соответствующий бокс----
function Fr00Loaded() {
  var Frm0=window.frames.fr00i; if(!Frm0){alert('нет iфрейма: Fr00');return;}
  if (LoadList.length < 1) {Info(NotLoad);return;}
  var First = LoadList.substring(0, 1);
  LoadList = LoadList.substring(1);
  if (First !== '#') {//перегрузка содержимого
    if(First==='0'){HdrColapse('d');} //при загрузке страницы
    var FrDst='Fr' + First;
    if(First==='$'){FrDst=FrmForLoad1;}
    if(First==='₤'){FrDst=FrmForLoad2;}
    var BodyDoc=Frm0.document; if(!BodyDoc){BodyDoc=Frm0.contentDocument;}
    if(BodyDoc){var Body00 = BodyDoc.body;}
    if (Body00) {
      var BoxXX = window.top.document.getElementById(FrDst);
      if (BoxXX) {
        if(Body00.innerText.substring(0,50).search('Not Found')>=0||Body00.innerText.substring(0,2000).search('Ошибка')>=0){
          if(First==='F'||First==='H'||First==='I'||First==='O'||First==='P'||First==='Q'){}
          else{NotLoad+='#'+FrDst;}
        }
        else{//для IIS
          BoxXX.innerHTML = Body00.innerHTML;
          Body00.innerText='OK!';
          Info('Фрейм '+FrDst+' заполнен');
        }
      }
    }
  }
  var Next = LoadList.substring(0, 1);
  var FileLoc = '../general/blank.html';
  var BoxCfg = window.top.document.getElementById('Config');
  if(BoxCfg){
    var Fl = BoxCfg.dataset['load'+Next.toLowerCase()];
    if(Fl){FileLoc = Fl;}
  }
  if(FileList.length>0){
    var Fn1=FileList.search(/;/);
    if (Fn1 !== -1) {
      FileLoc=FileList.substring(0,Fn1);
      FileList=FileList.substring(Fn1+1);
    }
  }
  if(Next==='$'){FileLoc=LoadFile1;}
  if(Next==='₤'){FileLoc=LoadFile2;}
  var WinLoc=Frm0.location; //ie .hostname .pathname
  if(!WinLoc){
    var WinCont=Frm0.contentWindow;
    if(!WinCont){Info('URL не прописывается в iframe');}
    else{var WinLoc=WinCont.location;}//не ie
  }
  Info('Фрейм '+Next+' запрошен');
  WinLoc.href=FileLoc.toLowerCase();
  if(First==='F'){HdrColapse('f');}
}//
//===     Структура оглавления
//------Схлопывание-расхлопывание всех оглавлений--------------------------
function HdrColapse(Frm) {
  var FlagHdr="";var SmblFrom="\u25E5";var SmblTo="\u25E5"; 
  var Elm = document.getElementById('ColapseHdr_'+Frm.toLowerCase());
  if(!Elm){return;}
  var SubElm = Elm.firstChild;
  var Sz = window.top.document.all.length;
  if (SubElm.textContent === "\u25E4"){
    SubElm.textContent = "\u25E3"; SmblTo = "\u25E2";
  }else{
    SubElm.textContent = "\u25E4"; SmblFrom ="\u25E2"; FlagHdr = "none";
  }
//  var eScan = Elm.getElementsByTagName("div");
//  for (var i = 0; i < eScan.length; i++) {eScan[i]}
  var Region=window.top.document;
  for(var i = 0; i < Sz; i++){if(Region.all[i]){
      if(Region.all[i].id[0]===Frm){if(Region.all[i].id !== Frm+"H00"){
          if(Region.all[i].className === "h")
            {Region.all[i].style.display = FlagHdr;}
          if(Region.all[i].id[1] === "N"){
            if(Region.all[i].textContent === SmblFrom)
              {Region.all[i].textContent = SmblTo;}
          }
      } }
  } }
}//
//------Схлопывание-расхлопывание оглавления-------------------------------
function Hdr(Frm,Idr) {
  var Elm = document.getElementById(Frm+"N" + Idr);
  var SubElm = document.getElementById(Frm+"H" + Idr + "00");
  if (SubElm) {
    if (Elm.textContent === "\u25E2") {
      SubElm.style.display = "none";
      Elm.textContent = "\u25E5";
    }else{
      Elm.textContent = "\u25E2";
      SubElm.style.display = "";
    }
    if(SubElm.children[0]){
      if(SubElm.children[0].innerHTML.length===0){
        var ElB = document.getElementById(Frm+"H" + Idr + "0100");
        if(ElB){ElB.style.display = "";}
      }
    }
  }
}//
//===     Структура оглавления
//------По оглавлению на его заглавие
function Hdr2Txt(Frm, Idr) {
  var Fr0=Frm[0];
  var FrDst=document.getElementById("Fr" + Fr0.toUpperCase());
  var Elm = document.getElementById(Fr0 + "U" + Idr);
  if (Elm) { 
    if(FrDst){FrDst.style.visibility='visible';}
    var EndFrm = document.getElementById("End" + Fr0.toUpperCase());
    var PaElm = Elm.parentElement;
    if(PaElm){
      if(PaElm.style.display==='none'){
        PaElm.style.display='';
        if(EndFrm){EndFrm.focus();}
        Elm.focus();
        PaElm.style.display='none';
      }
      else{if (EndFrm){EndFrm.focus();} Elm.focus();}
    }else{Elm.focus();}
  }
  if(Frm.length>1){Hdr2Txt(Frm.substring(1), Idr);}
}//
//------По заглавию на его оглавление
function Txt2Hdr(Frm, Idr) {
  var IdFrm = document.getElementById('Fr' + Frm.toUpperCase());
  if (IdFrm){IdFrm.style.visibility='visible';}
  var EndFrm = document.getElementById("End" + Frm.toUpperCase());
  if (EndFrm) { EndFrm.focus(); }
  var Elm = document.getElementById(Frm + "T" + Idr);
  if (Elm) {
    var Elm0 = Elm;
    for(var i = 0; i < 9; i++){
      if(Elm0){Elm0.style.display = "";}else{break;}
      Elm0 = Elm0.parentElement;
    }
    Elm.focus();
  }
}//
//===     Расширение-сужение Бокс-Фреймов
//------Переразмеривание колонки Бокс-Фреймов------------------------------
function FrameWide(Fr1, Fr2, Top1, Top2) {
  var W1 = document.getElementById('Wider' + Fr1);
  var W2 = document.getElementById('Wider' + Fr2);
  var Frm1 = document.getElementById('Fr' + Fr1);
  var Frm2 = document.getElementById('Fr' + Fr2);
  Frm2.style.visibility = 'visible';
  var Midl = (1*Top1+1*Top2)/200*(Frm1.clientHeight+Frm2.clientHeight)+10;
  if(Frm1.clientTop<10){var Front= Frm1.clientHeight;}
  else{var Front= Frm2.clientHeight;}
  if(Midl<Front){
    W1.firstChild.textContent = "\u2180";
    W2.firstChild.textContent = "\u2182";
    W2.style.top = Top1 + '%';
    Frm1.style.height = (Top1-1.1) + '%';
    Frm2.style.top = Top1 + '%';
    Frm2.style.height = (95.9-Top1) + '%';
  }else{
    W1.firstChild.textContent = "\u2182";
    W2.firstChild.textContent = "\u2180";
    W2.style.top = Top2 + '%';
    Frm1.style.height = (Top2-1.1) + '%';
    Frm2.style.top = Top2 + '%';
    Frm2.style.height = (95.9-Top2) + '%';
  }
}//
//------Переразмеривание строки Бокс-Фреймов-------------------------------
function FrameRsz(Frm) {
  if(Frm==='F'){Info('Горизонтальное переразмеривание Ещё не сделано');}
  else{Info('Горизонтальное переразмеривание Ещё не сделано');}
}//
//------Горизонтальное переразмеривание------------------------------------
function FrameRzs(Frm) {
  
}//
//===     Видимость-светлость соотносимого
//------Сделать видимыми НаФрены данного ОтФрена---------------------------
function B2D(Idr) {
  var IdAll = window.document.all;
  var Sz = IdAll.length, Once = 0;
  if (BdIdr === Idr) { } else {
    //сканирование только по смене переменной отслеживающей активизированный идентификатор
    for (var i = 0; i < Sz; i++) {
      if (IdAll[i].dataset.of) { //alert('y');return;
        if (IdAll[i].dataset.of === Idr) {
          if (Once === 0) { IdAll[i].focus(); Once = 1; }
          IdAll[i].style.display = ''; //.parentElement.color = "#6666FF"
        }else{
          IdAll[i].style.display='none';//.parentElement.color = "#CCCCCC"
        }
      }
    }
    BdIdr = Idr;
  }
}//
//------Притемнение-высветление пунктов раздела----------------------------
function Hdr3Pnc(Frm, Num) {
  var IdAll = window.document.all;
  var IdEnd = document.getElementById("End" + Frm.toUpperCase());
  var Sz = IdAll.length, Once = 1;
  for (var i = 0; i < Sz; i++) {
    if (IdAll[i].dataset[Frm + 'fr']) { //alert('y');return;
      if (IdAll[i].dataset[Frm + 'fr'] === Num) {
        if (Once) {
          if (IdEnd) { IdEnd.focus(); }
          var IdEl = IdAll[i].lastChild;
          if(IdEl){IdEl.focus(); Once = 0;}
        }
        IdAll[i].style.color = "#9900CC";
      }else{
        IdAll[i].style.color = "#808080";
      }
    }
  }
  Pnc3Txt('t', Num + '0');
}//
//------Скрытие-проявление текста раздела или пункта-----------------------
function Pnc3Txt(Frm, Num) {
  var IdAll = document.all;
  var Sz = IdAll.length;
  for (var i = 0; i < Sz; i++) {
    var PnctData=IdAll[i].dataset[Frm + 'fr'];
    if (PnctData) {
      var Pnct=IdAll[i]; //.parentElement
      if (PnctData === Num) {Pnct.style.display = "";}
      else {Pnct.style.display = "none";}
    }
  }
}//
//===     Ссылка-Сноска
//------Показать ссылку-сноску---------------------------------------------
function Note(evnt, Idr, Frm, Idr2) {
  var Offs=-10;
  if(!Frm){Frm='ContextBox';}
  else{if(!isNaN(Frm)){Offs=1*Frm;Frm='ContextBox';}}
  var xPos = (evnt.clientX || window.event.clientX) + Offs;
  var yPos = (evnt.clientY || window.event.clientY) + Offs;
  if(Frm==='SearSent'){
    var InfoBox = document.getElementById('SearBox');
  }else{
    var InfoBox = document.getElementById(Frm);
  }
  if(InfoBox){ //+ IzoBox SearBox
    if(Frm==='ContextBox'){
      if(xPos+window.innerWidth/3>window.innerWidth)
        {xPos=window.innerWidth-window.innerWidth/3;}
      if(yPos+window.innerHeight/10>window.innerHeight)
        {yPos=window.innerHeight-window.innerWidth/10;}
      InfoBox.style.top = yPos+'px';
      InfoBox.style.left = xPos+'px';
    }
    if(Frm==='AboutBox'){Frm='ContextBox';
      InfoBox.style.top = window.innerHeight/6+'px';
      InfoBox.style.left = window.innerWidth*0.26+'px';
      InfoBox.style.height=window.innerHeight*2/3+'px';
      InfoBox.style.width=window.innerWidth*0.34+'px';
    }
    if(Frm==='ReferBox'){
      if(xPos<InfoBox.clientWidth)
        {Frm='ReRefBox';InfoBox = document.getElementById(Frm);}
    }
    if(Frm==='SearBox'||Frm==='SearSent'){
      var FrmL = document.getElementById('FrL');
      if(FrmL){InfoBox.style.top=FrmL.style.top;
        InfoBox.style.height=FrmL.style.height;}
    }
    if(Frm==='SentBox'||Frm==='SearSent'||Frm==='FrZZ'){
      var FrmL = document.getElementById('FrM');
      if(FrmL){
        if(Frm==='SearSent'){
          var InfoBox2 = document.getElementById('SentBox');
          InfoBox2.style.top=FrmL.style.top;
          InfoBox2.style.height=FrmL.style.height;
          InfoBox2.style.visibility = "visible";
          InfoBox2.innerHTML = 'Note: не найден объект:'+Idr2;
        }else{
          InfoBox.style.top=FrmL.style.top;
          InfoBox.style.height=FrmL.style.height;
        }
      }
    }
    InfoBox.style.visibility = "visible";
    if(Frm==='FrZZ'){return;}
    var NoteElem = document.getElementById(Idr);
    if(NoteElem){InfoBox.innerHTML = NoteElem.innerHTML;}
    else{
      if(document.getElementById('out'+Idr)){Info('re');return;}
      InfoBox.innerHTML = 'Note: не найден объект:'+Idr;
      LoadList='#$';
      LoadFile1='../'+Idr[0]+'00001/'+Idr+'.html';
      FrmForLoad1=Frm;
      //WinLoc.href=LoadFile1.toLowerCase();
      if(Frm==='SearSent'){
        LoadList='#$₤';
        LoadFile2='../'+Idr2[0]+'00001/'+Idr2+'.html';
        FrmForLoad1='SearBox';
        FrmForLoad2='SentBox';
      }
      NotLoad='';
      Fr00Loaded();
    }
  }else{Info('Note: не обнаружен фрейм:'+Frm);}
}//
//===     Обращение к локализованному
//------Обратиться к локализованной странице (документу)-------------------
function WinOpen(evnt,UrlFolder,UrlFile,UrlSave) {
  var UrlPa = 'http://localhost/'+UrlFolder+'/';
  if(!UrlSave){UrlSave=UrlFile;}
  UrlSave=IsHtmlType(UrlFolder,UrlFile);
  var xPos = (evnt.clientX || window.event.clientX) + 10;
  var yPos = (evnt.clientY || window.event.clientY)-5;
  var BtnId = document.getElementById('OpnInWin');
  var LoadName = UrlTest(UrlPa+UrlFile);
  if(LoadName[0]==='#'){LoadName = UrlTest(UrlPa+UrlSave);}
  if(LoadName[0]==='#'){UrlSave=UrlSave.substring(0,UrlSave.length-3)+'html';LoadName = UrlTest(UrlPa+UrlSave);}
  if(LoadName[0]==='#'){if(UrlSave.substring(UrlSave.length-11)==='/index.html'){LoadName = UrlTest(UrlPa+UrlSave.substring(0,UrlSave.length-11)+'.htm');}}
  if(LoadName[0]==='#'){if(LoadName[1]!=='#'){
    UrlPaFile = 'http://'+UrlFolder+'/'+UrlFile;
    if(parent.LinkOff===0)
    Msg('Сохраните в C:\\inetpub\\wwwroot',UrlFolder,UrlSave);}
    //var WinOpnStatus = window.open(UrlPaFile, '_blank');
    if(BtnId){BtnId.style.visibility = "hidden";}
  }
  else{
    if(parent.LinkOff===0)
    Msg('находится в C:\\inetpub\\wwwroot',UrlFolder,UrlSave);
  if(BtnId){
    BtnId.style.top = yPos+'px';
    BtnId.style.left =xPos+'px'; //(window.innerWidth-30)+'px'; 
    BtnId.style.visibility = "visible";
    WinOpenUrl=LoadName;
  }
  }
}//
//------проверить существование страницы-----------------------------------
function UrlTest(UrlPaFile) {
  //if(document.location.host!=='localhost'){Msg('работа вне localhost','без всплывающего окна','без подсказки имён сохранения');return '##Отказ:';}
  /*if(UrlPaFile[0]==='.'){
    var UrlReturn = UrlTest('http://localhost/pro-bapera'+UrlPaFile.substring(2));
    if(UrlReturn[0]!=='#'){return UrlReturn;}
  }*/
  var Request = new XMLHttpRequest();
  Request.open('HEAD', UrlPaFile, false);
  Request.send(null);
  switch(Request.status){
    case 404: return '#Отказ:' + Request.status + ":" + Request.statusText;
    case 200: return UrlPaFile;
    case 416: return UrlPaFile;
  }
}//
//------Запрет-разрешение подсказки места сохраняемой страницы-------------
function MsgLinkOff() { //(до смены страницы)
  if(LinkOff===0){LinkOff=1;}else{LinkOff=0;}
}//
//===     Вспомогательные окна и Бокс-фреймы
//------Окно списка--------------------------------------------------------
function OpenListWindow() {
  var WiwW=window.screen.availWidth-20;
  var Wiw='resizable=yes,scrollbars=yes,top=0,left=0,width='+WiwW*1/3;
  var Win0List=window.open('', 'list', Wiw);
  //http://localhost/pro-bapera/common/blank.html
  if(Win0List===null)
    {alert('плавающие окна заблокированы браузером');return;}
  Win0List.focus();
  WinList = -1;
}//
//------Окно опуса---------------------------------------------------------
function OpenOpusWindow() {
  var WiwW=window.screen.availWidth-20;
  var Wiw='resizable=yes,scrollbars=yes,top=0,left='+WiwW*1/3+',width='+WiwW*2/3;
  var Win0List=window.open('', 'biblo', Wiw);
  if(Win0List===null)
    {alert('плавающие окна заблокированы браузером');return;}
  Win0List.focus();
}//
//------Открыть в плавающем окне-------------------------------------------
function OpenInWindow() {
  var WInName ='biblo';
  if(WinOpenUrl.substr(WinOpenUrl.length-4,4)==='.mp3'){WInName ='mp3';}
  WinBiblo=window.open(WinOpenUrl,WInName,'scrollbars=yes,resizable=yes');
  WinOpenUrl ='';
  if(WinBiblo===null)
    {alert('плавающие окна заблокированы браузером');return;}
  WinBiblo.focus();
  var BtnId = document.getElementById('OpnInWin');
  if(BtnId){BtnId.style.visibility = "visible";}
}//
//------Сокрытие бокс-фрейма (W V)-----------------------------------------
function FrClose(Frm) {
  var Elm = document.getElementById('Fr' + Frm);
  if (Elm) { Elm.style.visibility = 'hidden'; }
  if (Frm === 'W') {
    var Elm = document.getElementById('FrV');
    if (Elm) { Elm.style.visibility = 'hidden'; }
  }
}//
//===     Проверки
//------Html-типы файлов --------------------------------------------------
function IsHtmlType(UrlFolder,UrlFile) {
  var FileName="";
  if(UrlFile.length===0){return 'index.htm';}
  if(UrlFile[UrlFile.length-1]==='/'){return UrlFile+'index.htm';}
  var TestType=UrlFile.substring(UrlFile.length-6);
  switch(TestType){
  case '.phtml':
    break;
  case '.shtml':
    break;
  case '.xhtml':
    break;
  case '.dhtml':
    break;
  default: 
    TestType=UrlFile.substring(UrlFile.length-5);
    switch(TestType){
    case '.html': 
      if(UrlFolder.substring(0,5)==='biblo'){return UrlFile;}
      break;
    case '.aspx':
      break;
    default: 
      TestType=UrlFile.substring(UrlFile.length-4);
      switch(TestType){
      case '.php': 
        break;
      case '.asp': 
        break;
      case '.jsp': 
        break;
      case '.htm': 
        break;
      default: 
        TestType=UrlFile.substring(UrlFile.length-4)[0];
        if(TestType==='.'){
          FileName=UrlFile.substring(0,UrlFile.length-5);
          return UrlFile;}
        TestType=UrlFile.substring(UrlFile.length-5)[0];
        if(TestType==='.'){
          FileName=UrlFile.substring(0,UrlFile.length-6);
          return UrlFile;}
        return UrlFile+'/index.htm';
      }
      FileName=UrlFile.substring(0,UrlFile.length-4);
      return FileName+'.htm';
    }
    FileName=UrlFile.substring(0,UrlFile.length-5);
    return FileName+'.htm';
  }
  FileName=UrlFile.substring(0,UrlFile.length-6);
  return FileName+'.htm';
}//
//------Обратная реляция---------------------------------------------------
function of(Idr,Prm) {
  OfTo(Idr,Prm,'of');
}
//------Прямая реляция-----------------------------------------------------
function to(Idr,Prm) {
  OfTo(Idr,Prm,'to');
}
//------Реляция------------------------------------------------------------
function OfTo(Idr,Prm,toof) {
  var Pos1=0,iddFrm="",pNum="",valCol="",ListNum="",Frm,pScan;
  var ListFrm=Prm,yesSub=-1,idFrmSub="",idFrmSup="";
  if(ListFrm.length>0){ListFrm+=" ";}
  var pThis=document.getElementById(Idr); //из этого абзаца
  if(!pThis){alert('абзац не самоидентифицирован');return;}
  var nThis=pThis.id.substring(3);
  var IdrFrm=pThis.id.substring(0,3);
  do { //выделить каждый релятивный фрейм
    Pos1=ListFrm.search(" ");
    if(Pos1<=0){break;}
    iddFrm=ListFrm.substring(0,Pos1);
    ListFrm=ListFrm.substring(Pos1+1);
    idFrmSup=iddFrm;
    if(iddFrm[3]==="."){
      idFrmSup=iddFrm.substring(0,3);
      idFrmSub=iddFrm.substring(4);
      if(toof==='to')yesSub=+1;
    }
    Frm=document.getElementById('Fr'+idFrmSup);
    if(Frm){//по каждому существующему фрейму
      ListNum=' '+pThis.dataset[iddFrm.toLowerCase()]+' '; //номера абзацев во фрейме
      if(ListNum){
        if(yesSub>0){ //выделить субтаблицу
          pScan = Frm.getElementsByTagName("p");
          for (var i = 0; i < pScan.length; i++) {
            valCol=pScan[i].dataset[idFrmSub.toLowerCase()];
            if(valCol){
              if(valCol===nThis || nThis==='1'){ //в списке
                pScan[i].style.display = "";
              }else{
                pScan[i].style.display = "none";
              }
            }
          }
        }else{ //по списку
          pScan = Frm.getElementsByTagName("p");
          for (var i = 0; i < pScan.length; i++) { //по каждому абзацу фрейма
            pNum=' '+pScan[i].id.substring(3)+' '; //номер абзаца
            if(ListNum.search(pNum)>=0){ //в списке
              pScan[i].style.display = "";
            }else{
              pScan[i].style.display = "none";
            }
          }
        }
      }
    }
  } while (Pos1>0)  
  var DocUrl = document.URL; // /giperspravochniki/
  var Bg=DocUrl.search('giperspravochniki')+18;
  var Fldr=DocUrl.substring(Bg,DocUrl.length-5);
  var PaFile=('./'+Fldr+'/'+IdrFrm+'_0d_'+nThis+'.html').toLowerCase();
  var Frm0D=window.top.frames.fr0di;if(!Frm0D){alert('нет iфрейма: Fr0D');return;}
  if(UrlTest(PaFile)[0]==='#'){PaFile='../giperspravochniki/0d0.html';}
  var WinLoc=Frm0D.location; //ie
  if(!WinLoc){
    var WinCont=Frm0D.contentWindow;
    if(!WinCont){Info('Реляция: URL не прописывается в iframe');}
    else{var WinLoc=WinCont.location;}//не ie
  }
  NotLoad='';
  WinLoc.href=PaFile;
}
//------Реакция окна на событие onmessage----------------------------------
function ONmsg(evnt) {
//  if(evnt.origin!=='http://')
//    {alert('Послание не оттуда '+evnt.origin);return;}
  LoadName = UrlTest('http://localhost/pro-bapera/update/0000-00-00-000.html');
  if(LoadName[0]==='#'){alert('нет полного образа сайта.');return;}
  var ArrayStr="";var PAelem;var PBelem;var LoadName;
  var List=evnt.data.substring(16);
  var Size=evnt.data.substring(12,15).trim();
  var FrV=document.getElementById('FrV');
  var Array = List.split(';');
  FrV.children[0].children[1].textContent=Size;
  Info('Проверить обновления: Формирование списка обновляемого-обновлённого');
  for (var j = 0; j < Array.length - 1; j++) {
    PBelem=FrV.children[j+1].children[1];
    PBelem.textContent=Array[j];
  }
  Info('Проверить обновления: Выясняем обновляемое в списке');
  for (var j = 0; j < Array.length - 1; j++) {
    PAelem=FrV.children[j+1].children[0];
    ArrayStr='http://localhost/pro-bapera/update/'+Array[j]+'.html';
    LoadName = UrlTest(ArrayStr);
    if(LoadName[0]==='#'){PAelem.textContent='⇓';}
    else{PAelem.textContent='⌘';}
  }
  Info('Проверить обновления: Завершено');
}
//------Скачивание или просмотр данного пакета обновления------------------
function LoadOrView(This) {
  var LnkTxt='';
  var ElmTxt=This.parentElement.children[1].textContent;
  if(This.parentElement.children[0].textContent==='⇓'){
    if(ElmTxt.length<4){ElmTxt='0000-00-00-000';}
    LnkTxt='http://pro-bapera.narod.ru/zip/'+ElmTxt+'.zip';
    window.open(LnkTxt, 'dwnload', 'top=0 left=100');
  }else{
    LnkTxt='http://localhost/pro-bapera/update/'+ElmTxt;
    LoadFrame(LnkTxt,'W');
  }
}
//------Загрузка списка обновлений и проверка необновлённого---------------
function UpdateScan(Sait) {
  var Frm=document.getElementById('FrV');if(!Frm){alert('не обнаружен фрейм: FrV');return;}
  var pScan=Frm.getElementsByTagName("p");
  var Text1=pScan[0].textContent;
  if(!Text1){alert('список обновления пуст - скачать-распаковать');return;}
  var PaFile0='http://'+Sait+'/update/0000-00-00-000.html';
  Info('Проверить обновления: Запрос '+PaFile0);
  var Frm0 = window.frames.fr00i;if(!Frm0){alert('не обнаружен iфрейм: Fr00');return;}
  var WinLoc=Frm0.location; //ie
  if(!WinLoc){
    var WinCont=Frm0.contentWindow;
    if(!WinCont){Info('Проверить обновления: URL не прописывается в iframe');}
    else{var WinLoc=WinCont.location;}//не ie
  }
  if(!WinCont){Info('Проверить обновления: URL не прописывается в iframe');}
  NotLoad='';
  WinLoc.href=PaFile0;
  Info('Проверить обновления: Ожидаем ответа десяток-другой секунд от сайта ['+PaFile0+']');
}
//------Справка о выделенном-----------------------------------------------
function AboutSelection(evnt) { //доработать
//  var Sl = document.getSelection();
//  var txt = Sl.focusNode.textContent.substring(Sl.focusOffset,Sl.anchorOffset);
//  if(txt !== ''){
//    var InfoBox = document.getElementById("ContextBox");
//    InfoBox.innerHTML = txt;
//    var xPos = (evnt.clientX || window.event.clientX) - 10;
//    var yPos = (evnt.clientY || window.event.clientY) - 10;
//    InfoBox.style.top = yPos+'px';
//    InfoBox.style.left = xPos+'px';
//    InfoBox.style.visibility = "visible";
//  }
}//
//------Тест---------------------------------------------------------------
function Test() {
  Info('Начало теста');
}//
//---------------------------Common.js-------------------------------------