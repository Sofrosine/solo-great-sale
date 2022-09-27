import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CardItem from 'components/CardItem';
import HeaderView from 'components/HeaderView';
import TextInput from 'components/TextInput';
import View from 'components/View';
import useGetTenantByCategory from 'queries/tenant/useGetTenantByCategory';

import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import {Alert, FlatList, TouchableOpacity} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import styles from './styles';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'CategoryDetailPage'
  >;
  route: RouteProp<RootStackParamList, 'CategoryDetailPage'>;
};

const CategoryDetailPage: FC<Props> = ({route, navigation}) => {
  const {id, title} = route?.params || {};

  const [realData, setRealData] = useState([]);
  const [tenantData, setTenantData] = useState<any>([]);

  const {data: tenantByCategoryData, isFetching: isCategoryFetching} =
    useGetTenantByCategory({id});

  useEffect(() => {
    if (tenantByCategoryData) {
      setTenantData(tenantByCategoryData);
      setRealData(tenantByCategoryData);
    }
  }, [tenantByCategoryData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <HeaderView
          title={title}
          right={
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Ionicons
                size={24}
                name="cart-outline"
                color={Color.ALMOST_BLACK}
              />
            </TouchableOpacity>
          }
        />
      ),
    });
  });

  return (
    <View>
      <ContentLoader
        active
        loading={isCategoryFetching}
        containerStyles={tailwind('p-8')}
        tHeight={40}>
        <View color={Color.WHITE} paddingY={16} paddingX={20}>
          <TextInput
            onChangeText={val => {
              var searchRegex = new RegExp(val, 'i');
              let arr = [...realData];
              arr = arr.filter((item: any) =>
                searchRegex?.test(item?.tenant?.nama_toko),
              );
              setTenantData(arr);
            }}
            placeholder="Cari tenant"
          />
        </View>
        <FlatList
          numColumns={2}
          data={tenantData}
          contentContainerStyle={tailwind('py-8')}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View marginY={8} />}
          renderItem={({item}) => (
            <View style={styles.cardContainer} marginX={8}>
              <CardItem
                onPress={() =>
                  navigation.navigate('TenantDetailPage', {
                    id: item?.id_tenant,
                    title: item?.tenant?.nama_toko,
                  })
                }
                image={
                  'http://transaksi.sologreatsale.com' + item?.tenant?.path_logo
                }
                title={item?.tenant?.nama_toko}
              />
            </View>
          )}
        />
      </ContentLoader>
    </View>
  );
};

export default CategoryDetailPage;
