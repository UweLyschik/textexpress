const baseStyles = /*css*/ `
:host {
    box-sizing: border-box;
}
:host *,
:host *::before,
:host *::after {
    box-sizing: inherit;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Element
//-------------------------------------------------------------------
class WPX_Element extends HTMLElement {

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: disabled
    //-------------------------------------------------------------------
    get disabled() {return this.hasAttribute('disabled');}
    set disabled(value) {
        value ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
    }

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
    }

    //-------------------------------------------------------------------
    //--- init()
    //-------------------------------------------------------------------
    init(styles) {
        if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
        }

        const css = [baseStyles, styles].flat().filter(Boolean);
        const style = document.createElement('style');

        style.textContent = css.join('\n');
        this.shadowRoot.appendChild(style);
    }

    //-------------------------------------------------------------------
    //--- setHtml()
    //-------------------------------------------------------------------
    setHtml(html) {
        const tmpl = document.createElement('template');
        tmpl.innerHTML = html;
        this.shadowRoot.append(tmpl.content.cloneNode(true));
    }
}

const variantStyles = /*css*/ `

/* neutral */
:host([variant="neutral"]) {
    --wpx-color-fill-strong: var(--wpx-color-neutral-40);
    --wpx-color-fill-normal: var(--wpx-color-neutral-80);
    --wpx-color-fill-weak: var(--wpx-color-neutral-90);
    --wpx-color-border-strong: var(--wpx-color-neutral-50);
    --wpx-color-border-normal: var(--wpx-color-neutral-80);
    --wpx-color-border-weak: var(--wpx-color-neutral-90);
    --wpx-color-on-strong: white; 
    --wpx-color-on-normal: var(--wpx-color-neutral-20); 
    --wpx-color-on-weak: var(--wpx-color-neutral-30);
}

/* primary */
:host([variant="primary"]) {
    --wpx-color-fill-strong: var(--wpx-color-primary-40);
    --wpx-color-fill-normal: var(--wpx-color-primary-80);
    --wpx-color-fill-weak: var(--wpx-color-primary-95);
    --wpx-color-border-strong: var(--wpx-color-primary-50);
    --wpx-color-border-normal: var(--wpx-color-primary-80);
    --wpx-color-border-weak: var(--wpx-color-primary-95);
    --wpx-color-on-strong: white; 
    --wpx-color-on-normal: var(--wpx-color-primary-20); 
    --wpx-color-on-weak: var(--wpx-color-primary-30);
}

/* success */
:host([variant="success"]) {
    --wpx-color-fill-strong: var(--wpx-color-success-40);
    --wpx-color-fill-normal: var(--wpx-color-success-80);
    --wpx-color-fill-weak: var(--wpx-color-success-95);
    --wpx-color-border-strong: var(--wpx-color-success-50);
    --wpx-color-border-normal: var(--wpx-color-success-80);
    --wpx-color-border-weak: var(--wpx-color-success-95);
    --wpx-color-on-strong: white; 
    --wpx-color-on-normal: var(--wpx-color-success-20); 
    --wpx-color-on-weak: var(--wpx-color-success-30);
}

/* warning */
:host([variant="warning"]) {
    --wpx-color-fill-strong: var(--wpx-color-warning-40);
    --wpx-color-fill-normal: var(--wpx-color-warning-80);
    --wpx-color-fill-weak: var(--wpx-color-warning-95);
    --wpx-color-border-strong: var(--wpx-color-warning-50);
    --wpx-color-border-normal: var(--wpx-color-warning-80);
    --wpx-color-border-weak: var(--wpx-color-warning-95);
    --wpx-color-on-strong: white; 
    --wpx-color-on-normal: var(--wpx-color-warning-20); 
    --wpx-color-on-weak: var(--wpx-color-warning-30);
}

/* danger */
:host([variant="danger"]) {
    --wpx-color-fill-strong: var(--wpx-color-danger-40);
    --wpx-color-fill-normal: var(--wpx-color-danger-80);
    --wpx-color-fill-weak: var(--wpx-color-danger-95);
    --wpx-color-border-strong: var(--wpx-color-danger-50);
    --wpx-color-border-normal: var(--wpx-color-danger-80);
    --wpx-color-border-weak: var(--wpx-color-danger-95);
    --wpx-color-on-strong: white; 
    --wpx-color-on-normal: var(--wpx-color-danger-20); 
    --wpx-color-on-weak: var(--wpx-color-danger-30);
}
`;

const styles$k = /*css*/ `
:host {
    display: block;
}

.alert {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--wpx-spacing-sm);
    border-width: 1px;
    border-style: solid;
    padding: var(--wpx-spacing-md);
}

:host(:not([open])) .alert {
  display: none;
}

/*------------------------------------*/
/* --- fill: solid ------------------ */
/*------------------------------------*/
:host([fill="solid"]) .alert {
    background-color: var(--wpx-color-fill-normal);
    border-color: var(--wpx-color-border-normal);
    color: var(--wpx-color-on-normal);
}

/*------------------------------------*/
/* --- fill: filled ----------------- */
/*------------------------------------*/
:host([fill="filled"]) .alert {
    background-color: var(--wpx-color-fill-weak);
    border-color: var(--wpx-color-border-normal);
    color: var(--wpx-color-on-normal);
}

/*------------------------------------*/
/* --- sizes ------------------------ */
/*------------------------------------*/
:host([size="sm"]) .alert {
    font-size: var(--wpx-font-size-sm);
    border-radius: var(--wpx-border-radius-md);
}

:host([size="md"]) .alert {
    font-size: var(--wpx-font-size-md);
    border-radius: var(--wpx-border-radius-md);
}

