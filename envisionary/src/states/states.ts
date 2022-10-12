import { atom } from "recoil";


// Kan fjerne denne staten, men er greit å ha i begynnelsen så man skjønner hovedprinsippet til recoil!
export const testRecoilState = atom({
    key: 'testRecoilID',
    default: 1,
  });