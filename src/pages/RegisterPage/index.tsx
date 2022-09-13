import Dropdown from 'components/Dropdown';
import TextInput from 'components/TextInput';
import View from 'components/View';
import useGetDistrict from 'queries/address/useGetDistrict';
import useGetProvinces from 'queries/address/useGetProvince';
import useGetRegency from 'queries/address/useGetRegency';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {deviceWidth, showToast, useForm} from 'utils';

import Button from 'components/Button';
import useGetVillage from 'queries/address/useGetVillage';
import ContentLoader from 'react-native-easy-content-loader';
import useRegister from 'queries/auth/useRegister';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RegisterPage'>;
};

const RegisterPage: React.FC<Props> = ({navigation}) => {
  const [form, setForm] = useForm({
    nama_depan: null,
    nama_belakang: null,
    email: null,
    nomor_hp: null,
    password: null,
    id_province: null,
    id_regencies: null,
    id_district: null,
    id_village: null,
    alamat: null,
  });
  const [errorForm, setErrorForm] = useForm({
    nama_depan: null,
    nama_belakang: null,
    email: null,
    nomor_hp: null,
    password: null,
    id_province: null,
    id_regencies: null,
    id_district: null,
    id_village: null,
    alamat: null,
  });
  const [addressForm, setAddressForm] = useForm({
    province: null,
    regencies: null,
    district: null,
    village: null,
  });
  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const {mutate: mutateRegister} = useRegister();

  const {data: provinceData} = useGetProvinces();
  const {
    refetch: refetchRegency,
    isFetching: fetchingRegency,
    data: regenciesData,
  } = useGetRegency({
    id: form?.id_province,
  });
  const {
    refetch: refetchDistrict,
    isFetching: fetchingDistrict,
    data: districtData,
  } = useGetDistrict({
    id: form?.id_regencies,
  });
  const {
    refetch: refetchVillage,
    isFetching: fetchingVillage,
    data: villageData,
  } = useGetVillage({
    id: form?.id_district,
  });

  useEffect(() => {
    if (form?.id_province) {
      refetchRegency();
    }
  }, [form?.id_province]);

  useEffect(() => {
    if (form?.id_regencies) {
      refetchDistrict();
    }
  }, [form?.id_regencies]);

  useEffect(() => {
    if (form?.id_district) {
      refetchVillage();
    }
  }, [form?.id_district]);

  const handleValidate = () => {
    let isValidate = true;

    if (!form.nama_depan) {
      setErrorForm({nama_depan: 'Nama depan wajib diisi!'});
      isValidate = false;
    }
    if (!form.nama_belakang) {
      setErrorForm({nama_belakang: 'Nama belakang wajib diisi!'});
      isValidate = false;
    }
    if (!form.email) {
      setErrorForm({email: 'Email wajib diisi!'});
      isValidate = false;
    }
    if (!form.nomor_hp) {
      setErrorForm({nomor_hp: 'Nomor hp wajib diisi!'});
      isValidate = false;
    }
    if (!form.password) {
      setErrorForm({password: 'Password wajib diisi!'});
      isValidate = false;
    }
    if (!form.alamat) {
      setErrorForm({alamat: 'Alamat wajib diisi!'});
      isValidate = false;
    }
    if (!form.id_province) {
      setErrorForm({id_province: 'Provinsi wajib diisi!'});
      isValidate = false;
    }
    if (!form.id_regencies) {
      setErrorForm({id_regencies: 'Kabupaten wajib diisi!'});
      isValidate = false;
    }
    if (!form.id_district) {
      setErrorForm({id_district: 'Kecamatan wajib diisi!'});
      isValidate = false;
    }
    if (!form.id_village) {
      setErrorForm({id_village: 'Kelurahan wajib diisi!'});
      isValidate = false;
    }

    return isValidate;
  };

  const handleSubmit = () => {
    if (handleValidate()) {
      setLoading(true);
      mutateRegister(
        {
          data: form,
        },
        {
          onSuccess: () => {
            navigation.goBack();
            showToast('Daftar berhasil! Silahkan masuk');
          },
          onError: error => {
            console.log('register', error);
          },
          onSettled: () => {
            setLoading(false);
          },
        },
      );
    }
  };

  return (
    <View color={Color.WHITE} style={tailwind('flex-1')}>
      <ScrollView contentContainerStyle={tailwind('p-6')}>
        <TextInput
          onFocusInput={() => setErrorForm({nama_depan: null})}
          label="Nama depan"
          placeholder="Masukkan nama depan"
          errorMessage={errorForm?.nama_depan}
          error={errorForm?.nama_depan}
          value={form?.nama_depan}
          onChangeText={val => setForm({nama_depan: val})}
        />
        <View marginBottom={16} />
        <TextInput
          onFocusInput={() => setErrorForm({nama_belakang: null})}
          label="Nama belakang"
          placeholder="Masukkan nama belakang"
          errorMessage={errorForm?.nama_belakang}
          error={errorForm?.nama_belakang}
          value={form?.nama_belakang}
          onChangeText={val => setForm({nama_belakang: val})}
        />
        <View marginBottom={16} />
        <TextInput
          onFocusInput={() => setErrorForm({email: null})}
          label="Email"
          keyboardType="email-address"
          placeholder="Masukkan email"
          errorMessage={errorForm?.email}
          error={errorForm?.email}
          value={form?.email}
          onChangeText={val => setForm({email: val})}
        />
        <View marginBottom={16} />
        <TextInput
          onFocusInput={() => setErrorForm({nomor_hp: null})}
          label="Nomor hp"
          keyboardType="number-pad"
          placeholder="Masukkan nomor hp"
          errorMessage={errorForm?.nomor_hp}
          error={errorForm?.nomor_hp}
          value={form?.nomor_hp}
          onChangeText={val => setForm({nomor_hp: val})}
        />
        <View marginBottom={16} />
        <TextInput
          onFocusInput={() => setErrorForm({password: null})}
          label="Password"
          secureTextEntry={securePassword}
          rightIcon={
            <TouchableOpacity
              onPress={() => setSecurePassword(!securePassword)}>
              <Entypo
                name={securePassword ? 'eye' : 'eye-with-line'}
                size={16}
              />
            </TouchableOpacity>
          }
          placeholder="Masukkan password"
          errorMessage={errorForm?.password}
          error={errorForm?.password}
          value={form?.password}
          onChangeText={val => setForm({password: val})}
        />
        <View marginBottom={16} />
        <TextInput
          onFocusInput={() => setErrorForm({alamat: null})}
          label="Alamat"
          placeholder="Masukkan alamat"
          errorMessage={errorForm?.alamat}
          error={errorForm?.alamat}
          value={form?.alamat}
          onChangeText={val => setForm({alamat: val})}
        />
        <View marginBottom={16} />
        <Dropdown
          onFocus={() => setErrorForm({id_province: null})}
          error={errorForm?.id_province}
          errorMessage={errorForm?.id_province}
          labelSize={12}
          outline
          outlineLabel="Provinsi"
          item={{
            label: addressForm?.province ?? 'Pilih Provinsi',
            id: '1',
            sub: provinceData ?? [],
          }}
          onPress={val => {
            setAddressForm({
              province: val?.label,
            });
            setForm({id_province: val?.id});
          }}
        />
        <View marginBottom={16} />
        <ContentLoader
          containerStyles={tailwind('mt-2')}
          paragraph={false}
          loading={fetchingRegency}
          tHeight={32}
          tWidth={deviceWidth - 70}>
          <Dropdown
            onFocus={() => setErrorForm({id_regencies: null})}
            error={errorForm?.id_regencies}
            errorMessage={errorForm?.id_regencies}
            labelSize={12}
            outline
            outlineLabel="Kabupaten"
            item={{
              label: addressForm?.regencies ?? 'Pilih Kabupaten',
              id: '1',
              sub: regenciesData ?? [{}],
            }}
            onPress={val => {
              if (val?.label) {
                setAddressForm({
                  regencies: val?.label,
                });
                setForm({id_regencies: val?.id});
              }
            }}
          />
        </ContentLoader>
        <View marginBottom={16} />
        <ContentLoader
          containerStyles={tailwind('mt-2')}
          paragraph={false}
          loading={fetchingDistrict}
          tHeight={32}
          tWidth={deviceWidth - 70}>
          <Dropdown
            onFocus={() => setErrorForm({id_district: null})}
            error={errorForm?.id_district}
            errorMessage={errorForm?.id_district}
            labelSize={12}
            outline
            outlineLabel="Kecamatan"
            item={{
              label: addressForm?.district ?? 'Pilih Kecamatan',
              id: '1',
              sub: districtData ?? [{}],
            }}
            onPress={val => {
              if (val?.label) {
                setAddressForm({
                  district: val?.label,
                });
                setForm({id_district: val?.id});
              }
            }}
          />
        </ContentLoader>
        <View marginBottom={16} />
        <ContentLoader
          containerStyles={tailwind('mt-2')}
          paragraph={false}
          loading={fetchingVillage}
          tHeight={32}
          tWidth={deviceWidth - 70}>
          <Dropdown
            onFocus={() => setErrorForm({id_village: null})}
            error={errorForm?.id_village}
            errorMessage={errorForm?.id_village}
            labelSize={12}
            outline
            outlineLabel="Kelurahan"
            item={{
              label: addressForm?.village ?? 'Pilih Kelurahan',
              id: '1',
              sub: villageData ?? [{}],
            }}
            onPress={val => {
              if (val?.label) {
                setAddressForm({
                  village: val?.label,
                });
                setForm({id_village: val?.id});
              }
            }}
          />
        </ContentLoader>
        <View marginY={40}>
          <Button loading={loading} label="Daftar" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterPage;
