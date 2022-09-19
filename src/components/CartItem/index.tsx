import Text from 'components/Text';
import TextInput from 'components/TextInput';
import View from 'components/View';
import React, {FC, memo} from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {currencyConverter} from 'utils';
import styles from './styles';

type Props = {
  item: any;
  isDirect?: boolean;
  onChangeText?: (val: string) => void;
  inputValue?: number;
  noQty?: boolean;
  onDelete?: (item?: any) => void;
};

const CartItem: FC<Props> = ({
  item,
  isDirect,
  onChangeText,
  inputValue,
  noQty,
  onDelete,
}) => {
  return (
    <View style={tailwind('flex-row ')}>
      <FastImage
        source={{
          uri:
            item?.image_path_file ||
            item?.img_url ||
            `http://transaksi.sologreatsale.com${item?.photo_product[0]?.path_file}`,
          priority: FastImage.priority.high,
        }}
        style={styles.image}
      />
      <View style={tailwind('flex-1')} marginLeft={16}>
        <Text family="latoBold">{item?.nama_produk || item?.goods_name}</Text>
        <View marginBottom={8} />
        {isDirect ? (
          <View style={tailwind('relative')}>
            <Text style={styles.textInputCustom} size={13} family="latoRegular">
              {currencyConverter(inputValue || 0)}
            </Text>
            <TextInput
              containerStyle={tailwind('pl-10')}
              color={Color.WHITE}
              fontSize={14}
              keyboardType="numeric"
              onChangeText={val => onChangeText && onChangeText(val)}
            />
          </View>
        ) : (
          <View>
            <Text>{currencyConverter(item?.harga || item?.goods_amt)}</Text>
            <View marginBottom={8} />
            {!noQty ? (
              <View
                style={tailwind('self-start px-4 py-2 rounded-lg')}
                color={Color.ALMOST_WHITE}>
                <Text size={10}>Jumlah: {item?.qty || item?.goods_qty}</Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        )}
      </View>
      {onDelete && (
        <View>
          <TouchableOpacity onPress={() => onDelete && onDelete()}>
            <Feather name="trash-2" color={Color.ALMOST_BLACK} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default memo(CartItem);
