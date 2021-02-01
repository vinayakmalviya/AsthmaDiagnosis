import React, { useCallback } from 'react';
import { View, Text, TouchableNativeFeedback, FlatList } from 'react-native';

import CustomBottomSheet from './CustomBottomSheet';

const styles = {
  DropItem: {
    width: '100%',
    height: 48,
    margin: 0,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  DropText: {
    justifyContent: 'center',
    fontSize: 16,
    color: '#555555',
  }
}

const CustomBottomSheetPicker = ({
  items = [],
  onSelect = val => {},
  ...props
}) => {

  return (
    <CustomBottomSheet
      {...props}
      onVisibilityChange={()=>onSelect('')}
      content={
        <FlatList
          data={items}
          keyExtractor={item => item.value}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              onPress={() => onSelect(item.value)}
              background={TouchableNativeFeedback.Ripple(
                'rgba( 10, 123, 97, 0.15)'
              )}>
              <View style={[styles.DropItem]}>
                <Text style={[styles.DropText]}>{item.label}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
        />
      }
    />
  );
};


export default CustomBottomSheetPicker;