:host([size="lg"]) .alert {
    font-size: var(----wpx-font-size-lg);
    border-radius: var(--wpx-border-radius-md);
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Alert
//-------------------------------------------------------------------
class WPX_Alert extends WPX_Element {

    static get observedAttributes() {
        return ['open', 'variant', 'fill', 'size', 'duration'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: open
    //-------------------------------------------------------------------
    get open() {return this.hasAttribute('open');}
    set open(value) {
        value ? this.setAttribute('open', '') : this.removeAttribute('open');
    }

    //-------------------------------------------------------------------
    //--- Attribute: variant
    //-------------------------------------------------------------------
    get variant() {return this.getAttribute('variant');}
    set variant(value) {this.setAttribute('variant', value);}

    //-------------------------------------------------------------------
    //--- Attribute: fill
    //-------------------------------------------------------------------
    get fill() {return this.getAttribute('fill');}
    set fill(value) {this.setAttribute('fill', value);}

    //-------------------------------------------------------------------
    //--- Attribute: size
    //-------------------------------------------------------------------
    get size() {return this.getAttribute('size');}
    set size(value) {this.setAttribute('size', value);}

    //-------------------------------------------------------------------
    //--- Attribute: duration
    //-------------------------------------------------------------------
    get duration() {return this.getAttribute('duration') || '0';}
    set duration(value) {this.setAttribute('duration', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$k, variantStyles]);
        this.timer = null;
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.variant) this.variant = 'primary';
        if (!this.fill) this.fill = 'filled';
        if (!this.size) this.size = 'md';

        this.render();
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <div class="alert">
                <div class="icon"><slot name="icon"></slot></div>
                <div class="message"><slot></slot></div>
            </div>
        `);
    }

    //-------------------------------------------------------------------
    //--- show()
    //-------------------------------------------------------------------
    show() {
        this.open = true;

        const duration = parseInt(this.duration, 10);
        if (duration > 0) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.hide(), duration);
        }
    }

    //-------------------------------------------------------------------
    //--- hide()
    //-------------------------------------------------------------------
    hide() {
        this.open = false;
        clearTimeout(this.timer);
    }

    //-------------------------------------------------------------------
    //--- toast()
    //-------------------------------------------------------------------
    toast() {
        let stack = document.querySelector('.wpx-toast-stack');
        
        if (!stack) {
            stack = document.createElement('div');
            stack.className = 'wpx-toast-stack';
            document.body.appendChild(stack);
        }

        const toast = this.cloneNode(true);
        stack.appendChild(toast);
        toast.show();
    }
}

customElements.define('wpx-alert', WPX_Alert);

const styles$j = /*css*/ `
:host {
    display: inline-block;
    position: relative;
}

.button {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wpx-spacing-xs);
    font-family: var(--wpx-font-family);
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0 var(--wpx-spacing-sm);
    outline: 0;
    border-width: 1px;
    border-style: solid;
    transition: all var(--wpx-transition-fast) ease;
    user-select: none;
    cursor: pointer;
}

.icon-button {padding: 0;}

/*------------------------------------*/
/* --- sizes ------------------------ */
/*------------------------------------*/

/* +++ small +++++++++++++++++++++++++*/
:host([size="sm"]) .button {
    height: var(--wpx-control-height-sm);
    font-size: var(--wpx-btn-font-size-sm);
    border-radius: var(--wpx-border-radius-md);
}
:host([size="sm"]) .icon-button {
    width: var(--wpx-control-height-sm);
}

/* +++ medium ++++++++++++++++++++++++*/
:host([size="md"]) .button {
    height: var(--wpx-control-height-md);
    font-size: var(--wpx-btn-font-size-md);
    border-radius: var(--wpx-border-radius-md);
}
:host([size="md"]) .icon-button {
    width: var(--wpx-control-height-md);
    font-size: var(--wpx-font-size-md);
}

/* +++ large +++++++++++++++++++++++++*/
:host([size="lg"]) .button {
    height: var(--wpx-control-height-lg);
    font-size: var(--wpx-btn-font-size-lg);
    border-radius: var(--wpx-border-radius-md);
}
:host([size="lg"]) .icon-button {
    width: var(--wpx-control-height-lg);
}

/*------------------------------------*/
/* --- fill ------------------------- */
/*------------------------------------*/

/* +++ default +++++++++++++++++++++++*/
:host([fill="default"]) .button {
    background-color: transparent;
    border-color: var(--wpx-color-neutral-50);
    color: var(--wpx-color-neutral-30);
}

:host([fill="default"]) .button:hover {
    background-color: var(--wpx-color-fill-weak);
    border-color: var(--wpx-color-border-strong);
    color: var(--wpx-color-on-weak);
}

:host([fill="default"]) .button:active {
    background-color: color-mix(in srgb, var(--wpx-color-fill-normal) 40%, white);
}

/* +++ solid +++++++++++++++++++++++++*/
:host([fill="solid"]) .button {
    background-color: var(--wpx-color-fill-strong);
    border-color: var(--wpx-color-border-strong);
    color: var(--wpx-color-on-strong);
}

:host([fill="solid"]) .button:hover {
    background-color: color-mix(in srgb, var(--wpx-color-fill-strong) 85%, white);
    border-color: color-mix(in srgb, var(--wpx-color-fill-strong) 85%, white);
}

:host([fill="solid"]) .button:active {
    background-color: var(--wpx-color-fill-strong);
    border-color: var(--wpx-color-border-strong);
}

/* +++ filled ++++++++++++++++++++++++*/
:host([fill="filled"]) .button {
    background-color: var(--wpx-color-fill-normal);
    border-color: var(--wpx-color-border-normal);
    color: var(--wpx-color-on-normal);
}

:host([fill="filled"]) .button:hover {
    background-color: color-mix(in srgb, var(--wpx-color-fill-normal) 70%, white);
    border-color: color-mix(in srgb, var(--wpx-color-fill-normal) 70%, white);
}

:host([fill="filled"]) .button:active {
    background-color: var(--wpx-color-fill-normal);
    border-color: var(--wpx-color-border-normal);
}

/* +++ outline +++++++++++++++++++++++*/
:host([fill="outline"]) .button {
    background-color: transparent;
    border-color: var(--wpx-color-border-strong);
    color: var(--wpx-color-on-weak);
}

:host([fill="outline"]) .button:hover {
    background-color: var(--wpx-color-fill-weak);
}

:host([fill="outline"]) .button:active {
    background-color: color-mix(in srgb, var(--wpx-color-fill-normal) 55%, white);
}

/* +++ flat ++++++++++++++++++++++++++*/
:host([fill="flat"]) .button {
    background-color: transparent;
    border-color: transparent;
    color: var(--wpx-color-on-weak);
}

:host([fill="flat"]) .button:hover {
    background-color: var(--wpx-color-fill-weak);
}

:host([fill="flat"]) .button:active {
    background-color: color-mix(in srgb, var(--wpx-color-fill-normal) 40%, white);
}

/* +++ none ++++++++++++++++++++++++++*/
:host([fill="none"]) .button,
:host([fill="none"]) .icon-button  {
    background-color: transparent;
    border-color: transparent;
    color: var(--wpx-color-on-weak);
    border: none;
    height: auto;
    width: auto;
    padding: 0;
}

:host([fill="none"]) .button:hover {
    color: color-mix(in srgb, var(--wpx-color-fill-strong) 85%, white);
}

:host([fill="none"]) .button:active {
    color: var(--wpx-color-on-weak);
}

/*------------------------------------*/
/* --- pill --------------------------*/
/*------------------------------------*/
:host([pill]) .button {
    border-radius: var(--wpx-border-radius-pill);
}

/*------------------------------------*/
/* --- slots -------------------------*/
/*------------------------------------*/
::slotted([slot="prefix"]) {flex: 0 0 auto;}
::slotted([slot="suffix"]) {flex: 0 0 auto;}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Button
//-------------------------------------------------------------------
class WPX_Button extends WPX_Element {

    static get observedAttributes() {
        return ['variant', 'fill', 'size', 'href', 'target', 'pill', 'caret', 'disabled'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: variant
    //-------------------------------------------------------------------
    get variant() {return this.getAttribute('variant');}
    set variant(value) {this.setAttribute('variant', value);}

    //-------------------------------------------------------------------
    //--- Attribute: fill
    //-------------------------------------------------------------------
    get fill() {return this.getAttribute('fill');}
    set fill(value) {this.setAttribute('fill', value);}

    //-------------------------------------------------------------------
    //--- Attribute: size
    //-------------------------------------------------------------------
    get size() {return this.getAttribute('size');}
    set size(value) {this.setAttribute('size', value);}

    //-------------------------------------------------------------------
    //--- Attribute: href
    //-------------------------------------------------------------------
    get href() {return this.getAttribute('href');}
    set href(value) {this.setAttribute('href', value);}

    //-------------------------------------------------------------------
    //--- Attribute: target
    //-------------------------------------------------------------------
    get target() {return this.getAttribute('target');}
    set target(value) {this.setAttribute('target', value);}

    //-------------------------------------------------------------------
    //--- Attribute: pill
    //-------------------------------------------------------------------
    get pill() {return this.hasAttribute('pill');}
    set pill(value) {
        value ? this.setAttribute('pill', '') : this.removeAttribute('pill');
    }

    //-------------------------------------------------------------------
    //--- Attribute: caret
    //-------------------------------------------------------------------
    get caret() {return this.hasAttribute('caret');}
    set caret(value) {
        value ? this.setAttribute('caret', '') : this.removeAttribute('caret');
    }

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$j, variantStyles]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.variant) this.variant = 'primary';
        if (!this.fill) this.fill = 'default';
        if (!this.size) this.size = 'md';
        
        this.render();
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        let btn;

        if (!this.href) {
            btn = document.createElement('button');
            btn.setAttribute('type', 'button');
        } else {
            btn = document.createElement('a');
            btn.setAttribute('href', this.href);
            if (this.target) btn.setAttribute('target', this.target);
        }

        btn.className = 'button';     
        btn.innerHTML = `
            <slot name="prefix"></slot>
            <slot></slot>
            <slot name="suffix"></slot>
            ${this.caret ? '<wpx-icon name="chevron-down"></wpx-icon>' : ''}
        `;

        this.shadowRoot.append(btn);

        // --- check: ist im default slot nur ein einziges <wpx-icon>? ---
        const slotContent = this.querySelectorAll(':scope > *:not([slot])');
        if (slotContent.length === 1 && slotContent[0].tagName.toLowerCase() === 'wpx-icon') {
            btn.classList.add('icon-button');
        }
    }

    //-------------------------------------------------------------------
    //--- attributeChangedCallback()
    //-------------------------------------------------------------------
    attributeChangedCallback(name, oldValue, newValue) {

    }
}

customElements.define('wpx-button', WPX_Button);

const controlStyles = /*css*/ `
.control-label {
    color: var(--wpx-color-neutral-20);
}

.control-hint {
    font-size: var(--wpx-font-size-sm);
    color: var(--wpx-color-neutral-50);
}
`;

const styles$i = /*css*/ `
:host {
    display: inline-flex;
    flex-direction: column;
    gap: var(--wpx-spacing-xs);
}

label {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--wpx-spacing-xs);
    cursor: pointer;
}

input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

/*------------------------------------*/
/* --- checked ---------------------- */
/*------------------------------------*/
input[type="checkbox"]:checked + .box {
    background: var(--wpx-color-primary-50);
    border-color: var(--wpx-color-primary-50);
}
input[type="checkbox"]:checked + .box wpx-icon {
    opacity: 1;
    transform: scale(1);
}

/*------------------------------------*/
/* --- box -------------------------- */
/*------------------------------------*/
.box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    border: 1px solid var(--wpx-color-neutral-60);
    background-color: var(--wpx-color-neutral-100);
    transition: background-color 0.12s ease
}

.box wpx-icon {
    opacity: 0;
    transform: scale(0.4);
    transition: opacity 0.18s ease, transform 0.18s ease 0.1s;
    pointer-events: none;
    color: var(--wpx-color-neutral-100);
}

/*------------------------------------*/
/* --- disabled --------------------- */
/*------------------------------------*/
:host([disabled]) {
    opacity: 0.6;
    cursor: not-allowed;
}

/*------------------------------------*/
/* --- sizes ------------------------ */
/*------------------------------------*/
:host([size="sm"]) label {
    font-size: var(--wpx-font-size-sm);
}

:host([size="md"]) label {
    font-size: var(--wpx-font-size-md);
}

:host([size="lg"]) label {
    font-size: var(--wpx-font-size-lg);
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Checkbox
//-------------------------------------------------------------------
class WPX_Checkbox extends WPX_Element {

    static get observedAttributes() {
        return ['checked', 'value', 'size', 'hint', 'disabled'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: checked
    //-------------------------------------------------------------------
    get checked() {return this.hasAttribute('checked');}
    set checked(value) {
        value ? this.setAttribute('checked', '') : this.removeAttribute('checked');
    }

    //-------------------------------------------------------------------
    //--- Attribute: value
    //-------------------------------------------------------------------
    get value() {return this.getAttribute('value') || '';}
    set value(value) {this.setAttribute('value', value);}

    //-------------------------------------------------------------------
    //--- Attribute: size
    //-------------------------------------------------------------------
    get size() {return this.getAttribute('size');}
    set size(value) {this.setAttribute('size', value);}

    //-------------------------------------------------------------------
    //--- Attribute: hint
    //-------------------------------------------------------------------
    get hint() {return this.getAttribute('hint') || '';}
    set hint(value) {this.setAttribute('hint', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$i, controlStyles]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.size) this.size = 'md';
        this.render();

        this.input = this.shadowRoot.querySelector('input');
        this.input.checked = this.checked;
        this.input.disabled = this.disabled;
        this.input.value = this.value;

        this.input.addEventListener('change', () => this.onChange());
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <label>
                <input type="checkbox">
                <span class="box">
                    <wpx-icon name="check"></wpx-icon>
                </span>
                <slot class="control-label"></slot>
            </label>
        `);

        if (this.hint) {
            this.setHtml(`
                <div class="control-hint">
                    ${this.hint}
                </div>
            `);
        }
    }

    //-------------------------------------------------------------------
    //--- onChange()
    //-------------------------------------------------------------------
    onChange() {
        if (this.disabled) return;

        this.checked = this.input.checked;
        this.dispatchEvent(new CustomEvent('wpx-change', {
            detail: {checked: this.checked, value: this.value},
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('wpx-checkbox', WPX_Checkbox);

const styles$h = /*css*/ `
:host {
    display: block;
}

.details {
    display: flex;
    flex-direction: column;
    border-width: 1px;
    border-style: solid;
    border-radius: var(--wpx-border-radius-md);
}

/*------------------------------------*/
/* --- header ------------------------*/
/*------------------------------------*/
.details--header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--wpx-spacing-xs);
    padding: var(--wpx-spacing-sm);
    cursor: pointer;
}

/*------------------------------------*/
/* --- content -----------------------*/
/*------------------------------------*/
.details--content {
    padding: var(--wpx-spacing-xs) var(--wpx-spacing-sm);
    display: none;
}
:host([open]) .details--content {
    display: block;
}

/*------------------------------------*/
/* --- fill ------------------------- */
/*------------------------------------*/

/* +++ outline +++++++++++++++++++++++*/
:host([fill="outline"]) .details {
    background-color: white;
    border-color: var(--wpx-control-border-color);
    color: var(--wpx-color-neutral-30);
}

/* +++ filled ++++++++++++++++++++++++*/
:host([fill="filled"]) .details {
    background-color: var(--wpx-color-neutral-90);
    border-color: var(--wpx-color-neutral-90);
    color: var(--wpx-color-neutral-30);
}

/* +++ flat ++++++++++++++++++++++++++*/
:host([fill="flat"]) .details {
    background-color: transparent;
    border-color: transparent;
    color: var(--wpx-color-neutral-30);
}

/*------------------------------------*/
/* --- slots -------------------------*/
/*------------------------------------*/
slot[name="label"] {
    flex: 1;
    display: block;
}

:host([open]) slot[name="show-icon"],
:host(:not([open])) slot[name="hide-icon"] {
    display: none;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Details
//-------------------------------------------------------------------
class WPX_Details extends WPX_Element {

    static get observedAttributes() {
        return ['open', 'label', 'fill', 'disabled'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: open
    //-------------------------------------------------------------------
    get open() {return this.hasAttribute('open');}
    set open(value) {
        value ? this.setAttribute('open', '') : this.removeAttribute('open');
    }

    //-------------------------------------------------------------------
    //--- Attribute: label
    //-------------------------------------------------------------------
    get label() {return this.getAttribute('label') || '';}
    set label(value) {this.setAttribute('label', value);}

    //-------------------------------------------------------------------
    //--- Attribute: fill
    //-------------------------------------------------------------------
    get fill() {return this.getAttribute('fill');}
    set fill(value) {this.setAttribute('fill', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$h]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.fill) this.fill = 'outline';
        this.render();

        const header = this.shadowRoot.querySelector('.details--header');
        if (!header) return;

        header.addEventListener('click', () => {
            if (!this.disabled) {
                this.toggle();
            }
        });
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <div class="details">
                <div class="details--header">
                    <slot name="prefix"></slot>
                    <slot name="label">${this.label}</slot>
                    <slot name="suffix"></slot>
                    <slot name="show-icon"><wpx-icon name="chevron-down"></wpx-icon></slot>
                    <slot name="hide-icon"><wpx-icon name="chevron-up"></wpx-icon></slot>
                </div>
                <div class="details--content">
                    <slot></slot>
                </div>
            </div>
        `);
    }

    //-------------------------------------------------------------------
    //--- toggle()
    //-------------------------------------------------------------------
    toggle() {
        this.open = !this.open;
    }
}

customElements.define('wpx-details', WPX_Details);

const styles$g = /*css*/ `
:host {
    --width: 600px;
    display: none;
}

/*------------------------------------*/
/* --- dialog ----------------------- */
/*------------------------------------*/
.dialog {
    display: flex;
    flex-direction: column;
    max-width: var(--width);
    width: 90%;
    background: var(--wpx-color-neutral-100);
    padding: var(--wpx-spacing-md);
    box-shadow: var(--wpx-shadow-lg);
    border-radius: var(--wpx-border-radius-lg);
    border: none;
}

.dialog:focus {outline: none;}
.dialog::backdrop {
    background: rgba(0,0,0,0.2);
    animation: show-backdrop var(--wpx-transition-normal) ease forwards;
}

/* Open state */
:host([open]) {
    display: block;
}

/* Animation */
.dialog[open] {
    animation: show-dialog var(--wpx-transition-normal) ease;
}

@keyframes show-dialog {
    from {opacity: 0; transform: scale(0.8);}
    to   {opacity: 1; transform: scale(1);}
}
@keyframes show-backdrop {
    from {opacity: 0;}
    to   {opacity: 1;}
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Dialog
//-------------------------------------------------------------------
class WPX_Dialog extends WPX_Element {

    static get observedAttributes() {
        return ['open'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: open
    //-------------------------------------------------------------------
    get open() {return this.hasAttribute('open');}
    set open(value) {
        value ? this.setAttribute('open', '') : this.removeAttribute('open');
        value ? this.dialog.showModal() : this.dialog.close();
    }

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$g]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.render();
        
        this.dialog = this.shadowRoot.querySelector('dialog');
        this.dialog.addEventListener('close', () => {
            this.hide();
        });
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <dialog class="dialog">
                <slot name="header"></slot>
                <slot></slot>
                <slot name="footer"></slot>
            </dialog>
        `);
    }

    //-------------------------------------------------------------------
    //--- show()
    //-------------------------------------------------------------------
    show() {
        if (this.open) return;
        this.dispatchEvent(new CustomEvent('wpx-show', {bubbles: true}));
        this.open = true;
    }

    //-------------------------------------------------------------------
    //--- hide()
    //-------------------------------------------------------------------
    hide() {
        if (!this.open) return;
        this.dispatchEvent(new CustomEvent('wpx-hide', {bubbles: true}));
        this.open = false;
    }
}

