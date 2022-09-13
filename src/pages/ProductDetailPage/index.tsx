import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {setCart} from 'actions/cart-action';
import Button from 'components/Button';
import CartQty from 'components/CartQty';
import Text from 'components/Text';
import View from 'components/View';
import useAddtoCart from 'queries/cart/useAddToCart';
import useGetProductDetail from 'queries/product/useGetProductDetail';
import React, {FC, useContext, useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Store} from 'reducers';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {currencyConverter, showToast} from 'utils';

import styles from './styles';
// import {useRecoilValue} from 'recoil';
// import {userState} from 'recoil/atoms';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ProductDetailPage'
  >;
  route: RouteProp<RootStackParamList, 'ProductDetailPage'>;
};

const ProductDetailPage: FC<Props> = ({route, navigation}) => {
  const {id} = route?.params || {};

  const {user, cart} = useContext(Store);
  const [userData] = user;
  const [, dispatchCart] = cart;

  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const {mutate: addToCartMutate} = useAddtoCart({id});

  const {data: productDetailData, isFetching: isProductDetailFetching} =
    useGetProductDetail({id});

  const handleAtc = () => {
    if (!userData?.token) {
      showToast('Harap masuk terlebih dahulu');
      navigation.navigate('Profile');
    } else {
      setLoading(true);
      addToCartMutate(
        {
          data: {
            _token: userData?.token,
          },
        },
        {
          onSuccess: async res => {
            if (res?.status) {
              showToast('Berhasil menambahkan ke keranjang');
              let arr = JSON.parse(
                (await AsyncStorage.getItem('cart')) ?? '[]',
              );

              arr = arr.filter((item: any) => item?.id !== id);
              arr.push({...res?.data, qty});

              AsyncStorage.setItem('cart', JSON.stringify(arr));
              dispatchCart(setCart(arr));
            }
          },
          onError: err => {
            console.log(err);
          },
          onSettled: () => {
            setLoading(false);
          },
        },
      );
    }
  };

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView contentContainerStyle={tailwind('flex-1')}>
        {isProductDetailFetching ? (
          <ActivityIndicator color={Color.PRIMARY} size={40} />
        ) : (
          <>
            <FastImage
              style={styles.image}
              source={{
                uri: productDetailData?.image[0]?.path_file,
                priority: FastImage.priority.high,
              }}
              resizeMode="stretch"
            />
            <View marginY={16}>
              <View paddingX={20}>
                <Text size={16} family="latoBold">
                  {productDetailData?.nama_produk}
                </Text>
                <View marginBottom={4} />
                <Text color={Color.GREY_TEXT} size={11}>
                  {productDetailData?.tenant?.nama_pemilik}
                </Text>
                <View marginBottom={4} />
                <Text>{currencyConverter(productDetailData?.harga)}</Text>
              </View>
              <View style={styles.divider} />
              <View paddingX={20} paddingY={8}>
                <Text family="latoBold">Jumlah Pembelian:</Text>
                <View marginBottom={4} />
                <View style={tailwind('flex-row')}>
                  <CartQty onChangeQty={val => setQty(val)} />
                </View>
              </View>
              <View style={styles.divider} />
              <View paddingX={20}>
                <Text size={11}>{productDetailData?.deskripsi}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <Button
        loading={loading}
        onPress={handleAtc}
        label="TAMBAH KE KERANJANG"
        style={tailwind('rounded-none')}
      />
    </View>
  );
};

export default ProductDetailPage;
