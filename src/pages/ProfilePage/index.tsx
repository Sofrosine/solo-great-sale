import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {setToken, setUser} from 'actions';
import {emptyCart} from 'actions/cart-action';
import Button from 'components/Button';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import View from 'components/View';
import {format} from 'date-fns';
import useLogin from 'queries/auth/useLogin';
import React, {useContext, useState} from 'react';
import {Store} from 'reducers';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {showToast, useForm} from 'utils';

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

  const handleLogout = () => {
    AsyncStorage.clear();
    dispatchUser(setUser(null));
    dispatchUser(setToken(null));
    dispatchCart(emptyCart());
  };

  return (
    <View style={tailwind('flex-1 bg-white px-8')}>
      {userData?.token ? (
        <View style={tailwind('flex-1')} paddingTop={20}>
          <View style={tailwind('flex-1')}>
            <Text size={14}>Halo,</Text>
            <Text size={16} family="latoBold">
              {userData?.data.nama_depan} {userData?.data?.nama_belakang}
            </Text>
            <View marginBottom={8} />
            <Text>
              Terdaftar sejak:{' '}
              <Text family="latoBold">
                {format(
                  new Date(userData?.data?.created_at ?? new Date()),
                  'dd MMMM yyyy',
                )}
              </Text>
            </Text>
            <View marginBottom={4} />
            <Text size={14}>
              Nomor Hp:{' '}
              <Text family="latoBold">{userData?.data?.nomor_hp}</Text>
            </Text>
            <View marginBottom={4} />
            <Text size={14}>
              Alamat: <Text family="latoBold">{userData?.data?.alamat}</Text>
            </Text>
          </View>
          <View marginBottom={40}>
            <Button label="Keluar" transparent onPress={handleLogout} />
          </View>
        </View>
      ) : (
        <View style={tailwind('flex-1 items-center justify-center')}>
          <Text family="latoBold" size={16}>
            Masuk
          </Text>
          <View style={tailwind('w-full')}>
            <TextInput
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
            <View marginBottom={24} />
            <Button onPress={handleSubmit} loading={loading} label="MASUK" />
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfilePage;
