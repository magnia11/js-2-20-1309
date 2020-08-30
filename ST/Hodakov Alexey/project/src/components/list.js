import { CatalogItem, BasketItem } from "./ITEMS.js";

let classes = {
  Catalog: CatalogItem,
  Basket: BasketItem,
};

export default class List {
  constructor(container, url) {
    this.container = document.querySelector(container);
    this.items = [];
    this.url = url;
    this._init();
  }
  _init() {
    let url =
      "https://raw.githubusercontent.com/kellolo/static/master/JSON" + this.url;
    this._get(url)
      .then((data) => {
        this.items = this.basket ? data : data.content;
      })
      .finally(() => {
        this.render();
        this._handleActions();
      });
  }
  _get(url) {
    return fetch(url).then((d) => d.json());
  }
  render() {
    let htmlStr = "";
    this.items.forEach((item) => {
      htmlStr += new classes[this.constructor.name](item).render();
    });
    this.container.innerHTML = htmlStr;
  }
}