customElements.define('wpx-dialog', WPX_Dialog);

const styles$f = /*css*/ `
:host {
    --color: var(--wpx-color-neutral-80);
    --width: 1px;
    --spacing: var(--wpx-spacing-xs2);

    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Divider
//-------------------------------------------------------------------
class WPX_Divider extends WPX_Element {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$f]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.setAttribute('role', 'separator');
    }
}

customElements.define('wpx-divider', WPX_Divider);

const styles$e = /*css*/ `
:host {
    --size: 300px;
    position: fixed;
    inset: 0;
    z-index: 1000;
    pointer-events: none; 
}

/*------------------------------------*/
/* --- backdrop --------------------- */
/*------------------------------------*/
.backdrop {
    position: absolute;
    inset: 0;
    opacity: 0;
    background: rgba(0,0,0,0.3);
    transition: opacity var(--wpx-transition-slow) ease;
}

/*------------------------------------*/
/* --- drawer ----------------------- */
/*------------------------------------*/
.drawer {
    position: absolute;
    display: flex;
    flex-direction: column;
    background: var(--wpx-color-neutral-100);
    box-shadow: var(--wpx-shadow-lg);
    transition: transform var(--wpx-transition-slow) ease;
}

/* header */
header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--wpx-spacing-md);
    border-bottom: 1px solid var(--wpx-color-neutral-70);
}

