"use strict"
$(document).ready(function() {
    $('.mission-btn').click(function() {
      $('html, body').animate({
        scrollTop: $('.services').offset().top
      }, 1000);
    });
  });
  
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if (error ===0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php',{
                method:'POST',
                body: formData
            });
            if(response.ok) {
                let result= await response.json();
                alert(result.message);
                formPreview.innerHTML= '';
                form.reset();
                form.classList.remove('_sending');
            } else{
                alert('Помилка');
                form.classList.remove('_sending');
            }
        } else {
            alert ('Заповніть форму')
        }
    }
    function formValidate(form) {
        let error=0;
        let formReq = document.querySelectorAll('._req')
        for (let index = 0; index< formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);
            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++
                }
            } else if (input.getAttribute('type')=== 'checkbox' && input.checked === false){
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    // ф-я тексту e-mail 
    function emailTest(input){
        return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
    }
    //інпут файла в змінну
    const formImage = document.getElementById('formImage');
    //дів для превью в змінну
    const formPreview = document.getElementById('formPreview');

   // слухаємо зміни в input file
   formImage.addEventListener('change', ()=>{
    uploadFile(formImage.files[0]);
   })

   function uploadFile(file){
    //перевіряємо тип файлу
    if (!['image/jpeg', 'image/png'].includes(file.type)){
        alert('Недопустимий тип файлу');
        formImage.value='';
        return;
    }
    //перевіримо розмір файлу(<2мб)
    if (file.size>2*1024*1024){
        alert('Файл завеликий. Допустимий розмір - до 2 мб');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e){
    formPreview.innerHTML= `<img src="${e.target.result}" alt="Photo">`;
};
    reader.onerror=function(e){
        alert('Помилка');
    };
    reader.readAsDataURL(file);
   }
});

