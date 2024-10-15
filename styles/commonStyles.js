import { StyleSheet } from 'react-native';
import { textColor } from '../constants/colors';

const fontFamily = {
  bold: 'SF-Pro-Display-Bold',
  regular: 'SF-Pro-Display-Regular',
};

export default StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    color: textColor.black,
    fontFamily: fontFamily.bold,
  },
  subHeading: {
    fontSize: 16,
    color: textColor.grey,
    fontFamily: fontFamily.regular,
  },
  title: {
    fontSize: 26,
    color: textColor.white,
    fontFamily: fontFamily.bold,
  },
  number: {
    fontSize: 12,
    color: textColor.number,
    fontFamily: fontFamily.bold,
  },
});
