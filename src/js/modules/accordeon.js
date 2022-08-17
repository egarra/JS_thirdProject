export default class Accordeon {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
    }

    init() {
        this.btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {

                const message = btn.closest('.module__info-show').nextElementSibling;
                message.classList.toggle('msg');
                message.style.marginTop = '20px';
                console.log(message);
               
                 
              
            });
        });
    }
}