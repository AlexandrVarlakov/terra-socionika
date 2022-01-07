maskPhone('#phone');

var mainSlider = new Swiper('.m-slider', {
    speed: 1000,
    
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

