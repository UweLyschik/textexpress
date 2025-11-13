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

const styles = /*css*/ `
:host {
    display: block;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--wpx-spacing-xs);
    margin-top: var(--wpx-spacing-xs);
}

.path {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    height: var(--wpx-control-height-md);
    border: 1px solid var(--wpx-color-neutral-70);
    border-radius: var(--wpx-border-radius-md);
    padding: 0 var(--wpx-spacing-xs);

    box-sizing: border-box;
}

.list {
    margin-top: var(--wpx-spacing-xs);
}

.spinner {
    display: flex;
    justify-content: center;
    font-size: 1.8rem;
    margin-top: 40px;
}
`;

class FilePicker extends HTMLElement {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.path = [];
        this.items = [];
        this.attachShadow({mode: 'open'});
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.root = this.shadowRoot;
        this.root.innerHTML = `
            <style>${styles}</style>
            <div class="header">
                <div class="path">
                    <wpx-breadcrumb></wpx-breadcrumb>
                </div>
                <wpx-button>Neuer Ordner</wpx-button>
            </div>
            <div class="list"></div>
        `;

        this.$breadcrumb = this.root.querySelector('wpx-breadcrumb');
        this.$list = this.root.querySelector('.list');
        this.navigateTo(null, 'Meine Ablage');
    }

    //-------------------------------------------------------------------
    //--- navigateTo(folderId, folderName)
    //-------------------------------------------------------------------
    navigateTo(folderId, folderName) {
        const last = this.path[this.path.length - 1];

        // Nur hinzufügen, wenn es ein neuer Ordner ist
        if (!last || last.id !== folderId) {
            this.path.push({id: folderId, name: folderName});
        }

        this.load(folderId);
    }

    //-------------------------------------------------------------------
    //--- navigateIndex(index) – Breadcrumb Klick
    //-------------------------------------------------------------------
    navigateIndex(index) {
        this.path = this.path.slice(0, index + 1);
        const current = this.path[this.path.length - 1];
        this.load(current.id);
    }

    //-------------------------------------------------------------------
    //--- load(parentId)
    //-------------------------------------------------------------------
    async load(parentId) {
        this.$list.innerHTML = `
            <div class="spinner">
                <wpx-spinner></wpx-spinner>
            </div>
        `;
        this.items = await Google_DriveService.getFolders(parentId);
        this.renderBreadcrumb();
        this.renderList();
    }

    //-------------------------------------------------------------------
    //--- renderBreadcrumb()
    //-------------------------------------------------------------------
    renderBreadcrumb() {
        this.$breadcrumb.innerHTML = this.path.map((p, i) => `
            <wpx-breadcrumb-item data-index="${i}">${p.name}</wpx-breadcrumb-item>
        `).join('');

        this.$breadcrumb.querySelectorAll('wpx-breadcrumb-item').forEach(el => {
            el.addEventListener('click', () => {
                const index = parseInt(el.dataset.index);
                this.navigateIndex(index);
            });
        });
    }

    //-------------------------------------------------------------------
    //--- renderList()
    //-------------------------------------------------------------------
    renderList() {
        this.$list.innerHTML = this.items.map(item => `
            <wpx-item data-id="${item.id}" data-type="${item.type}">
                <wpx-icon slot="prefix" name="${item.type === 'folder' ? 'folder' : 'file'}"></wpx-icon>
                ${item.name}
            </wpx-item>
        `).join("");

        this.$list.querySelectorAll('wpx-item').forEach(item => {
            // Einfach-Klick auf Datei
            item.addEventListener('wpx-click', () => {
                const id = item.dataset.id;
                const type = item.dataset.type;

                if (type === "folder") {
                    console.log("Folder clicked — waiting for double-click…");
                } else {
                    this.selectFile(id);
                }
            });

            // Doppel-Klick auf Ordner → Navigation
            item.addEventListener('dblclick', () => {
                if (item.dataset.type === "folder") {
                    this.navigateTo(item.dataset.id, item.textContent.trim());
                }
            });
        });
    }

    //-------------------------------------------------------------------
    //--- selectFile(fileId)
    //-------------------------------------------------------------------
    selectFile(fileId) {
        const file = this.items.find(i => i.id === fileId);
        this.dispatchEvent(new CustomEvent("file-selected", {
            detail: file,
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('google-file-picker', FilePicker);

const TRANSLATIONS = {
    en: {
        startTitle: 'Welcome to<br>TextExpress',
        startText1: 'Du kannst gleich loslegen.',
        startText2: 'TextExpress benötigt eine Google-Sheet Datei um Textbausteine und Einstellungen zu speichern.',
        startText3: 'Klicke auf "Neue Datei erstellen" um eine TextExpress-Datei anzulegen, oder öffne eine vorhandene Datei, die mit TextExpress erstellt wurde.',
        fileCreate: 'Datei erstellen',
        fileOpen: 'Datei öffnen',
        support: 'Support',
        documentation: 'Documentation'
    },
    de: {
        startTitle: 'Herzlich Willkommen<br>bei TextExpress!',
        startText1: 'Du kannst gleich loslegen.',
        startText2: 'TextExpress benötigt eine Google-Sheet Datei um Textbausteine und Einstellungen zu speichern.',
        startText3: 'Klicke auf "Neue Datei erstellen" um eine TextExpress-Datei anzulegen, oder öffne eine vorhandene Datei, die mit TextExpress erstellt wurde.',
        fileCreate: 'Datei erstellen',
        fileOpen: 'Datei öffnen',
        support: 'Support',
        documentation: 'Dokumentation'
    }
};

class Lang {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor(lang = 'de') {
        this.lang = lang;
    }

    //-------------------------------------------------------------------
    //--- setLang()
    //-------------------------------------------------------------------
    setLang(lang) {
        this.lang = lang;
        document.dispatchEvent(new CustomEvent('lang-change', {detail: lang}));
    }

    //-------------------------------------------------------------------
    //--- updateUI()
    //-------------------------------------------------------------------
    updateUI() {
        document.querySelectorAll('[data-txt]').forEach(el => {
            el.textContent = this.t(el.dataset.txt);
        });
    }

    //-------------------------------------------------------------------
    //--- t()
    //-------------------------------------------------------------------
    t(key, params = {}) {
        const translations = TRANSLATIONS[this.lang] || TRANSLATIONS['en'];
        let text = translations[key] || key;

        for (const p in params) {
            text = text.replace(`{{${p}}}`, params[p]);
        }
        return text;
    }
}

const lang = new Lang(navigator.language.startsWith('de') ? 'de' : 'en');

class Placeholders {

    #types = {};

    //-------------------------------------------------------------------
    //--- register()
    //-------------------------------------------------------------------
    register(type, config) {
        this.#types[type] = config;
    }

    //-------------------------------------------------------------------
    //--- get()
    //-------------------------------------------------------------------
    get(type) {
        return this.#types[type];
    }

    //-------------------------------------------------------------------
    //--- chip()
    //-------------------------------------------------------------------
    chip(ph, context = {}) {
        const t = this.get(ph.type);
        if (!t?.chip) return '';
        return t.chip(ph, context);
    }

    //-------------------------------------------------------------------
    //--- edit()
    //-------------------------------------------------------------------
    edit(ph, context = {}) {
        const t = this.get(ph.type);
        if (!t?.edit) return 'Dieser Platzhalter enthält keine Parameter!';
        return t.edit(ph, context);
    }

    //-------------------------------------------------------------------
    //--- renderUI()
    //-------------------------------------------------------------------
    renderUI(ph, context = {}) {
        const t = this.get(ph.type);
        if (!t?.renderUI) return '';
        return t.renderUI(ph, context);
    }

    //-------------------------------------------------------------------
    //--- execute()
    //-------------------------------------------------------------------
    execute(ph, context = {}) {
        const t = this.get(ph.type);
        if (!t?.execute) return '';
        return t.execute(ph, context);
    }

    //-------------------------------------------------------------------
    //--- list()
    //-------------------------------------------------------------------
    list() {
        return Object.entries(this.#types).map(([key, cfg]) => ({
            type: key,
            desc: cfg.desc || key,
            attrs: cfg.attrs || {}
        }));
    }

    //-------------------------------------------------------------------
    //--- extract()
    //-------------------------------------------------------------------
    extract(text) {
        const regex = /\{\{\s*([a-zA-Z0-9_.]+)(?::([^}]+))?\s*\}\}/g;
        const placeholders = [];
        let match;

        while ((match = regex.exec(text)) !== null) {
            const type = match[1].trim();
            const paramRaw = match[2];
            const attrs = {};

            if (paramRaw) {
                const paramRegex = /([a-zA-Z0-9_-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+)))?/g;
                let p;
                while ((p = paramRegex.exec(paramRaw)) !== null) {
                    const key = p[1];
                    const val = p[2] || p[3] || p[4] || true;
                    attrs[key] = val;
                }
            }

            placeholders.push({ type, attrs });
        }

        return placeholders;
    }

    //-------------------------------------------------------------------
    //--- getString()
    //-------------------------------------------------------------------
    getString(ph) {
        if (!ph || !ph.type) return '';

        // Platzhalter-String bauen
        const attrs = Object.entries(ph.attrs || {})
            .map(([key, val]) => {
                if (val === true) return key; // bool parameter (z.B. required)
                if (typeof val === 'string') {

                    // Wenn der Wert Leerzeichen oder Sonderzeichen enthält, mit Anführungszeichen umgeben
                    if (/\s|["']/.test(val)) {
                        const escaped = val.replace(/"/g, '&quot;'); // einfache Quote-Escapes
                        return `${key}="${escaped}"`;
                    }
                    return `${key}=${val}`;
                }
                return `${key}=${val}`;
            })
            .join(' ');

        return `{{${ph.type}${attrs ? ': ' + attrs : ''}}}`;
    }
}
// --- Singleton Export ---
const placeholders = new Placeholders();

//-------------------------------------------------------------------
//--- formatDate()
//-------------------------------------------------------------------
function formatDate(date = new Date(), format = "DD.MM.YYYY") {
    const map = {
        YYYY: date.getFullYear(),
        MM: String(date.getMonth() + 1).padStart(2, "0"),
        DD: String(date.getDate()).padStart(2, "0"),
        HH: String(date.getHours()).padStart(2, "0"),
        mm: String(date.getMinutes()).padStart(2, "0"),
        ss: String(date.getSeconds()).padStart(2, "0"),
        dddd: date.toLocaleDateString("de-DE", { weekday: "long" }),
        MMMM: date.toLocaleDateString("de-DE", { month: "long" }),
    };
    return format.replace(/YYYY|MM|DD|HH|mm|ss|dddd|MMMM/g, k => map[k] || k);
}

class PH_Date {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        this.type = 'date';
        this.desc = 'Fügt das aktuelle Datum ein.';
        this.attrs = {};
    }

    //-------------------------------------------------------------------
    //--- chip()
    //-------------------------------------------------------------------
    chip(ph, context = {}) {
        const f = ph.attrs.format || "DD.MM.YYYY";
        return `<span class="chip">${ph.type}: <b>${f}</b></span>`;
    }

    //-------------------------------------------------------------------
    //--- edit()
    //-------------------------------------------------------------------
    edit(ph, context = {}) {
        const f = ph.attrs.format || "DD.MM.YYYY";
        return `
            <wpx-input label="Format" hint="Der Format des Datums." value="${f}"></wpx-input>
        `;
    }

    //-------------------------------------------------------------------
    //--- execute()
    //-------------------------------------------------------------------
    execute(ph, context = {}) {
        const f = ph.attrs.format || "DD.MM.YYYY";
        return formatDate(new Date(), f);
    }
}

class PH_FormText {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        this.type = 'form.text';
        this.desc = 'Erstellt ein einzeiliges Eingabefeld.';
        this.attrs = {};
    }

    //-------------------------------------------------------------------
    //--- chip()
    //-------------------------------------------------------------------
    chip(ph, context = {}) {
        return `<span class="chip">${ph.type}</span>`;
    }

    //-------------------------------------------------------------------
    //--- edit()
    //-------------------------------------------------------------------
    edit(ph, context = {}) {
        return `
            <wpx-input label="Name (optional)" hint="Der Name des Textfelds." value=""></wpx-input>
            <wpx-input label="Standardwert" hint="Der Standardwert des Textfelds."></wpx-input>
        `;
    }

    //-------------------------------------------------------------------
    //--- renderUI()
    //-------------------------------------------------------------------
    renderUI(ph, context = {}) {
        const name = ph.attrs.name || '';
        return `<wpx-input label="${name}"></wpx-input>`;
    }

    //-------------------------------------------------------------------
    //--- execute()
    //-------------------------------------------------------------------
    execute(ph, context = {}) {
        return 'FORM.TEXT';
    }
}

