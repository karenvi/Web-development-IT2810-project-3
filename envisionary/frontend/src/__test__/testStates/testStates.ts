import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export const RecoilObserver = ({node, onInput}: any) => {
  const value = useRecoilValue(node);
  useEffect(() => onInput(value), [onInput, value]);
  return null;
};