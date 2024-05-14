import PropertiesControlInputModel from "./propertiseControlInputModel";

interface I_Properties_Component {
    labelModel?: "row" | "column" | string | undefined;
    edit?: boolean | undefined;
    visible?: boolean | undefined;
    disabled?: boolean | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    showClearButton?: boolean | undefined;
    label?: string | undefined;
    placeholder?: string | undefined;
    value?: any;
    mode?:  'email' | 'password' | 'search' | 'tel' | 'text' | 'url' | string,
    mask?: string;
    maskRules?: any;
}

export default class Properties_Component_ENTITY implements I_Properties_Component {
    labelModel?: "row" | "column" | string | undefined;
    edit?: boolean | undefined;
    visible?: boolean | undefined;
    disabled?: boolean | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    showClearButton?: boolean | undefined;
    label?: string | undefined;
    placeholder?: string | undefined;
    value?: any;
    mode?:  'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
    mask?: string;
    maskRules?: any;
}