class PH_Note {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        this.type = 'note';
        this.desc = 'Zeigt eine Notiz an. Wird nicht im entgütigen Inhalt angezeigt.';
        this.attrs = {};
    }

    //-------------------------------------------------------------------
    //--- chip()
    //-------------------------------------------------------------------
    chip(ph, context = {}) {
        return `<span class="chip">${ph.type}</span>`;
    }

    //-------------------------------------------------------------------
    //--- edit()
    //-------------------------------------------------------------------
    edit(ph, context = {}) {
        return `
            <wpx-textarea label="Text" hint="Der Inhalt der Notiz." value="${ph.attrs.text}"></wpx-textarea>
        `;
    }

    //-------------------------------------------------------------------
    //--- renderUI()
    //-------------------------------------------------------------------
    renderUI(ph, context = {}) {
        const text = ph.attrs.text || '';
        return `<div class="note">${text}</div>`;
    }

    //-------------------------------------------------------------------
    //--- execute()
    //-------------------------------------------------------------------
    execute(ph, context = {}) {}
}

//-------------------------------------------------------------------
//--- registerPlaceholders()
//-------------------------------------------------------------------
function registerPlaceholders() {
    placeholders.register('date', new PH_Date());
    placeholders.register('form.text', new PH_FormText());
    placeholders.register('note', new PH_Note());
}

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
        this.page = document.querySelector('[data-page="sidebar-start"]');
        if (!this.page) return;
        
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
            data: {hint: 'TEST'},
            width: 680,
            height: 400
        });
    }
};

