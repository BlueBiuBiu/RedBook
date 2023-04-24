import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import icon_heart from '../assets/images/icon_heart.png';
import icon_heart_empty from '../assets/images/icon_heart_empty.png';

interface IProps {
  style?: Object;
  isFavorite: boolean;
  size?: number;
}

const HeartIcon = (props: IProps) => {
  const {isFavorite, style, size = 20} = props;
  const [showState, setShowState] = useState(false);

  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setShowState(isFavorite);
  }, [isFavorite]);

  const heartClick = () => {
    const newState = !showState
    setShowState(newState);

    if (newState) {
      const scaleFn = Animated.timing(scaleValue, {
        toValue: 1.8,
        duration: 300,
        useNativeDriver: false,
      });
      const opacityFn = Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      });
      Animated.sequence([scaleFn, opacityFn]).start();
    } else {
      scaleValue.setValue(0)
      opacityValue.setValue(1)
    }
  };

  return (
    <TouchableOpacity onPress={heartClick}>
      <Image
        style={[style,{ width: size, height: size }]}
        source={showState ? icon_heart : icon_heart_empty}
      />
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            borderColor: '#ff2742',
            borderWidth: size / 20,
            borderRadius: size / 2,
            position: 'absolute',
          },
          {transform: [{scale: scaleValue}]},
          {opacity: opacityValue},
        ]}
      />
    </TouchableOpacity>
  );
};

export default HeartIcon;

const styles = StyleSheet.create({
});
