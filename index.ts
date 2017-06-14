/// <reference types="jquery-ts-components"/>

if (!$.components) {
    $.components = {};
}

export default function component(name: string)
{
    return (target: JQueryComponentConstructor) => {
        $.components[name] = target;
    }
}