slot[name="label"] {
    flex: 1;
    display: block;
    font-weight: 500;
}

/* body */
.body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: var(--wpx-spacing-md);
    overflow-y: auto;
}

/* footer */
::slotted([slot="footer"]) {
    flex: 0 0 auto;
    padding: var(--wpx-spacing-md);
    border-top: 1px solid var(--wpx-color-neutral-80);
}

/*------------------------------------*/
/* --- placement -------------------- */
/*------------------------------------*/
:host([placement="left"]) .drawer {
    top: 0; bottom: 0; left: 0;
    width: var(--size);
    transform: translateX(-100%);
}
:host([placement="right"]) .drawer {
    top: 0; bottom: 0; right: 0;
    width: var(--size);
    transform: translateX(100%);
}
:host([placement="top"]) .drawer {
    top: 0; left: 0; right: 0;
    height: var(--size);
    transform: translateY(-100%);
}
:host([placement="bottom"]) .drawer {
    bottom: 0; left: 0; right: 0;
    height: var(--size);
    transform: translateY(100%);
}

/* Open state */
:host([open]) {pointer-events: auto;}
:host([open]) .backdrop {opacity: 1;}

:host([open][placement="left"]) .drawer,
:host([open][placement="right"]) .drawer,
:host([open][placement="top"]) .drawer,
:host([open][placement="bottom"]) .drawer {
    transform: translate(0,0);
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Drawer
//-------------------------------------------------------------------
class WPX_Drawer extends WPX_Element {

    static get observedAttributes() {
        return ['open', 'label', 'placement'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: open
    //-------------------------------------------------------------------
    get open() {return this.hasAttribute('open');}
    set open(value) {
        value ? this.setAttribute('open', '') : this.removeAttribute('open');
    }

    //-------------------------------------------------------------------
    //--- Attribute: label
    //-------------------------------------------------------------------
    get label() {return this.getAttribute('label') || '';}
    set label(value) {this.setAttribute('label', value);}

    //-------------------------------------------------------------------
    //--- Attribute: placement
    //-------------------------------------------------------------------
    get placement() {return this.getAttribute('placement');}
    set placement(value) {this.setAttribute('placement', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$e]);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.placement) this.placement = 'right';
        this.render();
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <div class="backdrop"></div>
            <div class="drawer">
                <header>
                    <slot name="label">${this.label}</slot>
                    <wpx-icon name="x-lg" id="close"></wpx-icon>
                </header>
                <div class="body"><slot></slot></div>
                <footer>
                    <slot name="footer"></slot>
                </footer>
            </div>
        `);

        this.shadowRoot.querySelector('#close').addEventListener('click', () => this.hide());
        this.shadowRoot.querySelector('.backdrop').addEventListener('click', () => this.hide());
    }

    //-------------------------------------------------------------------
    //--- show()
    //-------------------------------------------------------------------
    show() {
        if (this.open) return;
        this.dispatchEvent(new CustomEvent('wpx-show', {bubbles: true}));
        document.addEventListener('keydown', this.onKeyDown);
        this.open = true;
    }

    //-------------------------------------------------------------------
    //--- hide()
    //-------------------------------------------------------------------
    hide() {
        if (!this.open) return;
        this.dispatchEvent(new CustomEvent('wpx-hide', {bubbles: true}));
        document.removeEventListener('keydown', this.onKeyDown);
        this.open = false;
    }

    //-------------------------------------------------------------------
    //--- onKeyDown()
    //-------------------------------------------------------------------
    onKeyDown(ev) {
        if (ev.key === 'Escape') this.hide();
    }

    //-------------------------------------------------------------------
    //--- attributeChangedCallback()
    //-------------------------------------------------------------------
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'label' && oldValue !== newValue) {
            const slot = this.shadowRoot.querySelector('slot[name="label"]');
            if (slot) slot.textContent = newValue;
        }
    }
}

customElements.define('wpx-drawer', WPX_Drawer);

const styles$d = /*css*/ `
:host {
    display: inline-block;
    position: relative;
}

:host wpx-popup {
    min-width: 150px;
    background-color: var(--wpx-color-neutral-100);
    border: 1px solid var(--wpx-color-neutral-80);
    border-radius: var(--wpx-border-radius-md);
    padding: var(--wpx-spacing-xs2);
    box-shadow: var(--wpx-shadow-md);
    z-index: 100;
}

/*------------------------------------*/
/* --- Animations ------------------- */
/*------------------------------------*/
:host wpx-popup {
    opacity: 0;
    transform: translateY(-5px);
    transition: opacity 0.10s ease, transform 0.10s ease;
    pointer-events: none;
    display: block;
}

:host wpx-popup[open] {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Dropdown
//-------------------------------------------------------------------
class WPX_Dropdown extends WPX_Element {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$d]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.render();

        const root = this.shadowRoot;
        this.trigger = root.querySelector('slot[name="trigger"]');
        this.popup = root.querySelector('wpx-popup');

        const trigger = this.trigger.assignedElements()[0]; 
        trigger.addEventListener('click', () => {
            this.popup.placement = 'bottom-start';
            this.popup.anchor = trigger;
            this.popup.toggle();
        });

        // Klick außerhalb -> Popup schließen
        document.addEventListener('click', e => {
            if (!this.contains(e.target)) this.popup.hide();
        });
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <slot name="trigger"></slot>
            <wpx-popup>
                <slot></slot>
            </wpx-popup>
        `);
    }
}

customElements.define('wpx-dropdown', WPX_Dropdown);

const styles$c = /*css*/ `
:host {
    display: inline-block;
    width: 1em;
    height: 1em;
}
svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Icon
//-------------------------------------------------------------------
class WPX_Icon extends WPX_Element {

	static get observedAttributes() {
		return ['name', 'disabled'];
	}

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: name
    //-------------------------------------------------------------------
    get name() {return this.getAttribute('name') || 'star';}
    set name(value) {this.setAttribute('name', value);}
    
// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$c]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.render();
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    async render() {
        const url = `https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/${this.name}.svg`;

        try {
            const resp = await fetch(url);
            const svg = await resp.text();

            // SVG-String in DOM-Element parsen
            const parser = new DOMParser();
            const doc = parser.parseFromString(svg, "image/svg+xml");
            const svgEl = doc.documentElement;

            this.shadowRoot.appendChild(svgEl);
        } catch (err) {
            console.error("WPX_Icon Fehler:", err);
            this.shadowRoot.innerHTML = `<span style="color:red">?</span>`;
        }
    }
}

customElements.define('wpx-icon', WPX_Icon);

const styles$b = /*css*/ `
:host {
    display: block;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Include
//-------------------------------------------------------------------
class WPX_Include extends WPX_Element {

    static get observedAttributes() {
        return ['src'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: src
    //-------------------------------------------------------------------
    get src() {return this.getAttribute('src') || '';}
    set src(value) {this.setAttribute('src', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$b]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        //this.loadContent();
    }

    //-------------------------------------------------------------------
    //--- loadContent()
    //-------------------------------------------------------------------
    async loadContent() {
        if (!this.src) return;

        try {
            const res = await fetch(this.src);
            if (!res.ok) throw new Error(`Failed to load ${this.src}`);
            const html = await res.text();
            
            this.setHtml(`<slot>${html}</slot>`);

        } catch (err) {
            console.error(err);
        }
    }

    //-------------------------------------------------------------------
    //--- attributeChangedCallback()
    //-------------------------------------------------------------------
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src' && oldValue !== newValue) {
            this.loadContent();
        }
    }
}

customElements.define('wpx-include', WPX_Include);

const styles$a = /*css*/ `
:host {
    display: flex;
    flex-direction: column;
    gap: var(--wpx-spacing-xs);
    width: 100%;
}

.textfield {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--wpx-spacing-xs);
    font-family: var(--wpx-font-family);
    background-color: var(--wpx-color-neutral-100);
    border: 1px solid var(--wpx-control-border-color);
    border-radius: var(--wpx-border-radius-sm);
    transition: all var(--wpx-transition-fast) ease;
    overflow: hidden;
}

.textfield:focus-within {
    border-color: var(--wpx-color-primary-50);
    box-shadow: 0 0 0 1px var(--wpx-color-primary-50);
}

input {
    font-family: inherit;
    font-size: inherit;
    color: var(--wpx-control-color);
    width: 100%;
    height: 100%; 
    border: none;
    outline: 0;
    background: transparent;
    padding: 0 10px;
}

input::placeholder {
    color: var(--wpx-color-neutral-0);
    opacity: 0.4;
}

/*------------------------------------*/
/* --- sizes ------------------------ */
/*------------------------------------*/
:host([size="sm"]) .textfield {
    height: var(--wpx-control-height-sm);
    font-size: var(--wpx-font-size-sm);
}

:host([size="md"]) .textfield {
    height: var(--wpx-control-height-md);
    font-size: var(--wpx-font-size-md);
}

:host([size="lg"]) .textfield {
    height: var(--wpx-control-height-lg);
    font-size: var(--wpx-font-size-lg);
}

/*------------------------------------*/
/* --- filled ------------------------*/
/*------------------------------------*/
:host([filled]) .textfield {
    background-color: var(--wpx-color-neutral-90);
}

/*------------------------------------*/
/* --- pill --------------------------*/
/*------------------------------------*/
:host([pill]) .textfield {
    border-radius: var(--wpx-border-radius-pill);
}

::slotted(wpx-icon[slot="prefix"]),
::slotted(wpx-icon[slot="suffix"]) {
    color: var(--wpx-color-neutral-60);
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Input
//-------------------------------------------------------------------
class WPX_Input extends WPX_Element {

    static get observedAttributes() {
        return ['label', 'hint', 'placeholder', 'size', 'pill', 'value', 'disabled'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: label
    //-------------------------------------------------------------------
    get label() {return this.getAttribute('label') || '';}
    set label(value) {this.setAttribute('label', value);}

    //-------------------------------------------------------------------
    //--- Attribute: hint
    //-------------------------------------------------------------------
    get hint() {return this.getAttribute('hint') || '';}
    set hint(value) {this.setAttribute('hint', value);}

    //-------------------------------------------------------------------
    //--- Attribute: placeholder
    //-------------------------------------------------------------------
    get placeholder() {return this.getAttribute('placeholder') || '';}
    set placeholder(value) {this.setAttribute('placeholder', value);}

    //-------------------------------------------------------------------
    //--- Attribute: size
    //-------------------------------------------------------------------
    get size() {return this.getAttribute('size');}
    set size(value) {this.setAttribute('size', value);}

    //-------------------------------------------------------------------
    //--- Attribute: pill
    //-------------------------------------------------------------------
    get pill() {return this.hasAttribute('pill');}
    set pill(value) {
        value ? this.setAttribute('pill', '') : this.removeAttribute('pill');
    }

    //-------------------------------------------------------------------
    //--- Attribute: value
    //-------------------------------------------------------------------
    get value() {
        const input = this.shadowRoot.querySelector('input');
        return input ? input.value : '';
    }
    set value(val) {
        const input = this.shadowRoot.querySelector('input');
        if (input) input.value = val;
    }
    
// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$a, controlStyles]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.size) this.size = 'md';

        if (this.label) {
            this.setHtml(`
                <label class="control-label" for="input">
                    ${this.label}
                </label>
            `);
        }

        this.setHtml(`
            <div class="textfield">
                <slot name="prefix"></slot>
                <input id="input" type="text" placeholder="${this.placeholder}">
                <slot name="suffix"></slot>
            </div>
        `);

        if (this.hint) {
            this.setHtml(`
                <div class="control-hint">
                    ${this.hint}
                </div>
            `);
        }
    }

    //-------------------------------------------------------------------
    //--- attributeChangedCallback()
    //-------------------------------------------------------------------
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' && oldValue !== newValue) {
            this.value = newValue;
        }
    }
}

customElements.define('wpx-input', WPX_Input);

const styles$9 = /*css*/ `
:host {
    display: block;
}

.item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--wpx-spacing-xs);
    background-color: var(--wpx-color-neutral-100);
    color: var(--wpx-color-neutral-30);
    border: none;
    border-radius: var(--wpx-border-radius-md);
    transition: all var(--wpx-transition-fast) ease;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
}

.item:hover {
    background-color: color-mix(in srgb, var(--wpx-color-neutral-80) 55%, white);
}


.item--content {
    flex: 1;
    display: block;
}

/*------------------------------------*/
/* --- subitems --------------------- */
/*------------------------------------*/
.subitems {
    padding-left: var(--wpx-spacing-md);
    display: none;
}

:host([open]) .subitems {
    display: block;
}

/*------------------------------------*/
/* --- sizes ------------------------ */
/*------------------------------------*/

/* +++ small +++++++++++++++++++++++++*/
:host([size="sm"]) .item {
    padding: var(--wpx-spacing-xs2) var(--wpx-spacing-xs);
}
/* +++ medium ++++++++++++++++++++++++*/
:host([size="md"]) .item {
    padding: var(--wpx-spacing-xs) var(--wpx-spacing-sm);
}
/* +++ large +++++++++++++++++++++++++*/
:host([size="lg"]) .item {
    padding: var(--wpx-spacing-sm) var(--wpx-spacing-md);
}

/*------------------------------------*/
/* --- toggle-icon ------------------ */
/*------------------------------------*/
:host(:not([has-subitems])) .toggle-icon {
    display: none;
}

.toggle-icon wpx-icon {
    transform: rotate(0deg);
    transition: transform var(--wpx-transition-fast) ease;
}

:host([open]) .toggle-icon wpx-icon {
    transform: rotate(90deg);
}

/*------------------------------------*/
/* --- slots -------------------------*/
/*------------------------------------*/
::slotted([slot="prefix"]) {flex: 0 0 auto;}
::slotted([slot="suffix"]) {flex: 0 0 auto;}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Item
//-------------------------------------------------------------------
class WPX_Item extends WPX_Element {

    static get observedAttributes() {
        return ['value', 'type', 'size', 'checked', 'open', 'disabled'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: value
    //-------------------------------------------------------------------
    get value() {return this.getAttribute('value') || '';}
    set value(value) {this.setAttribute('value', value);}

    //-------------------------------------------------------------------
    //--- Attribute: type
    //-------------------------------------------------------------------
    get type() {return this.getAttribute('type') || 'default';}
    set type(value) {this.setAttribute('type', value);}

    //-------------------------------------------------------------------
    //--- Attribute: size
    //-------------------------------------------------------------------
    get size() {return this.getAttribute('size');}
    set size(value) {this.setAttribute('size', value);}

    //-------------------------------------------------------------------
    //--- Attribute: checked
    //-------------------------------------------------------------------
    get checked() {return this.hasAttribute('checked');}
    set checked(value) {
        value ? this.setAttribute('checked', '') : this.removeAttribute('checked');
    }

    //-------------------------------------------------------------------
    //--- Attribute: open
    //-------------------------------------------------------------------
    get open() {return this.hasAttribute('open');}
    set open(value) {
        value ? this.setAttribute('open', '') : this.removeAttribute('open');
    }

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$9]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.size) this.size = 'md';

        this.render();

        if (this.hasSubitems()) {
            this.setAttribute('has-subitems', '');
        } else {
            this.removeAttribute('has-subitems');
        }

        this.addEventListener('click', () => this.onClick());
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <div class="item">
                <slot name="prefix"></slot>
                <slot class="item--content"></slot>
                <slot name="suffix"></slot>
                <slot name="toggle-icon" class="toggle-icon">
                    <wpx-icon name="chevron-right"></wpx-icon>
                </slot>
            </div>
            <div class="subitems">
                <slot name="subitems"></slot>
            </div>
        `);
    }

    //-------------------------------------------------------------------
    //--- onClick()
    //-------------------------------------------------------------------
    onClick() {
        if (this.disabled) return;

        if (this.hasSubitems()) {
            this.open = !this.open;
            return; // optional: nicht weiterbubblen
        }

        const item = {value: this.value, type: this.type, checked: this.checked};
        this.dispatchEvent(new CustomEvent('wpx-click', {
            detail: {item: item},
            bubbles: true,
            composed: true
        }));
    }

    //-------------------------------------------------------------------
    //--- hasSubitems()
    //-------------------------------------------------------------------
    hasSubitems() {
        return this.querySelector('[slot="subitems"]') !== null;
    }
}

