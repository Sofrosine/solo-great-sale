import Text from 'components/Text';
import View from 'components/View';
import React, {FC, memo} from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

type Props = {
  image: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

const CardItem: FC<Props> = ({image, title, subtitle, onPress}) => {
  // const [originalImage, setImage] = useState(image);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}
      activeOpacity={1}
      style={styles.container}>
      <FastImage
        source={{
          uri: image,
          priority: FastImage.priority.high,
        }}
        style={styles.image}
      />
      <View marginBottom={8} />
      <Text numberOfLines={2} family="latoBold">
        {title}
      </Text>
      <View marginBottom={4} />
      {subtitle ? <Text size={11}>{subtitle}</Text> : <View />}
    </TouchableOpacity>
  );
};

export default memo(CardItem);
