interface Item {
    label: string;
    href: string;
}

export class Header {
    items: Item[];
    block: HTMLElement;
    
    constructor(items: Item[]) {
        this.items = items;
        this.block = document.querySelector('.header');
        if (!this.block) {
            throw new Error('cannot find .header class');
        }
        this.build();
    }

    private build() {
        
        const root = this.getRootElement();
        
        const ul: HTMLUListElement = this.createUnorderedList();

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
