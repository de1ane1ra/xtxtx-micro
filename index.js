'use strict';
const txt=document.querySelector('[data-txt]');
const download=function(){
    const fileName=prompt('save as:',`xtxtx${Date.now()}.txt`);
    if(fileName===null||fileName==='')return;
    const text=txt.value.replace(/\n/g, '\r\n');
    const blob=new Blob([text],{type:'text/plain'});
    const link=Object.assign(document.createElement('a'),{
        download:fileName,
        href:window.URL.createObjectURL(blob),
        target:'target'
    });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);   
};

document.addEventListener('keydown',function(e) {
    console.log(e.code);
    if (!((e.ctrlKey||e.metaKey)&&e.code==='KeyS'))return;
    e.preventDefault();
    download();
});

// Add support for tab characters
document.addEventListener('keydown',function(e){
    if(e.code!=='Tab')return;
    e.preventDefault();
    let start=this.selectionStart;
    const end=this.selectionEnd;
    const {target,target: {value}}=event;
    target.value=`${value.substring(0, start)}\t${value.substring(end)}`;
    this.selectionStart=start++;
    this.selectionEnd=this.selectionStart;
});
