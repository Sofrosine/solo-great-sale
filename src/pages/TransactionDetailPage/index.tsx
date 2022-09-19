import {RouteProp} from '@react-navigation/native';
import Logo from 'assets/images/sgs.png';
import Button from 'components/Button';

import CartItem from 'components/CartItem';
import ModalQRIS from 'components/ModalQRIS';
import Text from 'components/Text';
import View from 'components/View';
import {INVOICE_LIST} from 'constants';
import {format} from 'date-fns';
import usePostTransactionDetail from 'queries/transaction/usePostTransactionDetail';

import React, {useContext, useEffect, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import FastImage from 'react-native-fast-image';
import {Store} from 'reducers';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {currencyConverter} from 'utils';
import styles from './styles';

type Props = {
  route: RouteProp<RootStackParamList, 'TransactionDetailPage'>;
};

const TransactionDetailPage: React.FC<Props> = ({route}) => {
  const {id} = route?.params || {};

  const {user} = useContext(Store);
  const [userData] = user;

  const [realData, setRealData] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const {
    mutate: trxDetailMutate,
    isLoading,
    data: trxData,
  } = usePostTransactionDetail();

  useEffect(() => {
    getTrxDetail();
  }, []);

  useEffect(() => {
    if (trxData?.qris) {
      setRealData(JSON.parse(trxData?.qris?.response || '{}'));
    }
  }, [trxData]);

  const getTrxDetail = () => {
    trxDetailMutate({data: {transaksi_id: id, _token: userData?.token}});
  };

  const getInvoiceValue = (title: string) => {
    let val: string = '';

    switch (title?.toLowerCase()) {
      case 'tenant':
        val = realData?.result?.biller?.name;
        break;
      case 'nomor':
        val = realData?.result?.biller?.phone;
        break;
      case 'tanggal':
        val = format(
          new Date(
            realData?.result?.time_stamp
              ? Number(`${realData?.result?.time_stamp}000`)
              : new Date(),
          ),
          'dd MMMM yyyy HH:mm:ss',
        );
        break;
      case 'pembayaran':
        val = trxData?.jenis_payment?.nama;
        break;
      case 'pembeli':
        val = realData?.result?.customer?.name;
        break;
    }

    return val;
  };

  const InvoiceList: any = () => {
    return INVOICE_LIST.map((item, index) => (
      <View
        marginBottom={8}
        key={index}
        style={tailwind('flex-row items-center')}>
        <View style={styles.flex}>
          <Text family="latoBold" size={14}>
            {item?.title}
          </Text>
        </View>
        <View marginX={8} />
        <View style={styles.flex2}>
          <Text color={Color.GREY_TEXT}>{getInvoiceValue(item?.title)}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={tailwind('flex-1 ')} color={Color.WHITE}>
      <ScrollView contentContainerStyle={tailwind('bg-white pb-8 pt-2 px-4')}>
        <ContentLoader loading={isLoading}>
          <FastImage resizeMode="contain" source={Logo} style={styles.image} />
          {/* Tenant Tenant Solo Great Sale Nomor 22/20220916150501 Tanggal 2022-09-16
        15:05:01 Pembayaran Linkaja Pembeli Agung Dirmansyah */}
          <View marginTop={24} />
          <InvoiceList />
          <View
            marginTop={8}
            marginBottom={16}
            style={tailwind('h-px')}
            color={Color.GREY}
          />
          <FlatList
            data={realData?.result?.cart?.item?.item ?? []}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <CartItem item={{...item, harga: trxData?.total_amount}} noQty />
            )}
            ItemSeparatorComponent={() => <View marginY={8} />}
          />
          <View marginY={16} style={tailwind('h-px')} color={Color.GREY} />
          <View
            marginBottom={16}
            style={tailwind('flex-row justify-between items-center')}>
            <Text family="latoBold">Total</Text>
            <Text>{currencyConverter(trxData?.total_amount)}</Text>
          </View>
          <View
            marginBottom={16}
            style={tailwind('flex-row justify-between items-center')}>
            <Text family="latoBold">Jumlah Kupon</Text>
            <Text>{trxData?.jml_kupon}</Text>
          </View>
          {realData?.result?.qris ? (
            <View marginTop={24} marginBottom={16} style={tailwind('')}>
              <Button
                onPress={() => setModalVisible(true)}
                label="Bayar QRIS"
              />
              <View marginBottom={16} />
              <Button
                transparent
                onPress={() => getTrxDetail()}
                label="Refresh Pembayaran"
              />
              {/* <Text family="latoBold">Bayar Qris</Text>
              <View marginY={8} />
              {realData?.result &&
              trxData?.qris?.payment_status === 'PENDING' ? (
                <QRCode size={220} value={realData?.result?.qris?.qrString} />
              ) : (
                <View />
              )} */}
              <ModalQRIS
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                data={realData?.result?.qris?.qrString}
              />
            </View>
          ) : (
            <View />
          )}
        </ContentLoader>
      </ScrollView>
    </View>
  );
};

export default TransactionDetailPage;
