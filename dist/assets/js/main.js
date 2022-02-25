maskPhone('#phone');

var mainSlider = new Swiper('.m-slider', {
    speed: 1000,
    loop: true,
    
    autoplay: {
        delay: 6000,
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


function roll(elem){
    elem.setAttribute('data-state', 'rolled');

    let childListContainer = elem.querySelector('.mob-menu__list-container');
    let childList = childListContainer.querySelector('.mob-menu__list');
            

    let childHeight = childListContainer.clientHeight;


            
    childListContainer.style.height = childHeight + 'px';
    setTimeout( ()=>{childListContainer.style.height = 0 + 'px'}, 10)
}

mobParentItems.forEach( (item) => {
    item.onclick = function(e){
        e.stopPropagation();

        
        

        if (this.getAttribute('data-state') == 'rolled'){

            let thisParent = item.parentElement;
            let childrenList = thisParent.children;
                       
            for (let i = 0; i < childrenList.length; i++){
                if (  childrenList[i].getAttribute('data-state') == 'deploy' ){
                    
                    roll(childrenList[i]);

                    let subDeployed = childrenList[i].querySelectorAll(".has-child[data-state='deploy']");

                    for (  let j = 0; j < subDeployed.length; j++){
                        roll(subDeployed[j]);
                    }

                    
                }
                
                
            }
            

            


           


            let childListContainer = this.querySelector('.mob-menu__list-container');
            let childList = childListContainer.querySelector('.mob-menu__list');
            

            let childHeight = childList.clientHeight;


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
            roll(this);
            
            
            
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













let resultsBlock  = document.querySelector('.i-results'); 


if ( resultsBlock ) {
    let fln1 = document.querySelector('#i-result-1');
    let fln2  = document.querySelector('#i-result-2');
    let fln3  = document.querySelector('#i-result-3');
    let fln4  = document.querySelector('#i-result-4');

    let results = animator('.i-results');
    results.observe('', 0, 0, 1).run();
    results.onInShow(function(){
    
        counter(0, 10, 1500, 1, fln1);
        counter(0, 1000, 1500, 77, fln2);
        counter(0, 20, 1500, 2, fln3);
        counter(0, 7, 1500, 1, fln4);
    })

}





function counter(_start = 0, end = 0, time = 1500, step = 1, node){
    let start = _start;
    let timer = setInterval(function(){
        start = start + step;
        node.innerText = start;
        if ( start >= end) {

            if (start > end){
                node.innerText = end;
            }

            clearInterval(timer);
        }
        
   }, (time * step) / end);
}


document.addEventListener("DOMContentLoaded", function(){

    let asideNav = document.querySelector('.aside-nav');


    

    if (asideNav){




        let windowWidth = document.body.scrollWidth;
        window.onscroll = function(){
            let windowWidth = document.body.scrollWidth;    

            if (windowWidth > 1024){
                let colWithNav = document.querySelector('.sociotypes-nav-block');
                let coor = colWithNav.getBoundingClientRect();

                if ( (coor.top + coor.height)  < -100) {
                    asideNav.classList.add('show');
                } else{
                    asideNav.classList.remove('show');
                }
            } else{
                asideNav.classList.add('show');
            }

            

            
        }
        


        window.addEventListener('resize', function(event){
            let windowWidth = document.body.scrollWidth;
            if ( windowWidth <=  1024){


                if ( asideNav.classList.contains('show') === false){
                    asideNav.classList.add('show')
                }
            } else {
                let colWithNav = document.querySelector('.sociotypes-nav-block');
                let coor = colWithNav.getBoundingClientRect();
                
                if ( (coor.top + coor.height)  < -100) {
                    asideNav.classList.add('show');
                } else{
                    asideNav.classList.remove('show');
                }
            }
        })


        let navMover = document.querySelector('.aside-nav__mover');
        let navMoverText = document.querySelector('.aside-nav__mover--text');
        


        
        
        navMover.onclick = function(){
            if (asideNav.classList.contains('active')){
                navMoverText.innerHTML = 'Типы';
                asideNav.classList.remove('active');
            } else{
                navMoverText.innerHTML = 'Скрыть';
                asideNav.classList.add('active');
            }
        }


        let maleBtn = document.querySelector('.aside-nav__sex--male');
        let femaleBtn = document.querySelector('.aside-nav__sex--female');

        let maleMenu = document.querySelector('.menu-male');
        let femaleMenu = document.querySelector('.menu-female');

        maleBtn.onclick = function(){
            if (this.classList.contains('active') === false ){
                femaleBtn.classList.remove('active');
                this.classList.add('active');
                femaleMenu.classList.remove('active');
                maleMenu.classList.add('active');
            } else {
                return false;
            }


        }
        femaleBtn.onclick = function(){
            if (this.classList.contains('active') === false ){
                maleBtn.classList.remove('active');
                this.classList.add('active');
                maleMenu.classList.remove('active');
                femaleMenu.classList.add('active');
            } else {
                return false;
            }

            
        }
        
    }
})

