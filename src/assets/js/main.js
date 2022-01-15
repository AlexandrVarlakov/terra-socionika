maskPhone('#phone');

var mainSlider = new Swiper('.m-slider', {
    speed: 1000,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    spaceBetween: 100,
    autoHeight: false,
    grabCursor: true,
    // Optional parameters
    
    // delay between transitions in ms
    
    slideToClickedSlide: true,
    navigation: {
        prevEl: '.prev-slide',
        nextEl: '.next-slide'
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});

var swiperPrograms = new Swiper(".swiper-programs", {
    speed: 1000,
    slidesPerView: 1,
    
    spaceBetween: 30,
    breakpoints: {
        1025: {
            grid: {
                rows: 2,
            },
        }
    },
    pagination: {
      el: ".programm-pagination",
      clickable: true,
    },
  });

  var clientsSwiper = new Swiper(".swiper-clients", {
    speed: 1000,
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    spaceBetween: 40,
    breakpoints: {
        1025: {
            slidesPerView: 4,
        },

        768: {
            slidesPerView: 3,
        },

        480: {
            slidesPerView: 2,
        }
    },
    
    navigation: {
        prevEl: '.prev-client',
        nextEl: '.next-client'
    },
    
  });


  
var reviewsSlider = new Swiper('.c-reviews-slider', {
    speed: 1000,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    slidesPerView: 1,
    spaceBetween: 100,
    navigation: {
        prevEl: '.prev-review',
        nextEl: '.next-review'
    },
    
});



document.addEventListener('DOMContentLoaded', function(){
    
    let hotLinks = document.querySelector('.hot-links');
    let page = document.querySelector('.section.page-2-col');
    let windowWidth = window.innerWidth;
    

    let leftCol = document.querySelector('.left-col');
    let linksList = document.querySelector('.link-list');

    if  (hotLinks && page)  {

        if (windowWidth < 1025){
            page.append(hotLinks);
        }

        window.addEventListener('resize', function(){
            let windowWidth = window.innerWidth;

            

            if ( windowWidth  < 1025) {
                if ( leftCol.querySelector('.hot-links') ){
                    page.append(hotLinks); 
                }
            } else {
                if ( !leftCol.querySelector('.hot-links') ){
                    
                    if ( linksList ) {
                        linksList.insertAdjacentElement('beforebegin', hotLinks);
                    } else {
                        leftCol.append(hotLinks);
                    }
                }
            }
        });

    }

})




let hamburger = document.querySelector('.hamburger');
let mobMenu = document.querySelector('.mob-menu');
let mobMenuClose = document.querySelector('.mob-menu__close');


hamburger.onclick = function(){
    mobMenu.classList.add('show');
    document.body.classList.add('no-scroll');
}

mobMenuClose.onclick = function(){
    mobMenu.classList.remove('show');
    document.body.classList.remove('no-scroll');
}


let mobParentItems = document.querySelectorAll('.mob-menu__item.has-child');



document.querySelectorAll('.mob-menu__item').forEach( (item) => {
    item.onclick = function(e){
        e.stopPropagation();
    }
} )

mobParentItems.forEach( (item) => {
    item.onclick = function(e){
        e.stopPropagation();
        if (this.getAttribute('data-state') == 'rolled'){

            


            let childListContainer = this.querySelector('.mob-menu__list-container');
            let childList = childListContainer.querySelector('.mob-menu__list');
            

            let childHeight = childList.clientHeight;

            function setAuto(  ){
                return 1;
            }

            new Promise ( function(resolve, reject) {

                childListContainer.ontransitionend = function(){
                    resolve(1);
                }

                
            }).then(function(){
                childListContainer.style.height = 'auto';
                childListContainer.ontransitionend = null;
                
            })
            

            childListContainer.style.height = childHeight + 'px';
            this.setAttribute('data-state', 'deploy');


            
            
        } else{
            this.setAttribute('data-state', 'rolled');

            let childListContainer = this.querySelector('.mob-menu__list-container');
            let childList = childListContainer.querySelector('.mob-menu__list');
            

            let childHeight = childListContainer.clientHeight;


            
            childListContainer.style.height = childHeight + 'px';
            setTimeout( ()=>{childListContainer.style.height = 0 + 'px'}, 10)
            
            
            
        }

    }
} )


let weHelpItem = document.querySelectorAll('.we-help-item');

if ( weHelpItem ) {
    weHelpItem.forEach( (item) => {
        item.onclick = function(){
            let windowWidth = window.innerWidth;
            if (windowWidth <= 580){
                let linkBlock = item.querySelector('.we-help-item__link');

                if ( linkBlock ){
                    window.location.href = linkBlock.href;
                }
                
            }
        }
    })
}



let options = {
    //zIndex: 1000, 
    //background: 'rgba(12, 130, 121, 0.5)', 
    //displayFog: 'block', //Значение по умолчанию flex
    //displayModal: 'flex', //Значение по умолчанию block
    //showModalAnimationName: 'fadeInBottom', 
    //closeModalAnimationName: 'fadeOutTop', 
    closeClasses: ['close-modal'], 
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

}

//document.querySelector('.btn-1').onclick = function(){
//let modal = new easyModal('modal-thanks', 
  //      {
            //zIndex: 1000, 
            //background: 'rgba(12, 130, 121, 0.5)', 
            //displayFog: 'block', //Значение по умолчанию flex
            //displayModal: 'flex', //Значение по умолчанию block
            //showModalAnimationName: 'fadeInBottom', 
            //closeModalAnimationName: 'fadeOutTop', 
       //     closeClasses: ['close-modal'], 
            //closeModalOnFogClick: false, 
         //   showModalAnimationDuration: 800,
            //closeModalAnimationDuration: 300,
           /* showFogAnimationName: 'fadeIn',
            closeFogAnimationName: 'fadeOut',
            showFogAnimationDuration: 300,
            closeFogAnimationDuration: 300,

            documentScrolled: false, */
            //onModalClose: function(){console.log('modal close');},
            //onModalOpen: function(){console.log('modal open');}

//        }
//);
//}
