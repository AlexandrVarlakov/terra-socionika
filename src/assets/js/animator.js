/**
 * node - Узел DOM, который будет анимироваться
 * topLineSignal - верхняя граница, по пересечению которой, будет запускаться
 *                 анимация, значение по умолчанию 0
 * bottomLineSignal - нижняя граница, по пересечению которой, будет запускаться
 *                    анимация, значение по умолчанию 0
 * repeatAnimation - Количество запусков анимации, значение по умолчанию 999
 * animation - CSS-класс анимации
 * observe() - метод запускающий наблюдение за node
 * clientHeight - высота контентной области браузера
 * distanceToTop - растояние в px от clientHeight до верха node
 * distanceToBottom - растояние в px от clientHeight до низа node
 * scrollY - сколько проскроленно
 * inShow - node или topLineSignal или bottomLineSignal - появились в рабочей области браузера
 * classAdd() - метод добавляет CSS-класс для node
 * classRemove()- метод удаляет  CSS-класс у node
 * onInShow(callback = this.classAdd) - обработчик события  - node вошел в зону видимости
 * onNoVisble(callback = this.classRemove) - обработчик события  - node вышел из зоны видимости
 * getNode() - возращает ссылку на node
 */    

 
 /**
  * Version 0.02
  * Исправлена ошибка при добавлении пустого значения класса
  * Исправлено удаление результатов послдней анимации
  * 
  */
  class Animator extends EventTarget{
    constructor(node){
        super();
        this.node = document.querySelector(node);    
        //console.log(node)            ;
    }
        
    observe(animation = '', topLineSignal = 0, bottomLineSignal = 0, repeatAnimation = 999){
        this.animation = animation;
        this.topLineSignal = topLineSignal;
        this.bottomLineSignal = bottomLineSignal;
        this.repeatAnimation = repeatAnimation;        
        
        this.clientHeight = document.documentElement.clientHeight;
        this.distanceToTop = this.node.getBoundingClientRect().top;
        this.distanceToBottom = this.node.getBoundingClientRect().bottom;
        
        this.inShow = false;        
        //Отлавливаем изменение окна и меняем ключевые параметры
        window.addEventListener('resize', ()=>{
            this.clientHeight = document.documentElement.clientHeight;
            this.distanceToTop = this.node.getBoundingClientRect().top;
            this.distanceToBottom = this.node.getBoundingClientRect().bottom;
        });

        /** Получаем текущую прокрутку по вертикальной оси и следим за ней*/
        this.scrollY = window.pageYOffset;    
        //console.log("Стартовый Y", this.scrollY);
        window.addEventListener('scroll', ()=> {
        
            this.scrollY = window.pageYOffset;
            this.distanceToTop = this.node.getBoundingClientRect().top;
            this.distanceToBottom = this.node.getBoundingClientRect().bottom;
            //console.log("this scroll Y", this.scrollY);
        
            if ( ( this.distanceToTop - this.clientHeight ) > this.topLineSignal) {
                //'Не докрутили';
                //console.log('Не докрутили');
                this.inShow = false;
                let event = new Event('onNoVisible');
                this.dispatchEvent(event);
        
            } else if ( ( this.distanceToTop - this.clientHeight < this.topLineSignal ) 
                            && ( this.distanceToBottom >= (-1) * this.bottomLineSignal ) 
                                && this.inShow != true
                                && this.repeatAnimation > 0 ) {
                this.inShow = true;
                this.repeatAnimation--;
                let event = new Event('onInShow');
                this.dispatchEvent(event);
                        
            } else if ( ( this.distanceToTop - this.clientHeight < this.topLineSignal ) && ( this.distanceToBottom + this.bottomLineSignal <=  0 ) ){
                //'Перекрутили';
                //console.log('Перекрутили');
                this.inShow = false;
                let event = new Event('onNoVisible');
                this.dispatchEvent(event);
            }
        
        });
        
        return this;
    }
        
        
    //Добавляет класс элементу
    classAdd(){
        if ( this.animation.length > 0 )
            this.node.classList.add(this.animation);
    }
        
    //удаляет класс у элемента
    classRemove(){
        if ( ( this.animation.length > 0 ) && ( this.repeatAnimation > 0 ) )
            this.node.classList.remove(this.animation);
    }
    //обработчик события onInShow - передает this.classAdd
    onInShow(callback = this.classAdd){
        this.addEventListener('onInShow', callback);
        return this;
    }
        
    //Обработчик события ухода из поля видимости
    onNoVisble(callback = this.classRemove){
        this.addEventListener('onNoVisible', callback);
        return this;
    }
    //Запускает экземпляр класса с стандартными обрабоьчиками
    run() {
        this.onInShow(); 
        this.onNoVisble();   
    }
        
    getNode(){
        return this.node;    
    }
}
        
function animator(node) {
    return new Animator(node);
}


