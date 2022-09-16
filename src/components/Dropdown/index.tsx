import Text from 'components/Text';
import View from 'components/View';
import React, {FC, memo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Color from 'styles/Color';
import tailwind from 'tailwind-rn';
import {layoutAnimation} from 'utils';
import styles from './styles';

type Props = {
  item: {
    label: string;
    sub: any[];
    icon?: string;
    id: string;
  };
  onPress: (item: any) => void;
  outline?: boolean;
  outlineLabel?: string;
  labelSize?: number;
  error?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
};

const Dropdown: FC<Props> = ({
  item,
  onPress,
  outline,
  outlineLabel,
  labelSize,
  error,
  errorMessage,
  onFocus,
}) => {
  const [isExpanded, setExpand] = useState(false);

  return (
    <View>
      {outlineLabel && (
        <Text
          size={12}
          family="latoRegular"
          color={Color.GREY_TEXT}
          style={tailwind('mb-1 ml-1')}>
          {outlineLabel}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          if (item?.sub?.length > 0) {
            setExpand(!isExpanded);
            // layoutAnimation();
          } else {
            onPress && onPress(item);
          }
          onFocus && onFocus();
        }}
        style={[
          tailwind('flex flex-row items-center justify-between px-4 py-2'),
          outline ? styles.outline : {},
          error ? {borderColor: Color.RED} : {},
        ]}>
        <View style={tailwind('flex-1 mr-4')}>
          <Text
            size={labelSize}
            family={item?.sub?.length > 0 ? 'latoRegular' : 'latoBold'}>
            {item?.label}
          </Text>
        </View>
        {item?.sub?.length > 0 ? (
          <View>
            <Feather
              name={isExpanded ? 'chevron-down' : 'chevron-right'}
              size={24}
              color={Color.PRIMARY}
            />
          </View>
        ) : (
          <View />
        )}
      </TouchableOpacity>
      {error && (
        <View marginLeft={5} marginTop={5}>
          <Text color={Color.RED} size={10}>
            {errorMessage}
          </Text>
        </View>
      )}
      {isExpanded &&
        item?.sub?.map((subItem, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onPress && onPress(subItem);
              setExpand(false);
              // layoutAnimation();
            }}
            style={tailwind('px-8 py-2')}>
            <Text color={'#737480'}>{subItem?.label}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

Dropdown.defaultProps = {
  labelSize: 14,
};

export default memo(Dropdown);