customElements.define('wpx-item', WPX_Item);

const styles$8 = /*css*/ `
:host {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_List
//-------------------------------------------------------------------
class WPX_List extends WPX_Element {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$8]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.render();
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <div class="list">
                <slot></slot>
            </div>
        `);
    }
}

customElements.define('wpx-list', WPX_List);

const styles$7 = /*css*/ `
:host {
    position: absolute;
    display: none;
    z-index: 1000;
}
:host([open]) {
    display: block;
}
`;

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const min = Math.min;
const max = Math.max;
const round = Math.round;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
const yAxisSides = /*#__PURE__*/new Set(['top', 'bottom']);
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
const lrPlacement = ['left', 'right'];
const rlPlacement = ['right', 'left'];
const tbPlacement = ['top', 'bottom'];
const btPlacement = ['bottom', 'top'];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow ||
          // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every(d => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

const originSides = /*#__PURE__*/new Set(['left', 'top']);

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
const invalidOverflowDisplayValues = /*#__PURE__*/new Set(['inline', 'contents']);
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
const tableElements = /*#__PURE__*/new Set(['table', 'td', 'th']);
function isTableElement(element) {
  return tableElements.has(getNodeName(element));
}
const topLayerSelectors = [':popover-open', ':modal'];
function isTopLayer(element) {
  return topLayerSelectors.some(selector => {
    try {
      return element.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}
const transformProperties = ['transform', 'translate', 'scale', 'rotate', 'perspective'];
const willChangeValues = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'];
const containValues = ['paint', 'layout', 'strict', 'content'];
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return transformProperties.some(value => css[value] ? css[value] !== 'none' : false) || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || willChangeValues.some(value => (css.willChange || '').includes(value)) || containValues.some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
const lastTraversableNodeNames = /*#__PURE__*/new Set(['html', 'body', '#document']);
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

// If <html> has a CSS width greater than the viewport, then this will be
// incorrect for RTL.
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}

function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Safety check: ensure the scrollbar space is reasonable in case this
// calculation is affected by unusual styles.
// Most scrollbars leave 15-18px of space.
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  // <html> `overflow: hidden` + `scrollbar-gutter: stable` reduces the
  // visual width of the <html> but this is not considered in the size
  // of `html.clientWidth`.
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === 'CSS1Compat' ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    // If the <body> scrollbar is on the left, the width needs to be extended
    // by the scrollbar amount so there isn't extra space on the right.
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}

const absoluteOrFixed = /*#__PURE__*/new Set(['absolute', 'fixed']);
// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);

  // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
  // Firefox with layout.scrollbar.side = 3 in about:config to test this.
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = offset$1;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = flip$1;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

//-------------------------------------------------------------------
//--- Element: WPX_Popup
//-------------------------------------------------------------------
class WPX_Popup extends WPX_Element {

	static get observedAttributes() {
		return ['open', 'anchor', 'placement'];
	}

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: open
    //-------------------------------------------------------------------
    get open() {return this.hasAttribute('open');}
    set open(value) {
        value ? this.setAttribute('open', '') : this.removeAttribute('open');
    }

    //-------------------------------------------------------------------
    //--- Attribute: anchor
    //-------------------------------------------------------------------
    get anchor() {return this._anchor;}
    set anchor(el) {
        this._anchor = el;
        this.updatePosition();
    }

    //-------------------------------------------------------------------
    //--- Attribute: placement
    //-------------------------------------------------------------------
    get placement() {return this.getAttribute('placement');}
    set placement(value) {this.setAttribute('placement', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$7]);
        this.open = false;
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.setHtml(`<slot></slot>`);
    }

    //-------------------------------------------------------------------
    //--- updatePosition()
    //-------------------------------------------------------------------
    async updatePosition() {
        if (!this.anchor) return;

        const {x, y} = await computePosition(this.anchor, this, {
            placement: this.placement || 'bottom',
            middleware: [offset(1), flip(), shift({padding: 5})]
        });

        Object.assign(this.style, {left: `${x}px`, top: `${y}px`});
    }

    //-------------------------------------------------------------------
    //--- show(), hide(), toggle()
    //-------------------------------------------------------------------
    show() {this.open = true; this.updatePosition();}
    hide() {this.open = false;}
    toggle() {this.open = !this.open;}
}

