var fileInput, textInput, clickityClick;

/**
 *
 * */
function setFileInput(){

    fileInput = document.createElement('input');
    document.body.appendChild(fileInput);

    fileInput.type = 'file';
    fileInput.id = 'inputJSON';
    fileInput.multiple = true;
    fileInput.addEventListener("change", onFileInputChange, false);

    textInput = document.createElement('input');
    document.body.appendChild(textInput);

    textInput.type = 'text';

    clickityClick = document.createElement('button');
    document.body.appendChild(clickityClick);

    clickityClick.onclick = handleConsole;
    clickityClick.innerHTML = 'Init battle with';
}

/**
 *
 * */
function onFileInputChange() {

    var fileList = this.files,
        counter  = 0;

    Object.keys(fileList).forEach(indx => {
         var file   = fileList[indx],
             reader = new FileReader();

         counter++;
         reader.onloadend = function (e) {

             var d = document.createElement('script');

             d.innerHTML = e.target.result;
             document.body.appendChild(d);
             counter--;
             if (!counter) { console.log('All done'); }
         }
         reader.readAsText(file);
    });
}

/**
*
* */
function handleConsole() {

    var d = eval(textInput.value);

    console.log(d);
    _InitBattleObject(d);
}
