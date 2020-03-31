let baseurl = document.getElementById('baseURL');
let count = document.getElementById('count');
let subjectName = document.getElementById('subjectName');
let submitBtn = document.getElementById('submit');
let addon = document.getElementById('addon');
let successClose = document.getElementById('successClose');
let failureClose = document.getElementById('failureClose');
let hideMessage = document.querySelector('.hideMessage');

successClose.addEventListener('click',e=>{
  e.preventDefault();
  e.target.parentElement.style.display = "none";
});

failureClose.addEventListener('click',e=>{
  e.preventDefault();
  e.target.parentElement.style.display = "none";
});

submitBtn.addEventListener('click',e=>{
    e.preventDefault();
    let baseURL = baseurl.value;
    let countValue = count.value;
    let subjectNameValue = subjectName.value;
    let addonString = addon.value;
    let data = {
        baseURL,
        countValue,
        subjectNameValue,
        addonString
    };
    const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
    }
    fetch('/sendDataToDownload',options)
    .then(data=>{
      const status = data.ok;
      if(status === true || data.statusText === "OK"){
        setModal('success');
      }else{
        setModal('failure');
      }
    });   
});

function setModal(status){
  let successModal = document.querySelector('.successModal');
  let failureModal = document.querySelector('.failureModal');
  if(status === 'success'){
    successModal.style.display = "flex";
    setTimeout(()=>{
      successModal.style.display = "none";
    },1000);
  }else if(status === "failure"){
    failureModal.style.display = "flex";
    setTimeout(()=>{
      failureModal.style.display = "none";
    },1000);
  }
}