customElements.define('wpx-popup', WPX_Popup);

const styles$6 = /*css*/ `
:host {
    display: flex;
    flex-direction: column;
    gap: var(--wpx-spacing-xs);
}

.select {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--wpx-spacing-xs);#
    font-family: var(--wpx-font-family);
    background-color: var(--wpx-color-neutral-100);
    border: 1px solid var(--wpx-control-border-color);
    border-radius: var(--wpx-border-radius-sm);
    transition: all var(--wpx-transition-fast) ease;
    overflow: hidden;
    cursor: pointer;
}

.select:focus-within {
    border-color: var(--wpx-color-primary-50);
    box-shadow: 0 0 0 1px var(--wpx-color-primary-50);
}

input {
    font-family: inherit;
    font-size: inherit;
    color: var(--wpx-control-color);
    width: 100%;
    height: 100%; 
    border: none;
    outline: 0;
    background: transparent;
    padding: 0 10px;
    cursor: inherit;
}

input::placeholder {
    color: var(--wpx-color-neutral-0);
    opacity: 0.4;
}

/*------------------------------------*/
/* --- sizes ------------------------ */
/*------------------------------------*/
:host([size="sm"]) .select {
    height: var(--wpx-control-height-sm);
    font-size: var(--wpx-font-size-sm);
}

:host([size="md"]) .select {
    height: var(--wpx-control-height-md);
    font-size: var(--wpx-font-size-md);
}

:host([size="lg"]) .select {
    height: var(--wpx-control-height-lg);
    font-size: var(--wpx-font-size-lg);
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Select
//-------------------------------------------------------------------
class WPX_Select extends WPX_Element {

    static get observedAttributes() {
        return ['label', 'hint', 'placeholder', 'size', 'pill', 'value', 'disabled'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: label
    //-------------------------------------------------------------------
    get label() {return this.getAttribute('label') || '';}
    set label(value) {this.setAttribute('label', value);}

    //-------------------------------------------------------------------
    //--- Attribute: hint
    //-------------------------------------------------------------------
    get hint() {return this.getAttribute('hint') || '';}
    set hint(value) {this.setAttribute('hint', value);}

    //-------------------------------------------------------------------
    //--- Attribute: placeholder
    //-------------------------------------------------------------------
    get placeholder() {return this.getAttribute('placeholder') || '';}
    set placeholder(value) {this.setAttribute('placeholder', value);}

    //-------------------------------------------------------------------
    //--- Attribute: size
    //-------------------------------------------------------------------
    get size() {return this.getAttribute('size');}
    set size(value) {this.setAttribute('size', value);}

    //-------------------------------------------------------------------
    //--- Attribute: pill
    //-------------------------------------------------------------------
    get pill() {return this.hasAttribute('pill');}
    set pill(value) {
        value ? this.setAttribute('pill', '') : this.removeAttribute('pill');
    }

    //-------------------------------------------------------------------
    //--- Attribute: value
    //-------------------------------------------------------------------
    get value() {
        const input = this.shadowRoot.querySelector('input');
        return input ? input.value : '';
    }
    set value(val) {
        const input = this.shadowRoot.querySelector('input');
        if (input) input.value = val;
    }
    
// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$6]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.size) this.size = 'md';
        this.render();

        const root = this.shadowRoot;
        this.popup = root.querySelector('wpx-popup');
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <div class="select">
                <slot name="prefix"></slot>
                <input id="input" type="text" placeholder="${this.placeholder}">
                <slot name="suffix"></slot>
            </div>
            <wpx-popup>
                <slot></slot>
            </wpx-popup>
        `);
    }
}

