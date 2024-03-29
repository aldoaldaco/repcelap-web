/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState,
  updateLayout
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { menuIcon } from './my-icons.js';
import './snack-bar.js';
import './app-subheader.js';
import './app-subheader.js';

class MyApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean },
      _wideLayout: { type: Boolean }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          background-color: var(--app-primary-color);
          font-family: Repcelap, sans-serif;

          /*HEADER*/
          --app-header-background-color: var(--app-primary-color);
          --app-header-text-color: var(--app-forth-color);
          --app-header-selected-color: var(--app-forth-color);

          /*DRAWER*/
          --app-drawer-width: 256px;
          --app-drawer-background-color: var(--app-primary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909C;
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          font-family: Repcelap;
          z-index: 1;
        }

        .toolbar-top {
          background-color: var(--app-header-background-color);
        }

        [main-title] {
          font-family: 'Pacifico';
          text-transform: lowercase;
          font-size: 30px;
          margin-right: 44px;
        }

        .menu-btn {
          background: none;
          border: none;
          fill: var(--app-header-text-color);
          cursor: pointer;
          height: 44px;
          width: 44px;
        }

        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
        }

        .drawer-list > a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
        }

        .drawer-list > a[selected] {
          color: var(--app-drawer-selected-color);
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }

        .main-content {
          padding-top: 128px;
          min-height: 100vh;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }
        app-subheader {
          height: 100px;
          width: 100%;
        }
        footer {
          padding: 24px;
          color: var(--app-secondary-color);
          letter-spacing: 2px;
          text-align: center;
        }
        footer p span {
          color: var(--app-forth-color);
        }

        /* Wide layout */
        @media (min-width: 768px) {
          app-header,
          .main-content,
          footer {
            margin-left: 0;
          }
          .menu-btn {
            display: none;
          }

          [main-title] {
            margin-right: 0;
          }
        }
      `
    ];
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      
      <!-- Header -->
      <app-header fixed reveals effects="waterfall">
        <app-toolbar class="toolbar-top">
          <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">${menuIcon}</button>
          <div style="font-family: Repcelap;margin: 2rem 0;text-shadow: 0 0 5px var(--app-secondary-color)" main-title>${this.appTitle}</div>
        </app-toolbar>
      </app-header>
      <app-subheader fixed>
      </app-subheader>

      <!-- Drawer content -->

      
      <!-- Main content -->
      <main role="main" class="main-content">
        <productos-page class="page" ?active="${this._page === 'productos-page'}"></productos-page>
        <categorias-page class="page" ?active="${this._page === 'categorias-page'}"></categorias-page>
        <my-view2 class="page" ?active="${this._page === 'view2'}"></my-view2>
        <my-view3 class="page" ?active="${this._page === 'view3'}"></my-view3>
        <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
      </main>

      <footer>
        <p>Made with <span>&hearts;</span> by the <span>Repcelap</span> team. &copy; 2019</p>
      </footer>

      <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.
      </snack-bar>
    `;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 768px)`, (matches) => store.dispatch(updateLayout(matches)));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  _drawerOpenedChanged(e) {
    store.dispatch(updateDrawerState(e.target.opened));
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
    this._wideLayout = state.app.wideLayout;
  }
}

window.customElements.define('my-app', MyApp);
