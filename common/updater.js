//---------------------------StatusUpdate.js-------------------------------
//------После загрузки Q-Фрейма--------------------------------------------
function AfterUpdateLoad() {
  var ArrayStr = '', pOldFile = '', OldFile = '', OldDate = '';
  var PrmSet = '', NewFile = '', NewDate = '';
  Info('Список обновления загружен');
  var DivNew = this.document.getElementById('FrK');
  if (!DivNew) { alert('недоступен список актуальных файлов'); return; }
  var DivOld = this.document.getElementById('StatusUpdate');
  if (!DivOld) { alert('недоступен список обновляемых файлов'); return; }
  var OldList = DivOld.dataset.dir;
  var OldArray = OldList.split('\n');
  if(OldArray.length<5){alert('список обновляемых файлов не массивирован'); return;}
  var links = DivNew.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    PrmSet = links[i].textContent;
    if (PrmSet.substring(0, 3) === '201') {
      NewDate = PrmSet.substring(0, 10);
      NewFile = PrmSet.substring(11);
      for (var j = 0; j < OldArray.length - 1; j++) {
        //var OldFile =OldArray[j].substring(55);
        ArrayStr =OldArray[j];
        pOldFile =ArrayStr.search(/\s\w+\.(js|css|svg|html)/); //[w]++/
        if (pOldFile !== -1) {
          OldFile = ArrayStr.substring(pOldFile + 1);
          OldDate = '';
          if (OldFile === NewFile) {
            OldDate = YYYYMMDD(ArrayStr.substring(0, 10));
            if (OldDate === NewDate) {
              links[i].setAttribute("href", '#');
              links[i].parentElement.style.display = 'none';
            }
          }
        }
      }//for
    }
  }//for
  Info('Статус Обновления: подготовлено к загрузке');
}//
//===     
//------загрузка документа во фрейм и перегрузка в соответствующий бокс---
function FrUULoaded() {
  var ArrayStr = '', pOldFile = '', OldFile = '', OldDate = '';
  var PrmSet = '', NewFile = '', NewDate = '';
    Info('Запуск загрузки Списка обновления');
  var FrmUU = this.FrUU.document;
  var BodyUU = this.FrUU.document.getElementById('Actualer');
  if (BodyUU) {
    //распределение по боксам
    var BoxNew = BodyUU.parentElement;
    Info('Список обновления загружен');
    var DivOld = this.document.getElementById('StatusUpdate');
    if (!DivOld) { /*alert('недоступен список обновляемых файлов');*/ return; }
    var OldList = DivOld.dataset.dir;
    var OldArray = OldList.split('\n');
    if(OldArray.length<5){alert('список обновляемых файлов не массивирован'); return;}
    var links = this.FrUU.document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      PrmSet = links[i].textContent;
      if (PrmSet.substring(0, 3) === '201') {
        NewDate = PrmSet.substring(0, 10);
        NewFile = PrmSet.substring(11);
        for (var j = 0; j < OldArray.length - 1; j++) {
          //var OldFile =OldArray[j].substring(55);
          ArrayStr =OldArray[j];
          pOldFile =ArrayStr.search(/\s\w+\.(js|css|html)/); //[w]++/
          if (pOldFile !== -1) {
            OldFile = ArrayStr.substring(pOldFile + 1);
            OldDate = '';
            if (OldFile === NewFile) {
              OldDate = YYYYMMDD(ArrayStr.substring(0, 10));
              if (OldDate === NewDate) {
                links[i].setAttribute("href", '#');
                links[i].parentElement.style.display = 'none';
              }
            }
          }
        }//for
      }
    }//for
    Info('Статус Обновления: подготовлено к загрузке');
  }
  else  {Info('Статус Обновления: всё ещё не загружен список свежих файлов - ждите, допустимое для интернет загрузки, время');return;}
}//
//===     
//------если есть процедура после загрузки---------------------------------
function AfterLoad() {
  if (AddList === 'Q') {
    AddList = '#';
    if (this.FrUU) { var FrmU = this.FrUU; } else { alert('нет FrUU'); return; }
    var StUd = document.getElementById('StatusUpdate');
    if (!StUd) {Info('Статус Обновления: отсутствует фрейм списка обновляемых файлов');return;}
    var StDate = StUd.dataset.date;
    if(!StDate){Info('Статус Обновления: отсутствует дата списка обновляемых файлов');return;}
    var StDir = StUd.dataset.dir;
    if (!StDir) { Info('Статус Обновления: отсутствует список обновляемых обновляемых файлов'); return; }
    var New0Date= new Date();
    //var New1Date = New0Date.toLocaleString();
    //var NewDate = New1Date.substring(0, 10);
    var NewDate = DDMMYYYY(New0Date);
    var OldDate = StDate.substring(0, 10);
    if (!(OldDate === NewDate)) {
      if (!confirm('Дата статуса обновления:' + OldDate + ' не сегодняшняя:' + NewDate + ' - продолжить и загрузить список обновления или прервать для приведения статуса обновления к сегодняшнему дню?')) {
        Info('Обновите эту страницу, после приведения статуса обновления к сегодняшнему дню'); return;}
    }
    FrmU.location = 'z00676z00.html';
  }
}//
//===     
//------Скачать заданные zip-файлы-----------------------------------------
function DownLoadUpdate() {
  var LnkTxt = '';
  Info('Скачать заданные zip-файлы:' + ' - Сработало');
  var ElmFrm = document.getElementById('FrK');
  if (ElmFrm) {
    var links = ElmFrm.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      LnkTxt = links[i].getAttribute("href");
      if (LnkTxt.substring(0, 31) === 'http://pro-bapera.narod.ru/zip/') {
        if (!confirm('Скачать:' + LnkTxt + ' или прервать закачки?')) {return;}
        window.open(LnkTxt, 'dwnload', 'top=0 left=100');
      }
    }
  }
}//
//------Стереть внутри----------------------------------------------------
function DelInner(Idtr) {
  var SwId = document.getElementById(Idtr);
  if(SwId){SwId.innerHTML = '';}
}//
//------Исключить пакет----------------------------------------------------
function DeleteLinks(Frm) {
  var ElmFrm = this.FrUU.document.getElementById('Fr'+Frm);
  if (ElmFrm) {
    ElmFrm.innerHTML = '';
    Info('Исключить пакет:'+Frm+' - Сработало');
  }
}//
//------дата2строка--------------------------------------------------------
function DDMMYYYY(Date) {
  var YY = Date.getFullYear();
  var MM = Date.getMonth()+1;
  var DD = Date.getDate();
  return (DD<10?'0':'')+DD+'.'+(MM<10?'0':'')+MM+'.'+YY;
}//
//------дата2строка--------------------------------------------------------
function YYYYMMDD(cDate) {
  var YY = cDate.substring(6,10);
  var MM = cDate.substring(3,5);
  var DD = cDate.substring(0,2);
  return YY+'.'+MM+'.'+DD;
}//
//---------------------------StatusUpdate.js-------------------------------
