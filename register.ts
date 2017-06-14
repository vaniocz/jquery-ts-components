/// <reference types="jquery-ts-components"/>

function convertToCamelCase(text: string): string
{
    return text.replace(/-([a-z])/g, (character: string) => character.charAt(1).toUpperCase());
}

function registerComponent($element: JQuery, name: string, options: object): void
{
    let Component = $.components[name];
    let components = $element.data('components') || {};
    components[name] = new Component($element, options);
    $element.data('components', components);
}

export default function register(root: JQuery | HTMLElement | string): void
{
    $(root).find('*').each((i, element) => {
        $.each(element.attributes, (j, attribute: Attr) => {
            if (!attribute.name.startsWith('data-component-')) {
                return;
            }

            const name = convertToCamelCase(attribute.name.substr(14));

            if (!$.components || !$.components[name]) {
                return;
            }

            let $element = $(element);
            registerComponent($element, name, $element.data(attribute.name.substr(5)));
        });
    });
}
