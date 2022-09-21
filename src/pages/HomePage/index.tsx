import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BannerHome from 'components/BannerHome';
import CardItem from 'components/CardItem';
import Text from 'components/Text';
import View from 'components/View';
import useGetNews from 'queries/home/useGetNews';
import useGetProductRecommendation from 'queries/home/useGetProductRecommendation';
import useGetSlider from 'queries/home/useGetSlider';
import useGetSponsor from 'queries/home/useGetSponsor';
import useGetTenantRecommendation from 'queries/home/useGetTenantRecommendation';
import React, {FC} from 'react';
import {FlatList, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {currencyConverter} from 'utils';
import styles from './styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomePage'>;
};

const HomePage: FC<Props> = ({navigation}) => {
  const {data: sliderData} = useGetSlider();
  const {data: tenantRecData} = useGetTenantRecommendation();
  const {data: productRecData} = useGetProductRecommendation();
  const {data: newsData} = useGetNews();
  const {data: sponsorData} = useGetSponsor();

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView contentContainerStyle={tailwind('pb-12')}>
        <View color={Color.WHITE}>
          <BannerHome data={sliderData} />
        </View>
        <View marginBottom={40} />
        <View>
          <Text style={tailwind('px-4')} family="latoBold" size={14}>
            Tenant Unggulan
          </Text>
          <FlatList
            horizontal
            ItemSeparatorComponent={() => <View marginX={8} />}
            contentContainerStyle={tailwind('px-4 pt-4')}
            data={tenantRecData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <CardItem
                onPress={() =>
                  navigation.navigate('TenantDetailPage', {
                    id: item?.id,
                    title: item?.nama_toko,
                  })
                }
                image={`https://transaksi.sologreatsale.com${item?.path_logo}`}
                title={item?.nama_toko}
              />
            )}
          />
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={tailwind('px-4')} family="latoBold" size={14}>
            Produk Unggulan
          </Text>
          <FlatList
            horizontal
            ItemSeparatorComponent={() => <View marginX={8} />}
            contentContainerStyle={tailwind('px-4 pt-4')}
            data={productRecData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <CardItem
                onPress={() =>
                  navigation?.navigate('ProductDetailPage', {
                    id: item?.id,
                    title: item?.nama_produk,
                  })
                }
                image={`https://transaksi.sologreatsale.com${item?.image_path_file}`}
                title={item?.nama_produk}
                subtitle={currencyConverter(item?.harga)}
              />
            )}
          />
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={tailwind('px-4')} family="latoBold" size={14}>
            Berita & Informasi Terkini
          </Text>
          <FlatList
            horizontal
            ItemSeparatorComponent={() => <View marginX={8} />}
            contentContainerStyle={tailwind('px-4 pt-4')}
            data={newsData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <CardItem
                image={item?.image?.image}
                title={item?.name}
                onPress={() =>
                  navigation.navigate('WebviewPage', {
                    link: `https://sologreatsale.com/activities/${item?.slug}`,
                    title: item?.name,
                  })
                }
              />
            )}
          />
        </View>
        <View style={styles.divider} />
        <View paddingBottom={8}>
          <Text style={tailwind('px-4')} family="latoBold" size={14}>
            Partner Kami
          </Text>
          <FlatList
            horizontal
            ItemSeparatorComponent={() => <View marginX={8} />}
            contentContainerStyle={tailwind('px-4 pt-4')}
            data={sponsorData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <View paddingY={8} paddingX={12} color={Color.ALMOST_WHITE}>
                <FastImage
                  source={{uri: item?.image, priority: FastImage.priority.high}}
                  style={styles.imageSponsor}
                  resizeMode="contain"
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;
