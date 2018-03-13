declare global
{
    interface JQueryStatic
    {
        components: {[name: string]: JQueryComponentConstructor};
    }
}

interface JQueryComponentConstructor
{
    new (element: JQuery | HTMLElement | string, options: any): any;
}

function convertToCamelCase(text: string): string
{
    return text.replace(/-([a-z])/g, (character: string) => character.charAt(1).toUpperCase());
}

function registerComponent($element: JQuery, name: string, options: any): void
{
    let Component = $.components[name];
    let components = $element.data('components') || {};
    components[name] = new Component($element, options);
    $element.data('components', components);
}

if (!$.components) {
    $.components = {};
}

export function component(name: string)
{
    return (target: JQueryComponentConstructor) => {
        $.components[name] = target;
    }
}

export function register(root: JQuery | HTMLElement | string): void
{
    root = $(root)[0];
    const elements = root.getElementsByTagName('*');

    for (let i = -1; i < elements.length; i++) {
        const element = i === -1 ? root : elements[i];

        $.each(element.attributes, (j, attribute: Attr) => {
            if (attribute.name.indexOf('data-component-') !== 0) {
                return;
            }

            const name = convertToCamelCase(attribute.name.substr(14));

            if (!$.components || !$.components[name]) {
                return;
            }

            let $element = $(element);
            registerComponent($element, name, $element.data(attribute.name.substr(5)));
        });
    }
}
