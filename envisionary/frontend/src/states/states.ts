import { atom } from "recoil";

export const searchQueryState = atom({
  key: 'queryfromuser',
  default: '',
});

export const categoryState = atom({
  key: 'stateforcategory',
  default: 'Country',
});

export const pageState = atom({
  key: 'pageforpagination',
  default: 0,
});