const ModelSnippets = {

    snippets: [],
    test: `
        {{choice: name=gender options=m;w;d}}   // einfache key=value Parameter ohne Quotes
        {{input: required}}                     // bool-Flag ohne Wert
        {{input: required=false}}               // key=value mit bool-ähnlichem Wert
        {{field: label="Vor- und Nachname"}}    // Wert mit Leerzeichen in Quotes
        {{note: text='Hallo Welt' multiline}}   // Einzelwert in Quotes + bool-Flag
        {{doc: value=item.id}}                  // Punktnotation im Wert
        {{cursor}}                              // einfacher Platzhalter ohne Parameter
    `,

    //-------------------------------------------------------------------
    //--- load()
    //-------------------------------------------------------------------
    load() {
        //this.snippets = await SheetsService.getAllSnippets();
        this.snippets = [
            {
                label: "Anreden",
                snippets: [
                    {id: "1", label: "Note: Test", content: "{{form.text}} sdf {{note: text=hallo}}"},
                    {id: "2", label: "Platzhalter-Test", content: this.test}
                ]
            },
            {
                label: "Einleitungen",
                snippets: [
                    {id: "3", label: "Mit freundlichen Grüßen", content: "Mit freundlichen Grüßen\n{{#Name: bla=kkk}}"}
                ]
            }
        ];
    },

    //-------------------------------------------------------------------
    //--- getAll()
    //-------------------------------------------------------------------
    getAll() {
        return this.snippets;
    },

    //-------------------------------------------------------------------
    //--- getById()
    //-------------------------------------------------------------------
    getById(id) {
        return this.snippets.flatMap(cat => cat.snippets).find(s => s.id === id);
    },
    create() {},
    update() {},
    search() {},
    delete() {}
};

