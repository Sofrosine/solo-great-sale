import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Logo from 'assets/images/sgs.png';
import HeaderView from 'components/HeaderView';
import Text from 'components/Text';
import CartPage from 'pages/CartPage';
import CategoryDetailPage from 'pages/CategoryDetailPage';
import CategoryPage from 'pages/CategoryPage';
import HomePage from 'pages/HomePage';
import ProductDetailPage from 'pages/ProductDetailPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import SplashPage from 'pages/SplashPage';
import TenantDetailPage from 'pages/TenantDetailPage';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from 'styles/Color';
import {getSize} from 'utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ScanTenantPage from 'pages/ScanTenantPage';
import WebviewPage from 'pages/WebviewPage';
import TransactionDetailPage from 'pages/TransactionDetailPage';
import TransactionPage from 'pages/TransactionPage';
import TransactionDirectPage from 'pages/TransactionDirectPage';
import View from 'components/View';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  // const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let icon = 'home';
          if (route.name === 'Home') {
            icon = 'home-outline';
          } else if (route.name === 'Category') {
            icon = 'grid-outline';
          } else if (route.name === 'Cart') {
            icon = 'cart-outline';
          } else if (route.name === 'Profile') {
            icon = 'person-outline';
          }
          return (
            <Ionicons
              color={focused ? Color.PRIMARY : Color.ALMOST_BLACK}
              name={icon}
              size={24}
            />
          );
        },
        tabBarStyle: {
          height: insets.bottom + getSize(54),
          paddingTop: 10,
          paddingBottom: 4,
        },
        tabBarItemStyle: {
          marginBottom: getSize(8),
        },
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'HOME',
          tabBarActiveTintColor: Color.PRIMARY,
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: 'Lato-Bold',
          },
          header: () => (
            <HeaderView
              left={
                <FastImage
                  resizeMode="contain"
                  source={Logo}
                  style={{width: 80, height: 40}}
                />
              }
              center={<Text family="latoBold">Solo Great Sale</Text>}
            />
          ),
        }}
        component={HomePage}
      />
      <Tab.Screen
        name="Category"
        options={{
          tabBarLabel: 'KATEGORI',
          tabBarActiveTintColor: Color.PRIMARY,
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: 'Lato-Bold',
          },
          header: () => (
            <HeaderView
              left={
                <FastImage
                  resizeMode="contain"
                  source={Logo}
                  style={{width: 80, height: 40}}
                />
              }
              center={<Text family="latoBold">Solo Great Sale</Text>}
            />
          ),
        }}
        component={CategoryPage}
      />
      <Tab.Screen
        name="ScanTenant"
        options={{
          tabBarLabel: '',
          tabBarActiveTintColor: Color.PRIMARY,
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: 'Lato-Bold',
          },
          tabBarItemStyle: {
            position: 'absolute',
            bottom: '90%',
            left: '43%',
            height: 54,
            width: 54,
            backgroundColor: Color.PRIMARY,
            borderRadius: 200,
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarIcon: () => (
            <FontAwesome
              style={{top: '25%'}}
              name="qrcode"
              size={32}
              color={Color.WHITE}
            />
          ),
          header: () => (
            <HeaderView
              left={
                <FastImage
                  resizeMode="contain"
                  source={Logo}
                  style={{width: 80, height: 40}}
                />
              }
              center={<Text family="latoBold">Scan Tenant</Text>}
            />
          ),
        }}
        component={ScanTenantPage}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarLabel: 'KERANJANG',
          tabBarActiveTintColor: Color.PRIMARY,
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: 'Lato-Bold',
          },
          header: () => (
            <HeaderView
              left={
                <FastImage
                  resizeMode="contain"
                  source={Logo}
                  style={{width: 80, height: 40}}
                />
              }
              center={<Text family="latoBold">Solo Great Sale</Text>}
            />
          ),
        }}
        component={CartPage}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'PROFILE',
          tabBarActiveTintColor: Color.PRIMARY,
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: 'Lato-Bold',
          },
          header: () => (
            <HeaderView
              left={
                <FastImage
                  resizeMode="contain"
                  source={Logo}
                  style={{width: 80, height: 40}}
                />
              }
              center={<Text family="latoBold">Solo Great Sale</Text>}
            />
          ),
        }}
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
};

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SplashPage"
          component={SplashPage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HomePage"
          component={HomeScreen}
        />
        <Stack.Screen
          name="CategoryDetailPage"
          component={CategoryDetailPage}
        />
        <Stack.Screen
          name="ProductDetailPage"
          component={ProductDetailPage}
          options={{
            header: ({navigation, route}: any) => {
              const {title} = route?.params || {};
              return (
                <HeaderView
                  title={title}
                  right={
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Cart')}>
                      <Ionicons
                        size={24}
                        name="cart-outline"
                        color={Color.ALMOST_BLACK}
                      />
                    </TouchableOpacity>
                  }
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{
            header: () => {
              return (
                <HeaderView
                  left={
                    <FastImage
                      resizeMode="contain"
                      source={Logo}
                      style={{width: 80, height: 40}}
                    />
                  }
                  center={<Text family="latoBold">Daftar Akun</Text>}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="TenantDetailPage"
          component={TenantDetailPage}
          options={{
            header: ({route}: any) => {
              const {title} = route?.params || {};
              return (
                <HeaderView center={<Text family="latoBold">{title}</Text>} />
              );
            },
          }}
        />
        <Stack.Screen
          name="WebviewPage"
          component={WebviewPage}
          options={{
            header: ({route}: any) => {
              const {title} = route?.params || {};
              return (
                <HeaderView center={<Text family="latoBold">{title}</Text>} />
              );
            },
          }}
        />
        <Stack.Screen
          name="TransactionDetailPage"
          component={TransactionDetailPage}
          options={{
            header: ({}: any) => {
              return <HeaderView title="Invoice" />;
            },
          }}
        />
        <Stack.Screen
          name="TransactionPage"
          component={TransactionPage}
          options={{
            header: () => {
              return (
                <HeaderView
                  center={<Text family="latoBold">Daftar Transaksi</Text>}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="TransactionDirectPage"
          component={TransactionDirectPage}
          options={{
            header: () => {
              return (
                <HeaderView
                  center={<Text family="latoBold">Transaksi Langsung</Text>}
                  right={<View />}
                />
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
