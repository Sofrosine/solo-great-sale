import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {setToken, setUser} from 'actions';
import {setCart} from 'actions/cart-action';
import Logo from 'assets/images/sgs.png';
import React, {FC, useContext, useEffect} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Store} from 'reducers';
import styles from './styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SplashPage'>;
};

const SplashPage: FC<Props> = ({navigation}) => {
  const {cart, user} = useContext(Store);

  const [, dispatchUser] = user;
  const [, dispatchCart] = cart;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const userData = JSON.parse((await AsyncStorage.getItem('user')) ?? '{}');
      const token = await AsyncStorage.getItem('token');
      const cartData = JSON.parse((await AsyncStorage.getItem('cart')) ?? '[]');
      if (cart) {
        dispatchCart(setCart(cartData));
      }
      if (user) {
        dispatchUser(setUser(userData));
        dispatchUser(setToken(token));
      }
    } catch {
    } finally {
      setTimeout(() => {
        navigation.replace('HomePage');
      }, 500);
    }
  };

  return (
    <View style={styles.pages}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={Logo}
        style={styles.image}
      />
    </View>
  );
};

export default SplashPage;
