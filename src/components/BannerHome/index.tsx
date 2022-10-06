import {TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import View from '../View';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';

type Props = {
  data: any;
  showPagination?: boolean;
};

const BannerHome: FC<Props> = ({data, showPagination = true}) => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        autoplayTimeout={2}
        showsPagination={showPagination}
        activeDotColor={Color.PRIMARY}
        paginationStyle={styles.pagination}>
        {data?.map((item: any, indexData: number) => (
          <TouchableOpacity
            style={tailwind('px-4')}
            key={indexData}
            activeOpacity={1}>
            <FastImage
              source={{
                uri: `https://transaksi.sologreatsale.com${item?.image_path}`,
                priority: FastImage.priority.high,
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

BannerHome.defaultProps = {
  data: [],
};

export default React.memo(BannerHome);
