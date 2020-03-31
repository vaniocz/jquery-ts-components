// Support for passing union types to JQuery constructor which has been broken in earlier version of @types/jquery
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29312
// https://stackoverflow.com/questions/52650182/cannot-pass-union-type-whose-types-resolve-to-different-overloads

interface JQueryStatic {
    <TDeclared = JQuery._Unknown,
        T extends string | Element[] | JQuery<any> | Element | JQuery.PlainObject =
                string | Element[] | JQuery<any> | Element | JQuery.PlainObject,
        TReturn =
            TDeclared extends JQuery._Unknown ?
                T extends string ? HTMLElement :
                    T extends Element[] | JQuery<any> ? T[number] :
                        T extends Element | JQuery.PlainObject ? T :
                            never :
                TDeclared>(html_selector_element_elementArray_object_selection: T): JQuery<TReturn>;
}

declare namespace JQuery {
    interface _Unknown {
        __unknown: never;
    }
}
