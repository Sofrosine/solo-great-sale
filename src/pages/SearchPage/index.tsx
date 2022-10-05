import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from 'components/Button';
import CardItem from 'components/CardItem';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import View from 'components/View';
import usePostSearchTenant from 'queries/tenant/usePostSearchTenant';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import tailwind from 'tailwind-rn';
import styles from './styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SearchPage'>;
};

const SearchPage: React.FC<Props> = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const {
    mutate: postSearchTenantMutate,
    isLoading: postSearchTenantLoading,
    data: postSearchTenantData,
  } = usePostSearchTenant();

  console.log(postSearchTenantData?.data);

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <View padding={20} paddingTop={0}>
        <Button
          onPress={() => navigation.navigate('ScanTenantPage')}
          label="Scan QR"
        />
        <View marginTop={16} style={tailwind('flex-row')}>
          <View style={tailwind('flex-1')}>
            <TextInput
              value={keyword}
              onChangeText={val => setKeyword(val)}
              placeholder="Masukkan keyword"
            />
          </View>
          <View marginLeft={16} style={{flex: 0.3}}>
            <Button
              onPress={() => postSearchTenantMutate({data: {keyword}})}
              label="Cari"
            />
          </View>
        </View>
      </View>
      <ContentLoader loading={postSearchTenantLoading}>
        <FlatList
          data={postSearchTenantData?.data || []}
          numColumns={2}
          contentContainerStyle={tailwind('py-8')}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View marginY={8} />}
          renderItem={({item}) => (
            <View style={styles.cardContainer} marginX={8}>
              <CardItem
                onPress={() =>
                  navigation.navigate('TenantDetailPage', {
                    id: item?.id,
                    title: item?.nama_toko,
                  })
                }
                image={'http://transaksi.sologreatsale.com' + item?.path_logo}
                title={item?.nama_toko}
              />
            </View>
          )}
        />
      </ContentLoader>
    </View>
  );
};

export default SearchPage;
