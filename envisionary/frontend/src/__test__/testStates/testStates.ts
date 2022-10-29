import { useEffect } from "react";
import { RecoilState, useRecoilValue } from "recoil";
import { searchQueryState } from "../../states/states";
import { atom } from "recoil";
import React, { Component } from 'react';

export const RecoilObserver = (node: RecoilState<string>, onInput: any) => {
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