customElements.define('wpx-select', WPX_Select);

const styles$5 = /*css*/ `
:host {
    --track-width: 2px;
    --track-color: rgba(0,0,0,0.1);
    --indicator-color: var(--wpx-color-primary-50);
    --speed: 0.8s;

    display: inline-flex;
    width: 1em;
    height: 1em;
}

.spinner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: var(--track-width) solid var(--track-color);
    border-top-color: var(--indicator-color);
    animation: spin var(--speed) linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Spinner
//-------------------------------------------------------------------
class WPX_Spinner extends WPX_Element {

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$5]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.shadowRoot.querySelector('.spinner')) {
            const div = document.createElement('div');
            div.classList.add('spinner');
            this.shadowRoot.appendChild(div);
        }
    }
}

customElements.define('wpx-spinner', WPX_Spinner);

const styles$4 = /*css*/ `
:host {
    display: inline-block;
    user-select: none;
}

label {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--wpx-spacing-xs);
    cursor: pointer;
}

input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

/*------------------------------------*/
/* --- checked ---------------------- */
/*------------------------------------*/
input[type="radio"]:checked + .circle {
    border-color: var(--wpx-color-primary-50);
}
input[type="radio"]:checked + .circle wpx-icon {
    opacity: 1;
}

/*------------------------------------*/
/* --- circle ----------------------- */
/*------------------------------------*/
.circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.2em;
    height: 1.2em;
    border: 1px solid var(--wpx-color-neutral-60);
    border-radius: 50%;
    background: #fff;
    transition: all 0.16s ease;
}

.circle wpx-icon {
    opacity: 0;
    pointer-events: none;
    color: var(--wpx-color-primary-50);
    font-size: 0.7em;
}

