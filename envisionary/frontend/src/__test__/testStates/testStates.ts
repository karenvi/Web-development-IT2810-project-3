import { useEffect } from "react";
import { useRecoilValue } from "recoil";

/* export const RecoilObserver = (node: any, onInput: any) => {
    const value = useRecoilValue(node);
    useEffect(() => onInput(value), [onInput, value]);
    return null;
}; */

export const RecoilObserver = ({node, onInput}: any) => {
  const value = useRecoilValue(node);
  useEffect(() => onInput(value), [onInput, value]);
  return null;
};


/* export const RecoilObserver = (node: RecoilState<string>, onChange: React.ChangeEvent<HTMLInputElement>) => {
    const value = useRecoilValue(node);
    useEffect(() => onChange(value), [onChange, value]);
    return null;
  }; */


/*   export const RecoilObserver = ({node, onChange}) => {
    const value = useRecoilValue(node);
    useEffect(() => onChange(value), [onChange, value]);
    return null;
  }; */