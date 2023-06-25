
// 建制(中間)畫布區 white board
var WB = new fabric.Canvas('white_board', { preserveObjectStacking: true });
// 畫布中所有的物件
var itexts = [];

// add image to white board
function addImageToWB(e) {
 
   let image = new fabric.Image(e.target, {
      left: 0,
      top: 0
   });

   var width = 400; // 設定寬度
   var scaleFactor = width / image.width;
   var height = image.height * scaleFactor;
   image.scale(scaleFactor); // 按比例縮放圖像

   WB.add(image);
}

function addTextToWB(e) {
   let itext = new fabric.IText('新增一段文字', { fontSize: 45, fontFamily: '' });
   WB.add(itext);
}

function deleteObj(e) {
   var obj = WB.getActiveObject();
   WB.remove(obj);
}


WB.on('mouse:down', function (opt) {
   if (!opt.target) {
      return;
   }
   if (opt.target.type == 'i-text') {
      loadTextAttr(opt.target);
   } else if (opt.target.type == 'image') {
   }
});

WB.on('object:modified', function (opt) {
   // keep all itext on top
   var objects = WB.getObjects();
   for (var i = 0; i < objects.length; i++) {
      if (objects[i] instanceof fabric.IText) {
         //objects[i].bringToFront();
         //console.log('bring to front');
      }
   }

});

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
   let width = 400;
   let height = 500;

   let pdf = new jsPDF('l', 'px', [width, height]);
   //let pdf = new jsPDF('p', 'px', [width, height]);
   

   let cav = document.getElementById('white_board');

   //then we get the dimensions from the 'pdf' file itselfd
   width = pdf.internal.pageSize.getWidth();
   height = pdf.internal.pageSize.getHeight();
   pdf.addImage(cav, 'PNG', 0, 0, width, height);
   pdf.save("download.pdf");

}

$(document).ready(function () {
   $('.memeimage').on('click', addImageToWB);
   $('#addText').on('click', addTextToWB);
   $('#fontSizeOpt').on('change', setTextSize);
   $('#fontFamilyOpt').on('change', setTextFontFamily);
   $('.fontColorOpt').on('click', setTextColor);
   $('#delText').on('click', deleteObj);
   $('#exportJPG').on('click', exportJPG);
   $('#exportPDF').on('click', exportPDF);

});