import React from 'react';
import {Box, Flex, Text} from 'react-native-design-system';
import Icon from 'react-native-vector-icons/Feather';
import {useStepsList} from '../../context/StepsListContext';
import {View} from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Step2() {
  const {setStepsListData, stepsListData} = useStepsList();

  return (
    <>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text size="xs" style={{color: '#FFF'}}>
          Defina os prazos para cada meta
        </Text>
        <Icon name="info" size={15} color="#FFF" />
      </Box>
      <View style={{flex: 1, marginTop: 30}}>
        {stepsListData.list?.map((e, index) => (
          <Flex
            key={index}
            style={{maxHeight: 50, marginBottom: 40}}
            flexDirection="row"
            justifyContent="center"
            alignItems="center">
            <Text style={{fontSize: 50, lineHeight: 60, marginRight: 20}}>
              {index + 1}
            </Text>
            <Flex flexDirection="column" justifyContent="center">
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Text size="lg" style={{color: '#A8B3CF'}}>
                  {e.title}
                </Text>
                <IconMaterialIcons
                  name="date-range"
                  size={20}
                  color="#A8B3CF"
                />
              </Flex>
              <Text size="sm" style={{color: '#A8B3CF'}}>
                exemplo
              </Text>
            </Flex>
          </Flex>
        ))}
      </View>
    </>
  );
}

export {Step2};
