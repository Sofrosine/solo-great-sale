import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CardItem from 'components/CardItem';
import HeaderView from 'components/HeaderView';
import View from 'components/View';
import useGetTenantByCategory from 'queries/tenant/useGetTenantByCategory';

import React, {FC, useLayoutEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
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

  const {data: tenantByCategoryData, isFetching: isCategoryFetching} =
    useGetTenantByCategory({id});

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
        <FlatList
          numColumns={2}
          data={tenantByCategoryData}
          contentContainerStyle={tailwind('py-8')}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View marginY={8} />}
          renderItem={({item}) => (
            <View style={styles.cardContainer} marginX={8}>
              <CardItem
                onPress={() =>
                  navigation.navigate('TenantDetailPage', {
                    id: item?.id_tenant,
                    title: item?.tenant?.nama_pemilik,
                  })
                }
                image={
                  'http://transaksi.sologreatsale.com' + item?.tenant?.path_logo
                }
                title={item?.tenant?.nama_pemilik}
              />
            </View>
          )}
        />
      </ContentLoader>
    </View>
  );
};

export default CategoryDetailPage;
