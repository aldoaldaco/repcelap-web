import { html,css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
// These are the elements needed by this element.
import { addToCartIcon, newProduct } from './my-icons.js';

class ProductosPage extends PageViewElement {
  static get styles() {
    return css`
    :host {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-wrap: wrap;
      background-color: var(--app-primary-color);
    }
    #productos {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .producto {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 280px;
      height: 410px;
      margin: 0.5rem;
      font-family: sans-serif;
      border-radius: 3px;
      background-color: var(--app-terciary-color);
      box-shadow: 0 0 3px 0 rgba(255,255,255, 0.6);
      z-index: 0;
    }
    .producto:hover {
      cursor: pointer;
      box-shadow: 0 0 10px 5px rgba(105,191,0, 0.6);
    }
    .producto-image {
      width: 100%;
      height: 60%;
      margin: 0;
      padding: 0;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--app-primary-color);
    }
    .producto-description {
      width: 100%;
      height: 40%;
      text-align: center;
      color: var(--app-secondary-color);
      display: flex;
      font-weight: lighter;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .producto-description h2 {
      width: 95%;
      margin: 0;
      color: var(--app-forth-color);
      text-align: center;
      letter-spacing: 1px;
      font-size: 0.9rem;
    }
    .producto-description p {
      width: 80%;
      color: var(--app-primary-color);
      text-align: center;
      font-size: 0.8rem;
    }
    .producto-add-cart-button {
      position: absolute;
      bottom: 5px;
      right: 5px;
      width: 64px;
      height: 64px;
      background-color: transparent;
      border: none;
      z-index: 0;
    }
    .producto-add-cart-button:focus {
      outline: none;
    }
    #productos-button {
      width: 100%;
      height: 64px;
      margin-top: 3rem;
      display: flex;
      justify-content: center;
    }
    .productos-more {
      width: 300px;
      height: 60px;
      border: none;
      border-radius: 3px;
      background-color: var(--app-sixth-color);
      color: var(--app-secondary-color);
      font-weight: bold;
      letter-spacing: 2px;
      font-size: 1rem;
      text-transform: uppercase;
    }
    .productos-more:hover { 
      cursor: pointer;
      color: var(--app-eight-color);
    }
    .productos-more:focus {
      outline: none;
    }
    .new,
    .new svg {
      position: absolute;
      top: 5px;
      left: 5px;
      fill: var(--app-primary-color);
      width: 34px;
      height: 34px;
    }
    `;
  }

  static get properties() {
    return {
      productos: { type: Array },
      moreProductsTextButton: { type: String }
    };
  }

  constructor() {
    super();
    this.productos = [1,1,1,1,1,1,1,1];
    this.moreProductsTextButton = 'Más productos';
  }

  render() {
    return html`
      <section id="productos">
        ${this.productos.map(item => {
          return html`
            <article class="producto">
              <div class="new">${newProduct}</div>
              <figure class="producto-image">
                <img src="https://imperiums.com.br/wp-content/uploads/2016/11/newshark.png" width="180" height="180"/>
              </figure>
              <div class="producto-description">
                <h2>Nombre de Producto</h2>    
                <p>Description del producto !loremaaaaa</p>
              </div>
              <button class="producto-add-cart-button"
                .disabled="${item.inventory === 0}"
                @click="${this._addButtonClicked}"
                data-index="${item.id}"
                title="${item.inventory === 0 ? 'Sold out' : 'Add to cart' }">
                ${item.inventory === 0 ? 'Sold out': addToCartIcon }
              </button>
            </article>
          `;
        })}
      </section>
      <section id="productos-button">
        <button class="productos-more">
          ${this.moreProductsTextButton}
        </button>
      </section>
    `;
  }
}

window.customElements.define('productos-page', ProductosPage);
