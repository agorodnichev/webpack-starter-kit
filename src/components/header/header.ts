interface Item {
    label: string;
    href: string;
}

export class Header {
    items: Item[];
    block: HTMLElement;
    headerMessage: HTMLSpanElement;
    listGroup: HTMLUListElement;

    
    constructor(items: Item[]) {
        this.items = items;
        this.block = document.querySelector('.header');
        this.headerMessage = document.querySelector('.header__message');
        this.build();
    }

    subscribeOnResize(breakpoint?: number): void {
        // console.log({foo});
        const mediaQueryList = window.matchMedia(`(max-width: ${breakpoint}px)`);
        if (mediaQueryList.matches) {
            this.hideElement(this.headerMessage, false);
            this.hideElement(this.listGroup, true);
        } else {
            this.hideElement(this.headerMessage, true);
            this.hideElement(this.listGroup, false);
        }
        mediaQueryList.addEventListener('change', event => {
            if (event.matches) {
                this.hideElement(this.headerMessage, false);
                this.hideElement(this.listGroup, true);
            } else {
                this.hideElement(this.headerMessage, true);
                this.hideElement(this.listGroup, false);
            }
        });
    }

    private hideElement(element: HTMLElement, hide: boolean) {
        if (hide) {
            element.classList.add('header--hidden');
        } else {
            element.classList.remove('header--hidden');
        }
    }

    private build() {
        
        const root = this.getRootElement();
        
        const ul: HTMLUListElement = this.createUnorderedList();
        this.listGroup = ul;

        const listItems: HTMLLIElement[] = this.items.map((item: Item) => {
            return this.createListElementFromItem(item);
        });
        
        ul.append(...listItems);
        root.append(ul);
    }

    private getRootElement(): HTMLElement {
        const header = document.querySelector('.header') as HTMLElement;
        return header;
    }

    private createUnorderedList(): HTMLUListElement {
        const ul = document.createElement('ul');
        ul.classList.add('header__list-group');
        return ul;
    }

    private createListElementFromItem(item: Item): HTMLLIElement {
        const li = document.createElement('li') as HTMLLIElement;
        li.classList.add('header__list-item');
        const a = document.createElement('a') as HTMLAnchorElement;
        a.classList.add('header__link');
        a.innerHTML = item.label;
        a.href = item.href;
        li.appendChild(a);
        return li;
    }

}
