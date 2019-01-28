/// <reference types="cheerio" />
declare module "selectors/attr" {
    export type Attr<F extends (attribute: string) => any> = {
        _type: "ATTR";
        callback: F;
        attribute: string;
        selector: string;
    };
    export function attrResolve($: CheerioStatic, context: Cheerio, queryType: Attr<any>): any;
    /**
     * Get html attribute
     * @param selector - css selector
     * @param attribute - html attribute to scrap
     */
    export function attrCreator(selector: string, attribute: string, callback?: undefined): Attr<() => string>;
    export function attrCreator<F extends (attribute: string) => any>(selector: string, attribute: string, callback: F): Attr<F>;
}
declare module "selectors/exists" {
    export type Exists<F extends (exists: boolean) => any> = {
        _type: "EXISTS";
        callback: F;
        selector: string;
    };
    export const existsResolve: ($: CheerioStatic, context: Cheerio, queryType: Exists<any>) => any;
    /**
     * Check if element exists
     * @param selector - css selector
     */
    export function existsCreator(selector: string, callback?: undefined): Exists<() => boolean>;
    export function existsCreator<F extends (exists: boolean) => any>(selector: string, callback: F): Exists<F>;
}
declare module "selectors/html" {
    export type Html<F extends (html: string) => any> = {
        _type: "HTML";
        callback: F;
        selector: string;
    };
    export const htmlResolve: ($: CheerioStatic, context: Cheerio, queryType: Html<any>) => any;
    /**
     * Get html content
     * @param selector - css selector
     */
    export function htmlCreator(selector: string, callback?: undefined): Html<() => string>;
    export function htmlCreator<F extends (html: string) => any>(selector: string, callback: F): Html<F>;
}
declare module "selectors/text" {
    export type Text<F extends (text: string) => any> = {
        _type: "TEXT";
        callback: F;
        selector: string;
    };
    export const textResolve: ($: CheerioStatic, context: Cheerio, queryType: Text<any>) => any;
    /**
     * Get inner text
     * @param selector - css selector
     */
    export function textCreator(selector: string, callback?: undefined): Text<() => string>;
    export function textCreator<F extends (text: string) => any>(selector: string, callback: F): Text<F>;
}
declare module "selectors/select" {
    export type Select<F extends (el: Cheerio) => any> = {
        _type: "SELECT";
        callback: F;
        selector: string;
    };
    export const selectResolve: <C extends (el: Cheerio) => any>($: CheerioStatic, context: Cheerio, queryType: Select<C>) => any;
    /**
     * Create custom selector
     * @param selector - css selector
     * @param callback - callback with cheerio element
     */
    export function selectCreator<F extends (el: Cheerio) => any>(selector: string, callback: F): Select<F>;
}
declare module "selectors/count" {
    export type Count<F extends (count: number) => any> = {
        _type: "COUNT";
        callback: F;
        selector: string;
    };
    export const countResolve: ($: CheerioStatic, context: Cheerio, queryType: Count<any>) => any;
    /**
     * Count elements
     * @param selector - css selector
     */
    export function countCreator(selector: string, callback?: undefined): Count<() => number>;
    export function countCreator<F extends (count: number) => any>(selector: string, callback: F): Count<F>;
}
declare module "selectors/link" {
    export type Link<F extends (link: string) => any> = {
        _type: "LINK";
        callback: F;
        selector: string;
    };
    export const linkResolve: ($: CheerioStatic, context: Cheerio, queryType: Link<any>) => any;
    /**
     * Get link from `href` attribute
     * @param selector - css selector
     */
    export function linkCreator(selector: string, callback?: undefined): Link<() => string>;
    export function linkCreator<F extends (link: string) => any>(selector: string, callback: F): Link<F>;
}
declare module "controls/if" {
    import { Query, Selector, TypeOf } from "types";
    import { ScrapQuery, ScrapSelector } from "scrapper";
    export type If<T extends Query | Selector, F extends Query | Selector, TR, FR> = {
        _type: "IF";
        callback: TR | FR;
        selector: string;
        truthy: T;
        falsey: F;
        condition: (el: Cheerio) => boolean;
    };
    export const ifResolve: <T extends import("selectors/attr").Attr<any> | import("selectors/exists").Exists<any> | import("selectors/html").Html<any> | import("selectors/text").Text<any> | import("selectors/count").Count<any> | import("selectors/link").Link<any> | Query | import("controls/list").List<any> | import("selectors/select").Select<any> | If<any, any, any, any>, F extends import("selectors/attr").Attr<any> | import("selectors/exists").Exists<any> | import("selectors/html").Html<any> | import("selectors/text").Text<any> | import("selectors/count").Count<any> | import("selectors/link").Link<any> | Query | import("controls/list").List<any> | import("selectors/select").Select<any> | If<any, any, any, any>>($: CheerioStatic, context: Cheerio, queryType: If<T, F, TypeOf<T>, TypeOf<F>>, scrapQuery: ScrapQuery, ScrapSelector: ScrapSelector) => any;
    /**
     * Get list of items
     * @param selector - css selector for list of items
     * @param data - query per item
     */
    export const ifCreator: <T extends import("selectors/attr").Attr<any> | import("selectors/exists").Exists<any> | import("selectors/html").Html<any> | import("selectors/text").Text<any> | import("selectors/count").Count<any> | import("selectors/link").Link<any> | Query | import("controls/list").List<any> | import("selectors/select").Select<any> | If<any, any, any, any>, F extends import("selectors/attr").Attr<any> | import("selectors/exists").Exists<any> | import("selectors/html").Html<any> | import("selectors/text").Text<any> | import("selectors/count").Count<any> | import("selectors/link").Link<any> | Query | import("controls/list").List<any> | import("selectors/select").Select<any> | If<any, any, any, any>>(selector: string, condition: (el: Cheerio) => boolean, truthy: T, falsey: F) => If<T, F, TypeOf<T>, TypeOf<F>>;
}
declare module "scrapper" {
    import { Query, Selector, TypeOfQuery, TypeOfSelector } from "types";
    export type ScrapSelector = ($: CheerioStatic, context: Cheerio, queryType: Selector) => any;
    export type ScrapQuery = <Q extends Query>($: CheerioStatic, context: Cheerio, queryData: Q, ref: any) => TypeOfQuery<Q>;
    /**
     * Scrap based on query
     * @param html - html to scrap
     * @param query - query to use
     */
    export function scrap<Q extends Query | Selector>(html: string, query: Q): Q extends Query ? TypeOfQuery<Q> : Q extends Selector ? TypeOfSelector<Q> : never;
}
declare module "controls/list" {
    import { Query, Selector, TypeOfQuery, TypeOfSelector } from "types";
    import { ScrapQuery, ScrapSelector } from "scrapper";
    export type List<T extends object> = {
        _type: "LIST";
        callback: Array<T>;
        predicate?: (el: Cheerio, index: number) => boolean;
        selector: string;
        data: Query | Selector;
    };
    export const listResolve: <Q extends object>($: CheerioStatic, context: Cheerio, queryType: List<Q>, scrapQuery: ScrapQuery, scrapSelector: ScrapSelector) => any[];
    /**
     * Get list of items
     * @param selector - css selector for list of items
     * @param data - query per item
     * @param predicate - filter elements
     */
    export const listCreator: <Q extends import("selectors/attr").Attr<any> | import("selectors/exists").Exists<any> | import("selectors/html").Html<any> | import("selectors/text").Text<any> | import("selectors/count").Count<any> | import("selectors/link").Link<any> | Query | List<any> | import("selectors/select").Select<any> | import("controls/if").If<any, any, any, any>>(selector: string, data: Q, predicate?: (el: Cheerio, index: number) => boolean) => List<Q extends Query ? TypeOfQuery<Q> : Q extends Selector ? TypeOfSelector<Q> : never>;
}
declare module "types" {
    import { Attr } from "selectors/attr";
    import { Exists } from "selectors/exists";
    import { Html } from "selectors/html";
    import { List } from "controls/list";
    import { Select } from "selectors/select";
    import { Text } from "selectors/text";
    import { If } from "controls/if";
    import { Count } from "selectors/count";
    import { Link } from "selectors/link";
    export type Query = {
        [property: string]: Selector | Query;
    };
    export type Selector = Attr<any> | Exists<any> | Html<any> | List<any> | Select<any> | If<any, any, any, any> | Text<any> | Count<any> | Link<any>;
    export type TypeOfSelector<Q extends Selector> = Q["callback"] extends (data: any) => any ? ReturnType<Q["callback"]> : Q["callback"];
    export type TypeOfQuery<Q extends Query> = {
        [P in keyof Q]: Q[P] extends Selector ? TypeOfSelector<Q[P]> : Q[P] extends Query ? TypeOfQuery<Q[P]> : never;
    };
    export type TypeOf<Q extends Query | Selector> = Q extends Query ? TypeOfQuery<Q> : Q extends Selector ? TypeOfSelector<Q> : never;
    /**
     * Test if query is Selector
     * @param q
     */
    export function isSelector(q: Query | Selector): q is Selector;
}
declare module "index" {
    export { Query, Selector, TypeOfSelector, TypeOfQuery } from "types";
    export { ScrapQuery, ScrapSelector, scrap } from "scrapper";
    export { attrCreator as attr } from "selectors/attr";
    export { existsCreator as exists } from "selectors/exists";
    export { htmlCreator as html } from "selectors/html";
    export { textCreator as text } from "selectors/text";
    export { selectCreator as select } from "selectors/select";
    export { countCreator as count } from "selectors/count";
    export { linkCreator as link } from "selectors/link";
    export { listCreator as List } from "controls/list";
    export { ifCreator as If } from "controls/if";
    import { attrCreator as attr } from "selectors/attr";
    import { existsCreator as exists } from "selectors/exists";
    import { htmlCreator as html } from "selectors/html";
    import { textCreator as text } from "selectors/text";
    import { selectCreator as select } from "selectors/select";
    import { countCreator as count } from "selectors/count";
    import { linkCreator as link } from "selectors/link";
    export const Q: {
        If: <T extends import("selectors/attr").Attr<any> | import("selectors/exists").Exists<any> | import("selectors/html").Html<any> | import("selectors/text").Text<any> | import("selectors/count").Count<any> | import("selectors/link").Link<any> | import("types").Query | import("controls/list").List<any> | import("selectors/select").Select<any> | import("controls/if").If<any, any, any, any>, F extends import("selectors/attr").Attr<any> | import("selectors/exists").Exists<any> | import("selectors/html").Html<any> | import("selectors/text").Text<any> | import("selectors/count").Count<any> | import("selectors/link").Link<any> | import("types").Query | import("controls/list").List<any> | import("selectors/select").Select<any> | import("controls/if").If<any, any, any, any>>(selector: string, condition: (el: Cheerio) => boolean, truthy: T, falsey: F) => import("controls/if").If<T, F, import("types").TypeOf<T>, import("types").TypeOf<F>>;
        attr: typeof attr;
        exists: typeof exists;
        html: typeof html;
        List: <Q extends import("selectors/attr").Attr<any> | import("selectors/exists").Exists<any> | import("selectors/html").Html<any> | import("selectors/text").Text<any> | import("selectors/count").Count<any> | import("selectors/link").Link<any> | import("types").Query | import("controls/list").List<any> | import("selectors/select").Select<any> | import("controls/if").If<any, any, any, any>>(selector: string, data: Q, predicate?: (el: Cheerio, index: number) => boolean) => import("controls/list").List<Q extends import("types").Query ? import("types").TypeOfQuery<Q> : Q extends import("types").Selector ? import("types").TypeOfSelector<Q> : never>;
        text: typeof text;
        select: typeof select;
        count: typeof count;
        link: typeof link;
    };
}
