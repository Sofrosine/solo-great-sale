import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {emptyCart} from 'actions/cart-action';
import Button from 'components/Button';
import CartItem from 'components/CartItem';
import Dropdown from 'components/Dropdown';
import Text from 'components/Text';
import View from 'components/View';
import useCheckout from 'queries/checkout/useCheckout';
import useGetPaymentMethod from 'queries/checkout/useGetPaymentMethod';
import useGetToc from 'queries/checkout/useGetToc';
import useGetProductDirect from 'queries/product/useGetProductDirect';
import usePostQrisGenerate from 'queries/transaction/usePostQrisGenerate';
import React, {FC, useContext, useState} from 'react';
import {Alert, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import FastImage from 'react-native-fast-image';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RenderHTML from 'react-native-render-html';
import Feather from 'react-native-vector-icons/Feather';

import {Store} from 'reducers';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {currencyConverter, deviceWidth, showToast} from 'utils';
import styles from './styles';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'TransactionDirectPage'
  >;
  route: RouteProp<RootStackParamList, 'TransactionDirectPage'>;
};

const TransactionDirectPage: FC<Props> = ({navigation, route}) => {
  const {tenantId} = route?.params || {};
  const {cart, user} = useContext(Store);

  const [selectedPayment, setPayment] = useState<any>(null);
  const [paymentProof, setPaymentProof] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isQris, setQris] = useState(0);
  const [tocSelected, setTocSelected] = useState(false);

  const [userData] = user;
  const [, dispatchCart] = cart;

  const {data: paymentMethodData} = useGetPaymentMethod();
  const {data: productDirectData} = useGetProductDirect();
  const {data: tocData, isFetching: tocFetching} = useGetToc();

  const {mutate: checkoutMutate} = useCheckout({token: userData?.token});
  const {mutateAsync: qrisMutate} = usePostQrisGenerate();
  console.log(userData, tenantId);

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

    if (!totalPrice) {
      showToast('Silahkan masukkan total harga terlebih dahulu');
      isValidate = false;
    }

    if (!paymentProof) {
      showToast('Upload bukti transaksi terlebih dahulu');
      isValidate = false;
    }

    if (!selectedPayment?.id) {
      showToast('Pilih jenis pembayaran terlebih dahulu');
      isValidate = false;
    }

    if (!tocSelected) {
      showToast('Harap menyetujui persyaratan dan ketentuan yang berlaku');
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
      productDirectData?.map((val: any, index: number) => {
        formData?.append(`carts[${index}][harga]`, totalPrice);
        formData?.append(`carts[${index}][quantity]`, 1);
        formData?.append(`carts[${index}][id]`, val?.id);
        formData?.append(`carts[${index}][id_tenant]`, tenantId);
      });

      formData?.append('bukti_transaksi', {
        uri: paymentProof,
        type: 'image/jpeg', // or photo.type
        name: 'proof.jpg',
      });
      formData?.append('is_qris', isQris);
      formData?.append(
        'nama',
        `${userData?.data?.nama_depan} ${userData?.data?.nama_belakang}`,
      );
      formData?.append('alamat', userData?.data?.alamat);
      formData?.append('no_hp', userData?.data?.nomor_hp);

      checkoutMutate(
        {
          data: formData,
        },
        {
          onSuccess: async res => {
            if (res?.status) {
              if (isQris) {
                await qrisMutate(
                  {
                    data: {
                      id_transaksi: res?.data?.id,
                      _token: userData?.token,
                    },
                  },
                  {
                    onSettled: () => {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            {name: 'HomePage'},
                            {
                              name: 'TransactionDetailPage',
                              params: {id: res?.data?.id},
                            },
                          ],
                        }),
                      );
                    },
                  },
                );
                setLoading(false);
              } else {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'HomePage'}],
                  }),
                );
                setLoading(false);
              }
              showToast(res?.message);
              AsyncStorage.removeItem('cart');
              dispatchCart(emptyCart());
              setLoading(false);
            }
          },
          onError: err => {
            console.log('err', err);
          },
        },
      );
    }
  };

  const source = {
    html: `
${tocData?.data}
  `,
  };

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView>
        <FlatList
          contentContainerStyle={tailwind('p-4')}
          data={productDirectData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <CartItem
              item={item}
              isDirect
              inputValue={totalPrice}
              onChangeText={val => {
                setTotalPrice(Number(val));
              }}
            />
          )}
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
            onPress={item => {
              setPayment({
                label: item?.label,
                id: item?.id,
              });
              setQris(item?.isQris);
            }}
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
            style={tailwind('flex-row items-center justify-between')}>
            <Text size={12} color={Color.GREY_TEXT}>
              Kupon:
            </Text>
            <Text>{Math.floor(totalPrice / 50000)}</Text>
          </View>
          <View marginTop={16}>
            <Text size={16} family="latoBold">
              Terms Of Condition
            </Text>
            <ContentLoader
              containerStyles={tailwind('my-4')}
              loading={tocFetching}>
              <RenderHTML
                tagsStyles={{
                  p: {color: Color.ALMOST_BLACK},
                  li: {
                    color: Color.GREY_TEXT,
                  },
                  b: {},
                }}
                contentWidth={deviceWidth}
                source={source}
              />
              <View marginBottom={20}>
                <TouchableOpacity
                  onPress={() => {
                    setTocSelected(!tocSelected);
                  }}
                  style={tailwind('flex-row items-center')}>
                  <Feather
                    name={tocSelected ? 'check-square' : 'square'}
                    color={tocSelected ? Color.PRIMARY : Color.GREY}
                    size={24}
                  />
                  <View marginRight={8} />
                  <View style={tailwind('flex-1')}>
                    <Text size={12}>
                      Saya telah membaca persyaratan dan ketentuan yang berlaku
                      di Terms Of Conditions.
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ContentLoader>
          </View>

          <Button
            onPress={handleSubmit}
            loading={loading}
            label="KONFIRMASI CHECKOUT"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionDirectPage;