const DrawerManager = {

    drawers: {},

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init() {
        document.querySelectorAll('wpx-drawer[id]').forEach(drawer => {
            this.drawers[drawer.id] = drawer;
        });
    },

    //-------------------------------------------------------------------
    //--- show()
    //-------------------------------------------------------------------
    show(id) {
        const drawer = this.drawers[id];
        if (!drawer) return;
        drawer.show();
    },
};

const DrawerInsert = {

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init() {
        this.drawer = document.querySelector('#drawer-insert');
        this.drawer.addEventListener('click', this.handleClick.bind(this));
        this.refs = collectRefs(this.drawer);
    },

    //-------------------------------------------------------------------
    //--- show()
    //-------------------------------------------------------------------
    show(snippetObj) {
        this.refs['snippet-form'].innerHTML = '';
        this.refs['snippet-content'].innerHTML = '';
        this.refs['snippet-content'].innerHTML = snippetObj.content.replace(/\n/g, '<br>');
        
        const phList = placeholders.extract(snippetObj.content);

        if (phList.length > 0) {
            // Sammelt alle Platzhalter mit renderUI()
            const ui = phList.filter(ph => {
                const tempPH = placeholders.get(ph.type);
                return tempPH && typeof tempPH.renderUI === 'function';
            });

            // renderUI() für alle Platzhalter ausführen
            if (ui.length > 0) {
                const form = ui.map(ph => placeholders.get(ph.type).renderUI(ph)).join('');
                this.refs['snippet-form'].innerHTML = form;
            }
            console.log(phList);
        }

        this.drawer.label = snippetObj.label;
        this.drawer.show();
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
            'insert': () => console.log('insert'),
            'edit':   () => console.log('edit'),
            'copy':   () => console.log('copy'),
            'trash':  () => console.log('trash')
        };
        map[action]?.();
    }
};

