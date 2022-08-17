export default class Form {
    constructor(forms, url) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
        loading: 'loading',
          success: 'thank you! we will call you back soon!',
          failure: 'something went wrong',
        };
        this.path = url;
    } 

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse = true;
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
        
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if(def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, a => {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
                
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('blur', createMask);
            input.addEventListener('focus', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    }

    clearInputs() {
        this.inputs.forEach(input => {
           input.value = '';
        });
    }

    checkMailInput() {
        const mailInputs = document.querySelectorAll('[type="email"]');
  
        mailInputs.forEach(input => {
          input.addEventListener('keypress', function(e) {
              if(e.key.match(/[^a-z 0-9 @ \.]/ig)) { // проверка регулярным выражением, чтобы вводились только символы a-z, 0-9, @, .;
                  e.preventDefault();
              }
          });
        });
    }

    init() {
        this.initMask();
        this.checkMailInput();
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        setTimeout(() => {
                            statusMessage.remove();
                            this.clearInputs();
                        },5000);
                    });
                    
            });
        });
    }
    
}