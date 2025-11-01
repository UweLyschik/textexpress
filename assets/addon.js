//-------------------------------------------------------------------
//--- UIService
//-------------------------------------------------------------------
const UIService = {

    //----------------------------------------------------
    //--- showDialog()
    //----------------------------------------------------
    showDialog(title, tmpl, width, height) {
        return new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .UIService_showDialog(title, tmpl, width, height);
        });
    },

    //----------------------------------------------------
    //--- showSidebar()
    //----------------------------------------------------
    showSidebar(title, tmpl, width) {
        return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            .UIService_showSidebar(title, tmpl, width);
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
            'file-create': () => console.log('file-create'),
            'file-open': () => this.showDialog()
        };
        map[action]?.();
    },

    showDialog() {
        UIService.showDialog('Datei wählen', 'addon-file-picker');
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
//# sourceMappingURL=addon.js.map