const DrawerPlaceholder = {

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init() {
        this.drawer = document.querySelector('#drawer-placeholder');
        this.drawer.addEventListener('click', this.handleClick.bind(this));
        this.refs = collectRefs(this.drawer);
    },

    //-------------------------------------------------------------------
    //--- show()
    //-------------------------------------------------------------------
    show(ph) {
        const phDesc = this.refs['placeholder-desc'];
        const phForm = this.refs['placeholder-edit'];
        
        phDesc.innerHTML = ph.desc;
        phForm.innerHTML = '';
        phForm.innerHTML = placeholders.edit(ph);

        this.drawer.label = `{} Einfügen: ${ph.type}`;
        this.drawer.show();
        console.log(ph);
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
            'insert': () => console.log('insert')
        };
        map[action]?.();
    }
};

const PanelSnippets = {

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init() {
        this.panel = document.querySelector('#panel-snippets');  
        this.panel.addEventListener('click', this.handleClick.bind(this));
        this.refs = collectRefs(this.panel);

        this.listPlaceholders();
        this.listSnippets();
    },

    //-------------------------------------------------------------------
    //--- listPlaceholders()
    //-------------------------------------------------------------------
    listPlaceholders() {
        const phData = placeholders.list();
        const phList = this.refs['list-placeholders'];

        phList.innerHTML = '';
        phList.innerHTML = `
            <wpx-item size="sm">
                Platzhalter
                <wpx-icon slot="prefix" name="braces-asterisk"></wpx-icon>
                <div slot="subitems">
                    ${phData.map(ph => `
                        <wpx-item size="sm" data-type="${ph.type}">
                            {} ${ph.type}
                        </wpx-item>
                    `).join('')}
                </div>
            </wpx-item>
        `;

        phList.addEventListener('wpx-click', e => {
            const phItem = e.target.closest('wpx-item[data-type]');
            if (!phItem) return;

            const phType = phItem.dataset.type;
            const phObj = placeholders.get(phType);
            DrawerPlaceholder.show(phObj);
        });
    },

    //-------------------------------------------------------------------
    //--- listSnippets()
    //-------------------------------------------------------------------
    listSnippets() {
        ModelSnippets.load();
        const snippetData = ModelSnippets.getAll();
        const snippetList = this.refs['list-snippets'];

        snippetList.innerHTML = '';
        snippetList.innerHTML = `
            ${snippetData.map(cat => `
                <wpx-item size="sm" data-type="category">
                    ${cat.label}
                    <wpx-icon slot="prefix" name="folder"></wpx-icon>
                    <div slot="subitems">
                        ${cat.snippets.map(s => `
                            <wpx-item size="sm" data-type="snippet" data-id="${s.id}">
                                ${s.label}
                                <wpx-icon slot="prefix" name="file-text"></wpx-icon>
                            </wpx-item>
                        `).join('')}
                    </div>
                </wpx-item>
            `).join('')}
        `;

        snippetList.addEventListener('wpx-click', e => {
            const snippetItem = e.target.closest('wpx-item[data-type="snippet"]');
            if (!snippetItem) return;

            const snippetId = snippetItem.dataset.id;
            const snippetObj = ModelSnippets.getById(snippetId);
            DrawerInsert.show(snippetObj);
        });
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
            'add-snippet':   () => console.log('add-snippet'),
            'add-category':  () => console.log('add-category'),
            'settings':      () => DrawerManager.show('drawer-settings'),
            //'placeholder':   () => DrawerManager.show('drawer-placeholder'),
            'replace':       () => DrawerManager.show('drawer-replace'),
            'merge':         () => DrawerManager.show('drawer-merge')
        };
        map[action]?.();
    }
};

const PanelDataSource = {

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init() {
        this.panel = document.querySelector('#panel-datasource');        
        this.panel.addEventListener('click', this.handleClick.bind(this));
        this.refs = collectRefs(this.panel);
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

const SidebarIndex = {

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init() {
        this.page = document.querySelector('[data-page="sidebar-index"]');
        if (!this.page) return;

        PanelSnippets.init();
        PanelDataSource.init();
        DrawerManager.init();
        DrawerPlaceholder.init();
    }
};

const Addon_Docs = {

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init(page) {
        switch (page) {
            case 'sidebar-start':
                SidebarStart.init();
                break;
            case 'sidebar-index':
                SidebarIndex.init();
                break;
        }
    }
};

registerPlaceholders();
document.addEventListener('DOMContentLoaded', () => {

    const platform = document.body.dataset.platform;
    const page = document.body.dataset.page;

    //console.log('Platform:', platform);
    //console.log('Page:', page);

    switch (platform) {
        case 'docs':
            Addon_Docs.init(page);
            break;
    }

    lang.updateUI();
});

export { FilePicker };
//# sourceMappingURL=addon.js.map
