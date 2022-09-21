import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Text from 'components/Text';
import View from 'components/View';
import useGetTenantDetail from 'queries/tenant/useGetTenantDetail';
import React, {useContext, useEffect} from 'react';
import {FlatList, ScrollView} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import FastImage from 'react-native-fast-image';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import Logo from 'assets/images/sgs.png';

import styles from './styles';
import CardItem from 'components/CardItem';
import {currencyConverter, showToast} from 'utils';
import Button from 'components/Button';
import {Store} from 'reducers';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TenantDetailPage'>;
  route: RouteProp<RootStackParamList, 'TenantDetailPage'>;
};

const TenantDetailPage: React.FC<Props> = ({navigation, route}) => {
  const {id, title} = route?.params || {};

  const {user} = useContext(Store);
  const [userData] = user;

  const {data: tenantData, isFetching: loadingTenant} = useGetTenantDetail({
    id,
  });

  useEffect(() => {
    if (!title) {
      navigation.setParams({title: tenantData?.nama_toko});
    }
  }, [tenantData]);

  return (
    <View color={Color.WHITE} style={tailwind('flex-1')}>
      <ScrollView contentContainerStyle={tailwind('py-8')}>
        <ContentLoader loading={loadingTenant}>
          <View padding={20}>
            <FastImage
              source={{
                uri: `https://transaksi.sologreatsale.com${tenantData?.path_logo}`,
                priority: FastImage.priority.high,
              }}
              style={styles.image}
            />
            <View marginTop={24} />
            <Text color={Color.PRIMARY} family="latoBold" size={16}>
              {tenantData?.nama_toko}
            </Text>
            <View marginBottom={8} />
            <Text>{tenantData?.email_perusahaan}</Text>
            <View marginBottom={8} />
            <Text size={12} color={Color.GREY_TEXT}>
              {tenantData?.alamat}
            </Text>
          </View>
          <View marginTop={16}>
            <Text style={tailwind('px-6')} size={16} family="latoBold">
              List Produk
            </Text>
            <FlatList
              numColumns={2}
              data={tenantData?.produk}
              contentContainerStyle={tailwind('py-6')}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View marginY={8} />}
              ListEmptyComponent={() => (
                <View style={tailwind('items-center')}>
                  <Text size={18}>Produk kosong</Text>
                </View>
              )}
              renderItem={({item}) => (
                <View style={styles.cardContainer} marginX={8}>
                  <CardItem
                    onPress={() =>
                      navigation.navigate('ProductDetailPage', {
                        id: item?.id,
                        title: item?.nama_produk,
                      })
                    }
                    image={`https://transaksi.sologreatsale.com${item?.photo_product[0]?.path_file}`}
                    title={item?.nama_produk}
                    subtitle={currencyConverter(item?.harga)}
                  />
                </View>
              )}
            />
          </View>
        </ContentLoader>
      </ScrollView>
      <View paddingY={24} paddingX={20}>
        <Button
          onPress={() => {
            if (!userData?.token) {
              showToast('Harap masuk terlebih dahulu');
              navigation.navigate('Profile');
            } else {
              navigation.navigate('TransactionDirectPage');
            }
          }}
          label="Transaksi Langsung"
        />
      </View>
    </View>
  );
};

export default TenantDetailPage;
