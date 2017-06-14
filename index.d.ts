interface JQueryStatic
{
    components: {[name: string]: JQueryComponentConstructor};
}

interface JQueryComponentConstructor
{
    new (element: JQuery | HTMLElement | string, options: object): any;
}
