import { atom, RecoilState } from "recoil";

export const searchQueryState = atom({
  key: 'queryfromuser',
  default: '',
});

export const changeDetectedState = atom<Boolean>({
  key: 'detectedstate',
  default: false,
});

export const categoryState = atom({
  key: 'stateforcategory',
  default: 'Country',
});

export const pageState = atom({
  key: 'pageforpagination',
  default: 0,
});


// Kan fjerne denne staten, men er greit å ha i begynnelsen så man skjønner hovedprinsippet til recoil!
export const testRecoilState = atom({
  key: 'testRecoilID',
  default: 1,
});