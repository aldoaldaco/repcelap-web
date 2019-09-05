import {html, css} from 'lit-element';
import { PageViewElement } from './page-view-element.js';

import { SharedStyles } from './shared-styles.js';

class CategoriasPage extends PageViewElement {
    static get styles() {
        return css`
        :host {
            width: 100%;
            height: 100vh;
        }
        `;
    }
    render() {
        return html`
            <video src="../../videos/video.mp4" autoplay loop muted></video>
        `;
    }
}

customElements.define('categorias-page', CategoriasPage);