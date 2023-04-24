import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ResizeImage = (props: {url: string; width: number}) => {
  const {width, url} = props;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    Image.getSize(url, (width: number, height: number) => {
      const showHeight = (((SCREEN_WIDTH - 18) / 2) * height) / width;
      setHeight(showHeight);
    });
  }, [url]);
  return (
    <Image
      style={{
        width,
        height: height,
        resizeMode: 'cover',
        borderRadius: 5
      }}
      source={{uri: url}}
    />
  );
};

export default ResizeImage;

const styles = StyleSheet.create({});
