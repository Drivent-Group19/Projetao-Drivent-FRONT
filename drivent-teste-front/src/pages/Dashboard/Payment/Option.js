import React from 'react';
import { OptionBox, OptionType, OpetionPrice } from './style';

export default function Option({ id, name, isRemote, includesHotel, price, setTypeSelected, selected }) {
  return (
    <OptionBox onClick={() => setTypeSelected({ id, name, price, includesHotel, isRemote })} selectedBackground={selected}>
      <OptionType>{name}</OptionType>
      <OpetionPrice>R$ {price}</OpetionPrice>
    </OptionBox>
  );
}
