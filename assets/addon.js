//-------------------------------------------------------------------
//--- Google_DriveService
//-------------------------------------------------------------------
const Google_DriveService = {

    //----------------------------------------------------
    //--- getFolders()
    //----------------------------------------------------
    getFolders(parentId = null) {
        return new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .DriveService_getFolders(parentId);
        });
    },

    //----------------------------------------------------
    //--- getFiles()
    //----------------------------------------------------
    getFiles(query = "", mimeType = null, limit = 50) {
        return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            .DriveService_getFiles(query, mimeType, limit);
        });
    }
};

class FilePicker extends HTMLElement {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.currentFolderId = null;
        this.items = [];
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.innerHTML = `
            <div class="gfp-wrapper">
                <div class="gfp-path"></div>
                <wpx-button>Neuer Ordner</wpx-button>
            </div>
            <div class="gfp-list"></div>
        `;

        this.$path = this.querySelector('.gfp-path');
        this.$list = this.querySelector('.gfp-list');
        this.load(null);
    }

    //-------------------------------------------------------------------
    //--- load()
    //-------------------------------------------------------------------
    async load(parentId) {
        this.currentFolderId = parentId;
        this.items = await Google_DriveService.getFolders();
        
        console.log(this.items);
        this.renderList(items);
    }

    //-------------------------------------------------------------------
    //--- renderList()
    //-------------------------------------------------------------------
    renderList() {
        this.$list.innerHTML = '';
        this.$list.innerHTML = this.items.map(item => `
            <wpx-item data-id="${item.id}" data-type="${item.type}">
                <wpx-icon slot="prefix" name="folder"></wpx-icon>
                ${item.name}
            </wpx-item>
        `).join("");
    }
}

customElements.define('google-file-picker', FilePicker);

//-------------------------------------------------------------------
//--- Google_UIService
//-------------------------------------------------------------------
const Google_UIService = {

    //----------------------------------------------------
    //--- showDialog()
    //----------------------------------------------------
    showDialog({title, file, data, width, height}) {
        return new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .UIService_showDialog(title, file, data, width, height);
        });
    },

    //----------------------------------------------------
    //--- showSidebar()
    //----------------------------------------------------
    showSidebar({title, file, data}) {
        return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            .UIService_showSidebar(title, file, data);
        });
    }
};

//-------------------------------------------------------------------
//--- collectRefs()
//-------------------------------------------------------------------
function collectRefs(root = document) {
    const refs = {};
    root.querySelectorAll("[data-ref]").forEach(el => {
        const name = el.dataset.ref.trim();
        if (name) refs[name] = el;
    });
    return refs;
}

const SidebarStart = {

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init() {
        this.page = document.querySelector('[data-page="start"]');        
        this.page.addEventListener('click', this.handleClick.bind(this));
        this.refs = collectRefs(this.page);
    },

    //-------------------------------------------------------------------
    //--- handleClick()
    //-------------------------------------------------------------------
    handleClick(e) {
        const action = e.target.closest('[data-action]')?.dataset.action;
        if (!action) return;
        this.runAction(action);
    },

    //-------------------------------------------------------------------
    //--- runAction()
    //-------------------------------------------------------------------
    runAction(action) {
        const map = {
            'file-create': () => this.showFilePicker('Datei erstellen'),
            'file-open': () => this.showFilePicker('Datei öffnen')
        };
        map[action]?.();
    },

    //-------------------------------------------------------------------
    //--- showFilePicker()
    //-------------------------------------------------------------------
    async showFilePicker(title) {
        await Google_UIService.showDialog({
            title: title,
            file: 'dialog-file-picker',
            data: {test: 'TEST'},
            width: 600,
            height: 360
        });
    }
};

const SidebarIndex = {

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init() {
        this.page = document.querySelector('[data-page="index"]');
        this.page.addEventListener('click', this.handleClick.bind(this));
        this.refs = collectRefs(this.page);
    },

    //-------------------------------------------------------------------
    //--- handleClick()
    //-------------------------------------------------------------------
    handleClick(e) {
        const action = e.target.closest('[data-action]')?.dataset.action;
        if (!action) return;
        this.runAction(action);
    },

    //-------------------------------------------------------------------
    //--- runAction()
    //-------------------------------------------------------------------
    runAction(action) {
        const map = {
            'add-snippet': () => console.log('add-snippet')
        };
        map[action]?.();
    }
};

// import {registerPlaceholders} from '../utils/ph/register.js';
// import {PanelSnippets}        from './panels/panel.snippets.js';
// import {PanelDataSource}      from './panels/panel.datasource.js';
// import {DrawerManager}        from './drawers/drawers.js';
// import {DrawerReplace}        from './drawers/drawer.replace.js';
// import {DrawerInsert}         from './drawers/drawer.insert.js';
// import {DrawerPlaceholder}    from './drawers/drawer.placeholder.js';


const UIDocs = {
    init() {
        const sidebarPage = document.body.dataset.page;
        console.log('Page:', sidebarPage);

        switch (sidebarPage) {
            case 'start':
                SidebarStart.init();
                break;
            case 'index':
                SidebarIndex.init();
                break;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    const platform = document.body.dataset.platform;
    console.log('Platform:', platform);

    switch (platform) {
        case 'docs':
            UIDocs.init();
            break;
    }
});

export { FilePicker };
//# sourceMappingURL=addon.js.map
