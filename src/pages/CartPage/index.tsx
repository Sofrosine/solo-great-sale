import Button from 'components/Button';
import CartItem from 'components/CartItem';
import Text from 'components/Text';
import View from 'components/View';
import Dropdown from 'components/Dropdown';
import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Alert, FlatList, ScrollView} from 'react-native';
import {Store} from 'reducers';
import tailwind from 'tailwind-rn';
import styles from './styles';
import {PAYMENT_METHOD} from 'constants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import Color from 'styles/Color';
import {currencyConverter, showToast} from 'utils';
import useCheckout from 'queries/checkout/useCheckout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {emptyCart} from 'actions/cart-action';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import useGetPaymentMethod from 'queries/checkout/useGetPaymentMethod';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cart'>;
};

const CartPage: FC<Props> = ({navigation}) => {
  const {cart, user} = useContext(Store);

  const [selectedPayment, setPayment] = useState<any>(null);
  const [paymentProof, setPaymentProof] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const [userData] = user;
  const [cartData, dispatchCart] = cart;

  const {mutate: checkoutMutate} = useCheckout({token: userData?.token});
  const {data: paymentMethodData} = useGetPaymentMethod();

  useFocusEffect(
    useCallback(() => {
      getTotalPrice();
      return () => setTotalPrice(0);
    }, [cartData]),
  );
  const getTotalPrice = () => {
    cartData?.data?.map((cartItem: any) =>
      setTotalPrice(val => val + cartItem?.harga),
    );
  };

  const createThreeButtonAlert = () =>
    Alert.alert('Pilih file', 'Pilih option untuk upload foto', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Buka Kamera',
        onPress: () => {
          launchCamera({quality: 0.6, mediaType: 'photo'})
            .then(res => {
              if (!res?.didCancel) {
                setPaymentProof(res?.assets ? res?.assets[0]?.uri : '');
              }
            })
            .catch(err => {
              console.log('ee', err);
            });
        },
      },
      {
        text: 'Buka Library',
        onPress: () => {
          launchImageLibrary({quality: 0.6, mediaType: 'photo'})
            .then(res => {
              if (!res?.didCancel) {
                setPaymentProof(res?.assets ? res?.assets[0]?.uri : '');
              }
            })
            .catch(err => {
              console.log('ee', err);
            });
        },
      },
    ]);

  const validate = () => {
    let isValidate = true;

    if (!paymentProof) {
      showToast('Upload bukti transaksi terlebih dahulu');
      isValidate = false;
    }

    if (!selectedPayment?.id) {
      showToast('Pilih jenis pembayaran terlebih dahulu');
      isValidate = false;
    }

    return isValidate;
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
      const formData = new FormData();
      formData?.append('_token', userData?.token);
      formData?.append('id_jenis_payment', selectedPayment?.id);
      cartData?.data?.map((val: any, index: number) => {
        formData?.append(`carts[${index}][harga]`, val?.harga);
        formData?.append(`carts[${index}][quantity]`, val?.qty);
        formData?.append(`carts[${index}][id]`, val?.id);
        formData?.append(`carts[${index}][id_tenant]`, val?.tenant?.id);
      });
      formData?.append('bukti_transaksi', {
        uri: paymentProof,
        type: 'image/jpeg', // or photo.type
        name: 'proof.jpg',
      });

      checkoutMutate(
        {
          data: formData,
        },
        {
          onSuccess: res => {
            if (res?.status) {
              showToast(res?.message);
              AsyncStorage.removeItem('cart');
              dispatchCart(emptyCart());
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'HomePage'}],
                }),
              );
            }
          },
          onError: err => {
            console.log('err', err);
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
      {cartData?.data?.length > 0 ? (
        <ScrollView>
          <FlatList
            contentContainerStyle={tailwind('p-4')}
            data={cartData?.data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => <CartItem item={item} />}
            ItemSeparatorComponent={() => <View marginY={8} />}
          />
          <View style={styles.divider} />
          <View paddingX={20} paddingY={8}>
            <Text family="latoBold">Bukti Transaksi</Text>
            <View marginBottom={16} />
            {paymentProof && (
              <View marginY={16}>
                <FastImage
                  source={{
                    uri: paymentProof,
                    priority: FastImage.priority.high,
                  }}
                  style={styles.imageProof}
                />
              </View>
            )}
            <Button
              onPress={createThreeButtonAlert}
              label="Pilih file"
              transparent
            />
          </View>
          <View paddingY={8}>
            <Dropdown
              item={{
                label: selectedPayment?.label ?? 'Pilih Jenis Pembayaran',
                id: '1',
                sub: paymentMethodData || [],
              }}
              onPress={item =>
                setPayment({
                  label: item?.label,
                  id: item?.id,
                })
              }
            />
          </View>
          <View style={styles.divider} />
          <View paddingX={20} paddingTop={16} paddingBottom={40}>
            <Text family="latoBold">Detail Pembayaran:</Text>
            <View
              marginTop={8}
              style={tailwind('flex-row items-center justify-between')}>
              <Text size={12} color={Color.GREY_TEXT}>
                Total:
              </Text>
              <Text>{currencyConverter(totalPrice)}</Text>
            </View>
            <View
              marginTop={8}
              marginBottom={40}
              style={tailwind('flex-row items-center justify-between')}>
              <Text size={12} color={Color.GREY_TEXT}>
                Kupon:
              </Text>
              <Text>{Math.floor(totalPrice / 50000)}</Text>
            </View>
            <Button
              onPress={handleSubmit}
              loading={loading}
              label="KONFIRMASI CHECKOUT"
            />
          </View>
        </ScrollView>
      ) : (
        <View style={tailwind('flex-1 justify-center items-center')}>
          <Text family="latoBold" size={16}>
            Keranjang kamu masih kosong.
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartPage;
