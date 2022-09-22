import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import View from 'components/View';
import useForgotPassword from 'queries/auth/useForgotPassword';
import React, {useState} from 'react';
import tailwind from 'tailwind-rn';
import {showToast} from 'utils';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ForgotPasswordPage'
  >;
};

const ForgotPasswordPage: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const {mutate: forgotPasswordMutate} = useForgotPassword();

  const validate = () => {
    let isValidate = true;

    if (!email) {
      setErrorEmail('Email wajib diisi');
      isValidate = false;
    }

    return isValidate;
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
      forgotPasswordMutate(
        {
          data: {
            email,
          },
        },
        {
          onSuccess: res => {
            showToast(res?.data);
            navigation.goBack();
          },
          onError: err => {
            console.log('ee', err);
          },
          onSettled: () => {
            setLoading(false);
          },
        },
      );
    }
  };

  return (
    <View paddingTop={40} paddingX={20} style={tailwind('flex-1 bg-white')}>
      <TextInput
        error={!!errorEmail}
        errorMessage={errorEmail}
        keyboardType="email-address"
        onChangeText={val => {
          setEmail(val);
          if (errorEmail) {
            setErrorEmail('');
          }
        }}
        value={email}
        placeholder="Masukkan email"
        label="Email"
        autoFocus
      />
      <View marginY={12} />
      <Button loading={loading} onPress={handleSubmit} label="Kirim" />
    </View>
  );
};

export default ForgotPasswordPage;
