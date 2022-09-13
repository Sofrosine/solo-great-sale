import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CardItem from 'components/CardItem';
import HeaderView from 'components/HeaderView';
import View from 'components/View';
import useFilterCategory from 'queries/categories/useFilterCategory';
import React, {FC, useLayoutEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {currencyConverter} from 'utils';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'CategoryDetailPage'
  >;
  route: RouteProp<RootStackParamList, 'CategoryDetailPage'>;
};

const CategoryDetailPage: FC<Props> = ({route, navigation}) => {
  const {id, title} = route?.params || {};

  const {data: filterCategoryData, isFetching: isCategoryFetching} =
    useFilterCategory({id});

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

  console.log('aha', filterCategoryData);

  return (
    <View>
      <ContentLoader
        active
        loading={isCategoryFetching}
        containerStyles={tailwind('p-8')}
        tHeight={40}>
        <FlatList
          numColumns={2}
          data={filterCategoryData}
          contentContainerStyle={tailwind('py-8')}
          columnWrapperStyle={tailwind('justify-center')}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View marginY={8} />}
          renderItem={({item}) => (
            <View marginX={8}>
              <CardItem
                onPress={() =>
                  navigation.navigate('ProductDetailPage', {
                    id: item?.id,
                    title: item?.nama_produk,
                  })
                }
                image={item?.image}
                title={item?.nama_produk}
                subtitle={currencyConverter(item?.harga)}
              />
            </View>
          )}
        />
      </ContentLoader>
    </View>
  );
};

export default CategoryDetailPage;
