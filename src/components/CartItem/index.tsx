import Text from 'components/Text';
import View from 'components/View';
import React, {FC, memo} from 'react';
import FastImage from 'react-native-fast-image';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {currencyConverter} from 'utils';
import styles from './styles';

type Props = {
  item: any;
};

const CartItem: FC<Props> = ({item}) => {
  return (
    <View style={tailwind('flex-row ')}>
      <FastImage
        source={{
          uri: item?.image_path_file,
          priority: FastImage.priority.high,
        }}
        style={styles.image}
      />
      <View style={tailwind('flex-1')} marginLeft={16}>
        <Text family="latoBold">{item?.nama_produk}</Text>
        <View marginBottom={2} />
        <Text color={Color.GREY_TEXT} size={12}>
          {item?.tenant?.nama_pemilik}
        </Text>
        <View marginBottom={4} />
        <Text>{currencyConverter(item?.harga)}</Text>
        <View marginBottom={8} />
        <View
          style={tailwind('self-start px-4 py-2 rounded-lg')}
          color={Color.ALMOST_WHITE}>
          <Text size={10}>Jumlah: {item?.qty}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(CartItem);
