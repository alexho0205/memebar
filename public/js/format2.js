
// 建制(中間)畫布區
var topCanvas = new fabric.Canvas('topCanvas', { preserveObjectStacking: true, width: 850, height: 150 });
var middleCanvas = new fabric.Canvas('middleCanvas', { preserveObjectStacking: true, width: 850, height: 200 });
var bottomCanvas = new fabric.Canvas('bottomCanvas', { preserveObjectStacking: true, width: 850, height: 150 });
// 畫布中所有的物件
var itexts = [];


function addTextToWB(e) {
   let itext = new fabric.IText('新增一段文字', { fontSize: 45, fontFamily: '' });
   WB.add(itext);
}

function loadTextAttr(itext) {
   if (itext.fontFamily) {
      $('#fontFamilyOpt').val(itext.fontFamily);
   } else {
      $('#fontFamilyOpt').val('default');
   }
   if (itext.fontSize) {
      $('#fontSizeOpt').val(itext.fontSize);
   }
}

function setTextSize(e) {
   const fontSize = $('#fontSizeOpt').find(":selected").val();
   setStyle('fontSize', fontSize);
}

function setTextFontFamily(e) {
   const fontFamily = $('#fontFamilyOpt').find(":selected").val();
   setStyle('fontFamily', fontFamily);
}

function setTextColor(e) {
   const fontColor = e.target.getAttribute('zcolor');
   setStyle('fill', fontColor);
}

// 變更當前 itext 的 style
function setStyle(styleName, sytleValue) {
   var obj = WB.getActiveObject();
   if (obj === null) {
      return;
   }
   obj.enterEditing();
   obj[styleName] = sytleValue;
   obj.dirty = true;
   obj.exitEditing();
   console.log('set style:', styleName, sytleValue);
}


function exportJPG() {
   WB.setBackgroundColor('#FFFFFF', WB.renderAll.bind(WB));
   var dataURL = WB.toDataURL({ format: 'png', quality: 1 });
   var link = document.createElement('a');
   link.href = dataURL;
   link.download = 'canvas.png';
   link.click();
}

function exportPDF() {

   // 無法滙出包含canvas的HTML元件 , 一次滙出一個 canvas 是比較適合的方法.
   alert('export pdf');
  

}

var text1, text2, text3 = null;
function initText() {
   text1 = new fabric.IText('新增圖片', { fontSize: 45, fontFamily: 'default' });
   topCanvas.add(text1);
   text2 = new fabric.IText('新增一段文字', { fontSize: 45, fontFamily: 'default', editable: false });
   middleCanvas.add(text2);
   text3 = new fabric.IText('新增一段文字', { fontSize: 45, fontFamily: 'default', editable: false });
   bottomCanvas.add(text3);
}

function chageTxt1(e) {
   text1.text = $(this).val();
   topCanvas.renderAll();
}

function chageTxt2(e) {
   text2.text = $(this).val();
   middleCanvas.renderAll();
}

function chageTxt3(e) {
   text3.text = $(this).val();
   bottomCanvas.renderAll();
}

function setTextFontFamily1(e) {
   const fontFamily = $('#fontStyle1').find(":selected").val();
   setStyle(text1, 'fontFamily', fontFamily);
}

function setTextFontFamily2(e) {
   const fontFamily = $('#fontStyle2').find(":selected").val();
   setStyle(text2, 'fontFamily', fontFamily);
}

function setTextFontFamily3(e) {
   const fontFamily = $('#fontStyle3').find(":selected").val();
   setStyle(text3, 'fontFamily', fontFamily);
}

function setTextFontSize1(e) {
   const fontSize = $('#fontSize1').find(":selected").val();
   setStyle(text1, 'fontSize', fontSize);
}

function setTextFontSize2(e) {
   const fontSize = $('#fontSize2').find(":selected").val();
   setStyle(text2, 'fontSize', fontSize);
}

function setTextFontSize3(e) {
   const fontSize = $('#fontSize3').find(":selected").val();
   setStyle(text3, 'fontSize', fontSize);
}

function setTextFontColor1(e) {
   const fontColor = $('#fontColor1').find(":selected").val();
   setStyle(text1, 'fontColor', fontColor);
}

function setTextFontColor2(e) {
   const fontColor = $('#fontColor2').find(":selected").val();
   setStyle(text2, 'fontColor', fontColor);
}

function setTextFontColor3(e) {
   const fontColor = $('#fontColor3').find(":selected").val();
   setStyle(text3, 'fontColor', fontColor);
}

function setStyle(itext, styleName, styleValue) {

   //itext.fontFamily = sytleValue;
   if (styleName === 'fontFamily') {
      itext.fontFamily = styleValue;
   } else if (styleName === 'fontSize') {
      itext.fontSize = styleValue;
   } else if (styleName === 'fontColor') {
      itext.fill = styleValue;
   }
   itext.dirty = true;
   topCanvas.renderAll();
   middleCanvas.renderAll();
   bottomCanvas.renderAll();
   console.log('set style:', styleName, styleValue);
}

// add image to background
function addImageToGB(e) {
   let imageUrl = e.target.src;
   $('.drawImage').css('background-image', 'url(' + imageUrl + ')');
   $('.drawImage').css('background-size', 'cover');
   $('.drawImage').css('background-repeat', 'no-repeat');
   $('.drawImage').css('background-position', 'center center');
}

function addImageToTop(e) {
   let image = new fabric.Image(e.target, {
      left: 0,
      top: 0
   });

   var width = 50; // 設定寬度
   var scaleFactor = width / image.width;
   var height = image.height * scaleFactor;
   image.scale(scaleFactor); // 按比例縮放圖像

   topCanvas.add(image);

}

$(document).ready(function () {
   initText();

   $('#txtArea1').on("change keyup", chageTxt1);
   $('#txtArea2').on("change keyup", chageTxt2);
   $('#txtArea3').on("change keyup", chageTxt3);
   $('#fontStyle1').on('change', setTextFontFamily1);
   $('#fontStyle2').on('change', setTextFontFamily2);
   $('#fontStyle3').on('change', setTextFontFamily3);
   $('#fontSize1').on('change', setTextFontSize1);
   $('#fontSize2').on('change', setTextFontSize2);
   $('#fontSize3').on('change', setTextFontSize3);
   $('#fontColor1').on('change', setTextFontColor1);
   $('#fontColor2').on('change', setTextFontColor2);
   $('#fontColor3').on('change', setTextFontColor3);
   $('.memeimage').on('click', addImageToGB);
   $('#exportPDFBtn').on('click', exportPDF);
   $('.imageObj').on('click', addImageToTop);






});