/*------------------------------------*/
/* --- disabled --------------------- */
/*------------------------------------*/
:host([disabled]) {
    opacity: 0.6;
    cursor: not-allowed;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Radio
//-------------------------------------------------------------------
class WPX_Radio extends WPX_Element {

    static get observedAttributes() {
        return ['checked', 'value', 'disabled'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: checked
    //-------------------------------------------------------------------
    get checked() {return this.hasAttribute('checked');}
    set checked(value) {
        value ? this.setAttribute('checked', '') : this.removeAttribute('checked');
    }

    //-------------------------------------------------------------------
    //--- Attribute: value
    //-------------------------------------------------------------------
    get value() {return this.getAttribute('value') || '';}
    set value(value) {this.setAttribute('value', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$4]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.render();

        this.input = this.shadowRoot.querySelector('input');
        this.input.checked = this.checked;
        this.input.disabled = this.disabled;
        this.input.value = this.value;

        this.input.addEventListener('change', () => this.onChange());
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        this.setHtml(`
            <label>
                <input type="radio">
                <span class="circle">
                    <wpx-icon name="circle-fill"></wpx-icon>
                </span>
                <slot></slot>
            </label>
        `);
    }

    //-------------------------------------------------------------------
    //--- onChange()
    //-------------------------------------------------------------------
    onChange() {
        this.checked = this.input.checked;
        this.dispatchEvent(new CustomEvent('wpx-change', {
            detail: {checked: this.checked, value: this.value},
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('wpx-radio', WPX_Radio);

const styles$3 = /*css*/ `
:host {
    display: block;
}

.tabs {
    display: flex;
}

.tabs-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--wpx-spacing-xs2);
}

.tabs-panels {
    padding-top: 1rem;
}

/*------------------------------------*/
/* --- placement -------------------- */
/*------------------------------------*/
:host([placement="top"]) .tabs {
    flex-direction: column;
}
:host([placement="bottom"]) .tabs {
    flex-direction: column-reverse;
}
:host([placement="left"]) .tabs {
    flex-direction: row;
}
:host([placement="right"]) .tabs {
    flex-direction: row-reverse;
}

/*------------------------------------*/
/* --- fill (default) line ---------- */
/*------------------------------------*/
:host([fill="default"]) .tabs-nav {
    border-bottom: 1px solid var(--wpx-color-neutral-70);
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Tabs
//-------------------------------------------------------------------
class WPX_Tabs extends WPX_Element {

    static get observedAttributes() {
        return ['active', 'fill', 'placement'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: active
    //-------------------------------------------------------------------
    get active() {return this.getAttribute('active');}
    set active(value) {this.setAttribute('active', value);}

    //-------------------------------------------------------------------
    //--- Attribute: fill
    //-------------------------------------------------------------------
    get fill() {return this.getAttribute('fill');}
    set fill(value) {this.setAttribute('fill', value);}

    //-------------------------------------------------------------------
    //--- Attribute: placement
    //-------------------------------------------------------------------
    get placement() {return this.getAttribute('placement');}
    set placement(value) {this.setAttribute('placement', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$3]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        if (!this.fill) this.fill = 'default';
        if (!this.placement) this.placement = 'top';

        this.tabs = this.querySelectorAll("wpx-tab");
        this.panels = this.querySelectorAll("wpx-tab-panel");

        this.render();
        this.show(this.active);

        this.addEventListener("click", e => {
            const tab = e.target.closest("wpx-tab");
            if (tab) this.show(tab.panel);
        });
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        const tabs = document.createElement('div');

        tabs.className = 'tabs';
        tabs.innerHTML = `
            <div class="tabs-nav">
                <slot name="prefix"></slot>
                <slot name="nav"></slot>
                <slot name="suffix"></slot>
            </div>
            <div class="tabs-panels">
                <slot></slot>
            </div>
        `;

        this.shadowRoot.append(tabs);
    }

    //-------------------------------------------------------------------
    //--- show()
    //-------------------------------------------------------------------
    show(name) {
        this.setAttribute("active", name);

        this.tabs.forEach(tab => {
            const isActive = tab.getAttribute("panel") === name;
            tab.toggleAttribute('active', isActive);
        });

        this.panels.forEach(panel => {
            const isActive = panel.getAttribute("name") === name;
            panel.toggleAttribute('active', isActive);
        });
    }

    //-------------------------------------------------------------------
    //--- attributeChangedCallback()
    //-------------------------------------------------------------------
    attributeChangedCallback(name, oldVal, newVal) {

    }
}

customElements.define('wpx-tabs', WPX_Tabs);

const styles$2 = /*css*/ `
:host {
    display: inline-block;
}

.tab {
    display: flex;
    align-items: center;
    height: var(--wpx-control-height-md);
    padding: 0 var(--wpx-spacing-sm);
    border-radius: var(--wpx-border-radius-md);
    transition: all var(--wpx-transition-fast) ease;
    cursor: pointer;
}

/*------------------------------------*/
/* --- fill ------------------------- */
/*------------------------------------*/

/* +++ default (underline) +++++++++++*/
:host([fill="default"]) .tab {
    background-color: transparent;
    border-radius: 0;
    border-bottom: 2px solid transparent;
    color: var(--wpx-color-neutral-40);
}

:host([fill="default"]) .tab:hover {
    color: var(--wpx-color-primary-50);
}

:host([fill="default"][active]) .tab {
    border-bottom-color: var(--wpx-color-primary-40);
    color: var(--wpx-color-primary-40);
}

/* +++ solid +++++++++++++++++++++++++*/
:host([fill="solid"]) .tab {
    background-color: var(--wpx-color-primary-95);
}

:host([fill="solid"]) .tab:hover {
    background-color: var(--wpx-color-primary-90);
}

:host([fill="solid"][active]) .tab {
    background-color: var(--wpx-color-primary-40);
    color: white;
}

/*------------------------------------*/
/* --- disabled --------------------- */
/*------------------------------------*/
:host([disabled]) .tab {
    opacity: 0.5;
    cursor: not-allowed;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Tab
//-------------------------------------------------------------------
class WPX_Tab extends WPX_Element {

    static get observedAttributes() {
        return ['panel', 'disabled'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: panel
    //-------------------------------------------------------------------
    get panel() {return this.getAttribute('panel');}
    set panel(value) {this.setAttribute('panel', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$2]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {

        // fill Attribut von wpx-tabs auf Element übertragen
        const parentTabs = this.closest('wpx-tabs');
        if (parentTabs) {
            const fill = parentTabs.getAttribute('fill') || 'default';
            this.setAttribute('fill', fill);
        }

        this.render();
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        const tabs = document.createElement('div');
        tabs.className = 'tab';
        tabs.innerHTML = `<slot></slot>`;

        this.shadowRoot.append(tabs);
    }
}

customElements.define('wpx-tab', WPX_Tab);

const styles$1 = /*css*/ `
:host {
    display: none;
}

:host([active]) {
    display: block;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_TabPanel
//-------------------------------------------------------------------
class WPX_TabPanel extends WPX_Element {

    static get observedAttributes() {
        return ['name'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: name
    //-------------------------------------------------------------------
    get name() {return this.getAttribute('name');}
    set name(value) {this.setAttribute('name', value);}

// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles$1]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        this.render();
    }

    //-------------------------------------------------------------------
    //--- render()
    //-------------------------------------------------------------------
    render() {
        const panel = document.createElement('div');
        panel.innerHTML = `<slot></slot>`;

        this.shadowRoot.append(panel);
    }
}

customElements.define('wpx-tab-panel', WPX_TabPanel);

const styles = /*css*/ `
:host {
    display: flex;
    flex-direction: column;
    gap: var(--wpx-spacing-xs);
}

.wrapper {
    display: block;
    background-color: var(--wpx-color-neutral-100);
    border: 1px solid var(--wpx-color-neutral-60);
    border-radius: var(--wpx-border-radius-sm);
    transition: all var(--wpx-transition-fast) ease;
}

.wrapper:focus-within {
    border-color: var(--wpx-color-primary-50);
    box-shadow: 0 0 0 1px var(--wpx-color-primary-50);
}

textarea {
    width: 100%;
    border: none;
    outline: 0;
    background: transparent;
    padding: 10px;
}

textarea::placeholder {
    color: var(--wpx-color-neutral-0);
    opacity: 0.4;
}
`;

//-------------------------------------------------------------------
//--- Element: WPX_Textarea
//-------------------------------------------------------------------
class WPX_Textarea extends WPX_Element {

    static get observedAttributes() {
        return ['label', 'hint', 'placeholder', 'size', 'rows', 'value', 'disabled'];
    }

// #region Attributes

    //-------------------------------------------------------------------
    //--- Attribute: label
    //-------------------------------------------------------------------
    get label() {return this.getAttribute('label') || '';}
    set label(value) {this.setAttribute('label', value);}

    //-------------------------------------------------------------------
    //--- Attribute: hint
    //-------------------------------------------------------------------
    get hint() {return this.getAttribute('hint') || '';}
    set hint(value) {this.setAttribute('hint', value);}

    //-------------------------------------------------------------------
    //--- Attribute: placeholder
    //-------------------------------------------------------------------
    get placeholder() {return this.getAttribute('placeholder') || '';}
    set placeholder(value) {this.setAttribute('placeholder', value);}

    //-------------------------------------------------------------------
    //--- Attribute: size
    //-------------------------------------------------------------------
    get size() {return this.getAttribute('size');}
    set size(value) {this.setAttribute('size', value);}

    //-------------------------------------------------------------------
    //--- Attribute: rows
    //-------------------------------------------------------------------
    get rows() {return this.getAttribute('rows') || 4;}
    set rows(value) {this.setAttribute('rows', value);}

    //-------------------------------------------------------------------
    //--- Attribute: value
    //-------------------------------------------------------------------
    get value() {
        const input = this.shadowRoot.querySelector('textarea');
        return input ? input.value : '';
    }
    set value(val) {
        const input = this.shadowRoot.querySelector('textarea');
        if (input) input.value = val;
    }
    
// #endregion

    //-------------------------------------------------------------------
    //--- constructor()
    //-------------------------------------------------------------------
    constructor() {
        super();
        this.init([styles, controlStyles]);
    }

    //-------------------------------------------------------------------
    //--- connectedCallback()
    //-------------------------------------------------------------------
    connectedCallback() {
        //if (!this.size) this.size = 'md';

        if (this.label) {
            this.setHtml(`
                <label class="control-label" for="input">
                    ${this.label}
                </label>
            `);
        }

        this.setHtml(`
            <div class="wrapper">
                <textarea
                    id="input" 
                    value="${this.value}" 
                    rows="${this.rows}" 
                    placeholder="${this.placeholder}"></textarea>
            </div>
        `);

        if (this.hint) {
            this.setHtml(`
                <div class="control-hint">
                    ${this.hint}
                </div>
            `);
        }
    }

    //-------------------------------------------------------------------
    //--- attributeChangedCallback()
    //-------------------------------------------------------------------
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' && oldValue !== newValue) {
            this.value = newValue;
        }
    }
}

customElements.define('wpx-textarea', WPX_Textarea);

export { WPX_Alert, WPX_Button, WPX_Checkbox, WPX_Details, WPX_Dialog, WPX_Divider, WPX_Drawer, WPX_Dropdown, WPX_Icon, WPX_Include, WPX_Input, WPX_Item, WPX_List, WPX_Popup, WPX_Radio, WPX_Select, WPX_Spinner, WPX_Tab, WPX_TabPanel, WPX_Tabs, WPX_Textarea };
//# sourceMappingURL=wpx.js.map
