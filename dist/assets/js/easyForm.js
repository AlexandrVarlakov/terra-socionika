'use strict';



let inputs = document.querySelectorAll('.easyForm__input');
inputs.forEach( (input) => {
    input.addEventListener('focus', function(){
        let outerWrap = input.closest('.input-outer-wrap');

        outerWrap.removeAttribute('data-err');
    })
} )




let btnsSend = document.querySelectorAll('.form-btn-send');

btnsSend.forEach( (btn) => {
    btn.addEventListener('click', function(e){
        e.preventDefault();
        let form = this.closest('.easyForm');

        let errCount = 0;
        let inputs = form.querySelectorAll('.easyForm__input');

        function getOuterWrap(inp){
            return inp.closest('.input-outer-wrap');

        }

        inputs.forEach( (input) => {
            let innerError = 0;

            let outerWrap = getOuterWrap( input );
            
            let value = input.value;

            /* Проверяем установлен ли параметр минимальная длина*/
            let minLength = input.getAttribute('data-minLength');


            if ( minLength != null && minLength != undefined ){
                minLength = +minLength;
            } else {
                minLength = false;
            }
            
            /*Конец: Проверяем установлен ли параметр минимальная длина*/


            //Проверка на обязательность заполнения
            if ( value.length < 1 && input.hasAttribute('required') ){
                let errMsg = outerWrap.querySelector('.err-msg');
                errMsg.innerHTML = 'Значение поля не может быть пустым';

                innerError++;
            } 

            //Проверка на минимальную длину
            if (  minLength &&  value.length < minLength && innerError == 0){
                let errMsg = outerWrap.querySelector('.err-msg');
                errMsg.innerHTML = 'Значение поля не может быть короче ' + minLength + ' символов';
                innerError++;
            } 


            //Проверка на email

            let fieldType = input.getAttribute('data-type');

                        
            if (  innerError == 0 && fieldType == 'email' && (value.includes('.') === false  || value.includes('@') === false || value.length < 6) ){
                let errMsg = outerWrap.querySelector('.err-msg');
                errMsg.innerHTML = 'Некорректное значение поля';
                innerError++;
            }

            if (  innerError == 0 && fieldType == 'phone' && ( value.length < 16) ){
                

                let errMsg = outerWrap.querySelector('.err-msg');
                errMsg.innerHTML = 'Некорректное значение поля';
                innerError++;
            }

            if ( innerError > 0){
                outerWrap.setAttribute('data-err', '1');
                errCount++;
            }

        } );



        if ( errCount == 0){
                
            let data_body = '';


            let phpScript = form.getAttribute('action');
            

            inputs.forEach ( (input, i) => {
                if ( i < 1 ){
                    data_body += input.name + "=" + input.value;
                } else {
                    data_body += "&" + input.name + "=" + input.value;
                }
                
            })
            
            let message = this.closest('.easyForm').querySelector(".message");
            
            if ( message ){
                data_body += "&message=" + message.value;
            }

            
            

            let thanksMessage = this.closest('.easyForm').getAttribute('data-thanks');
            let modalThanksMessage =   document.querySelector('.modal-thanks__message');



        
            fetch(phpScript, { 
                method: "POST",
                body: data_body,   
                headers:{"content-type": "application/x-www-form-urlencoded"} 
                })
                
            .then( (response) => {
                    if (response.status !== 200) {           
                        return Promise.reject();
                        
                    }   
                
        
        
            console.log("Почта отправлена");
            

            modalThanksMessage.innerHTML = thanksMessage;


            let modal = new easyModal('modal-thanks', 
                                                        {
                                                            //zIndex: 1000, 
                                                            //background: 'rgba(12, 130, 121, 0.5)', 
                                                            //displayFog: 'block', //Значение по умолчанию flex
                                                            //displayModal: 'flex', //Значение по умолчанию block
                                                            showModalAnimationName: 'fadeInBottom', 
                                                            closeModalAnimationName: 'fadeOutTop', 
                                                            closeClasses: ['modal-close'], 
                                                            //closeModalOnFogClick: false, 
                                                            showModalAnimationDuration: 800,
                                                            //closeModalAnimationDuration: 300,
                                                            showFogAnimationName: 'fadeIn',
                                                            closeFogAnimationName: 'fadeOut',
                                                            showFogAnimationDuration: 300,
                                                            closeFogAnimationDuration: 300,
                                                
                                                            documentScrolled: false, 
                                                            //onModalClose: function(){console.log('modal close');},
                                                            //onModalOpen: function(){console.log('modal open');}
                                                
            });

            setTimeout( ()=>{
                modal.closeModal();
                inputs.forEach( (input) => {
                    input.value = "";
                });

                if ( message ) {
                    message.value = "";
                }
                setTimeout( () => {
                    modalThanksMessage.innerHTML ='';
                    

                }, 3000 )
            }, 2000)


            return response.text()
            })
            .then(i => console.log(i))
            .catch(() => {
                
                console.log('ошибка');

                

                

            }
            ); 
        }

    })
}) 