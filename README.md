# jQuery TypeScript Components

`npm install --save jquery-ts-components`

Simple jQuery TypeScript component system.

```ts
// Hello.ts
import {component} from 'jquery-ts-components';

interface HelloOptions
{
    text?: string;
}

@component('HelloComponent')
export default class Hello
{
    private $element: JQuery;

    public constructor(element: JQuery | HTMLElement | string, options: HelloOptions = {})
    {
        this.$element = $(element);
        this.$element.text(options.text || 'Hello');
    }
}
```

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset=utf-8>
</head>
<body>
    <p data-component-hello-component='{"text": "Hello world!"}'></p>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="index.js"></script>
</body>
</html>
```

```ts
// index.ts
import {register} from 'jquery-ts-components';
import 'Hello';

register(document.body);
```
