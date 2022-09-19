import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Dropdown from 'components/Dropdown';
import View from 'components/View';
import useGetCategories from 'queries/categories/useGetCategories';
import React, {FC} from 'react';
import {FlatList} from 'react-native';
import tailwind from 'tailwind-rn';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CategoryPage'>;
};

const CategoryPage: FC<Props> = ({navigation}) => {
  const {data: categoriesData} = useGetCategories();

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <FlatList
        data={categoriesData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Dropdown
            onPress={categoryItem =>
              navigation.navigate('CategoryDetailPage', {
                title: item?.label,
                id: item?.id,
              })
            }
            item={item}
          />
        )}
        ItemSeparatorComponent={() => <View marginY={0} />}
        contentContainerStyle={tailwind('py-4')}
      />
    </View>
  );
};

export default CategoryPage;
