import { atom } from "recoil";

export const searchQueryState = atom({
  key: 'searchQueryID',
  default: '',
});

// Makes "country" the default state to search for
export const categoryState = atom({
  key: 'categoryStateID',
  default: 'Country',
});


// Kan fjerne denne staten, men er greit å ha i begynnelsen så man skjønner hovedprinsippet til recoil!
export const testRecoilState = atom({
    key: 'testRecoilID',
    default: 1,
  });