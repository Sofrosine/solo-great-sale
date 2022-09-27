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
import {FlatList, Linking, ScrollView, TouchableOpacity} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import FastImage from 'react-native-fast-image';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import IntegraLogo from 'assets/images/media-integra-logo.png';
import DeLogo from 'assets/images/de-logo.png';
import EdusiftLogo from 'assets/images/edusift-logo.png';
import STALogo from 'assets/images/sta-logo.png';

import {currencyConverter} from 'utils';
import styles from './styles';
import {TOP_ADS_DATA} from 'constants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomePage'>;
};

const HomePage: FC<Props> = ({navigation}) => {
  const {data: sliderData} = useGetSlider();
  const {data: tenantRecData, isFetching: tenantRecFetching} =
    useGetTenantRecommendation();
  const {data: productRecData, isFetching: productRecFetching} =
    useGetProductRecommendation();
  const {data: newsData, isFetching: newsFetching} = useGetNews();
  const {data: sponsorData} = useGetSponsor();

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView contentContainerStyle={tailwind('pb-12 pt-4')}>
        <View color={Color.WHITE}>
          <BannerHome data={sliderData} />
        </View>
        <View marginBottom={40} />
        <View
          style={tailwind('flex-row items-center justify-between')}
          marginBottom={24}
          paddingX={20}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('WebviewPage', {
                link: 'https://sologreatsale.com/events',
                title: 'Event',
              })
            }
            style={styles.btnEvent}>
            <Text size={14} color={Color.PRIMARY}>
              Event SGS
            </Text>
          </TouchableOpacity>
          <View marginX={8} />
          <TouchableOpacity
            onPress={() => Linking.openURL('https://virtualsgs.com/login')}
            style={styles.btnEvent}>
            <Text size={14} color={Color.PRIMARY}>
              Virtual SGS
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={tailwind('flex-row items-center justify-center')}
          paddingY={8}>
          {TOP_ADS_DATA.map(item => (
            <FastImage
              resizeMode="contain"
              source={item?.source}
              style={[styles.developerImage, tailwind('mx-2')]}
            />
          ))}
        </View>
        <View>
          <Text style={tailwind('px-4')} family="latoBold" size={14}>
            Tenant Unggulan
          </Text>
          <ContentLoader
            loading={tenantRecFetching}
            containerStyles={tailwind('mt-4')}>
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
          </ContentLoader>
        </View>
        <View style={styles.divider} />
        <View paddingTop={8}>
          <Text style={tailwind('px-4')} family="latoBold" size={14}>
            Produk Unggulan
          </Text>
          <ContentLoader
            loading={productRecFetching}
            containerStyles={tailwind('mt-4')}>
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
          </ContentLoader>
        </View>
        <View style={styles.divider} />
        <View paddingTop={8}>
          <Text style={tailwind('px-4')} family="latoBold" size={14}>
            Berita & Informasi Terkini
          </Text>
          <ContentLoader
            loading={newsFetching}
            containerStyles={tailwind('mt-4')}>
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
          </ContentLoader>
        </View>
        <View style={styles.divider} />
        <View paddingY={8}>
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
        <View style={styles.divider} />
        <View paddingY={8}>
          <Text style={tailwind('px-4')} family="latoBold" size={14}>
            SGS Go 2.0 Developed by:
          </Text>
          <View
            style={tailwind('flex-row items-center justify-center')}
            paddingY={8}>
            <FastImage
              resizeMode="contain"
              source={IntegraLogo}
              style={styles.developerImage}
            />
            <FastImage
              resizeMode="contain"
              source={DeLogo}
              style={styles.developerImage}
            />
            <FastImage
              resizeMode="contain"
              source={EdusiftLogo}
              style={styles.developerImage}
            />
            <FastImage
              resizeMode="contain"
              source={STALogo}
              style={styles.developerImage}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;
