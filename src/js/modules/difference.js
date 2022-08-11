export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.oldIndicator = 0;
        this.newIndicator = 0;
    }

    bindTriggers(container, arr, i) {
        container.querySelector('.plus').addEventListener('click', () => {
            if(i !== arr.length - 2) {
                arr[i].style.display = 'flex';
                arr[i].classList.add('animated', 'slideInUp');
                i++;
            }else {
                arr[i].style.display = 'flex';
                arr[i].classList.add('animated', 'slideInUp');
                arr[arr.length - 1].remove();
            }
        });
    }

    hideItems(mass) {
        mass.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    init() {
        this.hideItems(this.oldItems);
        this.hideItems(this.newItems);
        this.bindTriggers(this.oldOfficer, this.oldItems, this.oldIndicator);
        this.bindTriggers(this.newOfficer, this.newItems, this.newIndicator);
    }
}