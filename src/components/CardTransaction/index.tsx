import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Text from 'components/Text';
import View from 'components/View';
import {format} from 'date-fns';
import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {currencyConverter} from 'utils';
import styles from './styles';

type Props = {
  item: any;
};

const CardTransaction: React.FC<Props> = ({item}) => {
  const navigation: NativeStackNavigationProp<
    RootStackParamList,
    'TransactionPage'
  > = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (item?.is_qris === 1) {
          navigation.navigate('TransactionDetailPage', {
            id: item?.id,
          });
        }
      }}
      style={tailwind('flex-row')}>
      <FastImage
        source={{
          uri: 'http://transaksi.sologreatsale.com' + item?.path_file,
          priority: FastImage.priority.high,
        }}
        style={styles.image}
      />
      <View style={tailwind('flex-1 justify-between')} marginLeft={20}>
        <View>
          <Text size={14} family="latoBold">
            Transaksi {item?.id} ({item?.jenis_payment?.nama})
          </Text>
          <View marginBottom={2} />
          <Text color={Color.GREY_TEXT} size={12}>
            {format(
              new Date(item?.trx_date ? item?.trx_date : new Date()),
              'dd MMMM yyyy',
            )}
          </Text>
          <Text color={Color.GREY_TEXT} size={12}>
            Kupon: {item?.jml_kupon}
          </Text>
        </View>
        <View>
          <Text size={12} family="latoBold">
            Total: {currencyConverter(item?.total_amount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CardTransaction);
