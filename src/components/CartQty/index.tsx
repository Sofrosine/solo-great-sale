import Text from 'components/Text';
import View from 'components/View';
import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';

type Props = {
  onChangeQty: (qty: number) => void;
};

const CartQty: FC<Props> = ({onChangeQty}) => {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    onChangeQty && onChangeQty(qty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty]);

  return (
    <View
      paddingX={16}
      paddingY={8}
      style={tailwind('flex-row items-center rounded-lg ')}
      color={Color.ALMOST_WHITE}>
      <TouchableOpacity
        onPress={() => {
          if (qty > 1) {
            setQty(val => val - 1);
          }
        }}>
        <AntDesign size={24} name="minuscircle" color={Color.PRIMARY} />
      </TouchableOpacity>
      <View marginX={16}>
        <Text>{qty}</Text>
      </View>
      <TouchableOpacity onPress={() => setQty(val => val + 1)}>
        <AntDesign size={24} name="pluscircle" color={Color.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
};

export default CartQty;
