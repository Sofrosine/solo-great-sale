import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {setToken, setUser} from 'actions';
import {emptyCart} from 'actions/cart-action';
import Logo from 'assets/images/sgs.png';
import Button from 'components/Button';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import View from 'components/View';
import useLogin from 'queries/auth/useLogin';
import React, {useContext, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import {Store} from 'reducers';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {getSize, showToast, useForm} from 'utils';
import styles from './styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfilePage: React.FC<Props> = ({navigation}) => {
  const {user, cart} = useContext(Store);
  const [userData, dispatchUser] = user;
  const [, dispatchCart] = cart;

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const {mutate: loginMutate} = useLogin();

  const handleSubmit = () => {
    if (form.email && form.password) {
      setLoading(true);
      loginMutate(
        {
          data: {
            email: form?.email,
            password: form?.password,
          },
        },
        {
          onSuccess: response => {
            if (response) {
              const {data, message} = response;
              console.log('aa', data);

              dispatchUser(setUser(data));
              dispatchUser(setToken(data?._token));

              AsyncStorage.setItem('token', data?._token);
              AsyncStorage.setItem('user', JSON.stringify(data));
              showToast(message);
              setForm({email: '', password: ''});
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
    } else {
      showToast('Silahkan lengkapi data login');
    }
  };

  const showLogoutAlert = () =>
    Alert.alert('Keluar', 'Apakah Anda yakin ingin keluar?', [
      {
        text: 'Batalkan',
        style: 'cancel',
      },
      {
        text: 'Yakin',
        onPress: () => {
          handleLogout();
        },
      },
    ]);

  const handleLogout = () => {
    AsyncStorage.clear();
    dispatchUser(setUser(null));
    dispatchUser(setToken(null));
    dispatchCart(emptyCart());
  };

  return (
    <View style={tailwind('flex-1 bg-white')}>
      {userData?.token ? (
        <View style={tailwind('flex-1')} paddingTop={0}>
          <View marginTop={16} style={tailwind('flex-1')}>
            <View paddingX={20} style={tailwind('flex-row items-center')}>
              <FastImage
                resizeMode="contain"
                source={Logo}
                style={styles.image}
              />
              <View style={tailwind('flex-1')} marginLeft={16}>
                <Text size={16} family="latoBold">
                  {userData?.data?.nama_depan} {userData?.data?.nama_belakang}
                </Text>
                <View marginBottom={2} />
                <Text color={Color.GREY_TEXT} family="latoBold" size={12}>
                  {userData?.data?.email}
                </Text>
                <View marginBottom={8} />
                <Text color={Color.GREY_TEXT} size={12} family="latoBold">
                  {userData?.data?.nomor_hp}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => navigation.navigate('TransactionPage')}
              style={[tailwind('flex-row justify-between items-center px-6')]}>
              <View style={tailwind('flex-row items-center')}>
                <Feather
                  name="file-text"
                  color={Color.PRIMARY}
                  size={getSize(18)}
                />
                <View marginRight={14} />
                <Text size={14} family="latoBold">
                  Daftar Transaksi
                </Text>
              </View>
              <Feather
                name="chevron-right"
                color={Color.BLACK_05}
                size={getSize(20)}
              />
            </TouchableOpacity>

            <View style={styles.divider} />
          </View>
          <View marginBottom={48} paddingX={20} paddingTop={8}>
            <Text
              style={tailwind('text-center my-4')}
              size={12}
              color={
                Color.GREY_TEXT
              }>{`Version ${DeviceInfo.getVersion()}`}</Text>
            <Button label="Keluar" transparent onPress={showLogoutAlert} />
          </View>
        </View>
      ) : (
        <View
          paddingX={20}
          style={tailwind('flex-1 items-center justify-center')}>
          <Text family="latoBold" size={16}>
            Masuk
          </Text>
          <View style={tailwind('w-full')}>
            <TextInput
              keyboardType="email-address"
              onChangeText={val => setForm({email: val})}
              value={form.email}
              placeholder="Masukkan email"
              label="Email"
            />
            <View marginBottom={16} />
            <TextInput
              onChangeText={val => setForm({password: val})}
              value={form.password}
              placeholder="Masukkan password"
              label="Pasword"
              secureTextEntry={true}
            />
            <View marginTop={8} style={tailwind('items-end')}>
              <Text size={12}>
                Lupa kata sandi?{' '}
                <Text
                  onPress={() => navigation.navigate('ForgotPasswordPage')}
                  size={12}
                  family="latoBold"
                  color={Color.PRIMARY}>
                  Atur ulang
                </Text>
              </Text>
            </View>
            <View marginBottom={24} />
            <Button onPress={handleSubmit} loading={loading} label="MASUK" />
            <View marginBottom={8} />
            <View marginTop={8} style={tailwind('items-center')}>
              <Text size={12}>
                Belum punya akun?{' '}
                <Text
                  onPress={() => navigation.navigate('RegisterPage')}
                  size={12}
                  family="latoBold"
                  color={Color.PRIMARY}>
                  Daftar
                </Text>
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfilePage;
