import CardTransaction from 'components/CardTransaction';
import View from 'components/View';
import usePostTransaction from 'queries/transaction/usePostTransaction';
import React, {useContext, useEffect} from 'react';
import {FlatList} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import {Store} from 'reducers';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';

const TransactionPage = () => {
  const {user} = useContext(Store);
  const [userData] = user;

  const {
    mutate: transactionMutate,
    data: transactionData,
    isLoading,
  } = usePostTransaction();

  useEffect(() => {
    transactionMutate({
      data: {
        _token: userData?.token,
      },
    });
  }, []);

  return (
    <View style={tailwind('flex-1')} color={Color.WHITE}>
      <ContentLoader loading={isLoading}>
        <FlatList
          contentContainerStyle={tailwind('py-4 px-6')}
          data={transactionData?.reverse()}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <CardTransaction item={item} />}
          ItemSeparatorComponent={() => <View marginBottom={20} />}
        />
      </ContentLoader>
    </View>
  );
};

export default TransactionPage;
