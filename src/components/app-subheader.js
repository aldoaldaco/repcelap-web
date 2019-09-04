import {html, css, LitElement} from 'lit-element';

class AppSubheader extends LitElement {
    static get properties() {
        return {
            fixed: { type: Boolean }
        };
    }
    static get styles() {
        return css`
            :host {
                height: auto;
                width: 100%;   
            }
            header {
                width: 100%;
                height: 44px;
                margin-top: 64px;
                margin-bottom: 128px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                background-color: var(--app-primary-color);
                z-index: 1;
            }
            header[fixed] {
                position: fixed;
            }
            button {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                padding: 0 1rem;
                font-size: 1rem;
                border: none;
                border-bottom: 1px solid;
                background-color: var(--app-primary-color);
                color: var(--app-secondary-color);
            }
            button:hover {
                cursor: pointer;
                transition-property: border-bottom-color;
                transition-duration: 0.5s;
                transition-timing-function: ease-in-out;
                border-bottom-color: var(--app-fifth-color);
            }
            button[active] {
                border-bottom: 1px solid var(--app-fifth-color);   
            }
            button:visited, button:focus {
                outline: none;
            }
            .shadow-box {
                box-shadow: 0 7px 7px 0 rgba(147, 47, 171, 0.6);
            }
        `;
    }
    constructor() {
        super();
        this.fixed = false;
        this.items = ['item','item','item','item','item'];
        this.moreProductsTextButton = 'Más productos';
    }
    connectedCallback() {
        super.connectedCallback();
    }
    firstUpdated(changedProperties) {
        this.shadowRoot.querySelectorAll('.item-subheader').forEach(element => {
            element.style.width = `calc(100% / ${this.items.length})`;
        });
        window.addEventListener('scroll', (event) => {
            if(window.scrollY > 0) {
                this._setShadowBox();
            } else {
                this._getShadowBox();
            } 
        });
    }
    render() {
        return html`
          <header ?fixed="${this.fixed}">
            ${this.items.map((item, index) => {
                return html`
                    <button role="button" @click="${this._setActiveAttribute}" data-index="${index}" class="item-subheader">${item}</button>
                `;
            })}
          </header>
        `;
    }
    _setShadowBox() {
        this.shadowRoot.querySelector('header').classList.add('shadow-box');
        this.shadowRoot.querySelectorAll('button').forEach(button => {
            button.style.borderBottomColor = 'var(--app-fifth-color)';
        });
    } 
    _getShadowBox() {
        this.shadowRoot.querySelector('header').classList.remove('shadow-box');
        this.shadowRoot.querySelectorAll('button').forEach(button => {
            button.style.borderBottomColor = '';
        });
    } 
    _setActiveAttribute(event) {
        this.shadowRoot.querySelectorAll('button').forEach(button => {
            button.removeAttribute('active');
        });
        event.target.setAttribute('active', true);
        console.log(event.target.dataset.index);
    }
}

window.customElements.define('app-subheader', AppSubheader);