import React, {useState} from 'react';
import {
  ListItem,
  Input,
  Stack,
  Box,
  Text,
  Flex,
  Button,
} from 'react-native-design-system';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {v4 as uuidv4} from 'uuid';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {View} from 'react-native';
import {useStepsList} from '../../context/StepsListContext';

function Step1() {
  const {setStepsListData, stepsListData} = useStepsList();
  const [text, setText] = useState('');
  const handleTextInput = input => {
    setText(input);
  };

  const handleAddGoal = () => {
    const title = text.trim();
    if (!title) {
      return;
    }
    const key = uuidv4();

    setStepsListData(prevState => ({
      ...prevState,
      list: [
        ...prevState.list,
        {
          key,
          title,
        },
      ],
    }));
    setText('');
  };

  const handleDeletetitle = key => {
    setStepsListData(prevState => ({
      ...prevState,
      list: prevState.list.filter(item => item.key !== key),
    }));
  };

  const renderItem = ({item, drag, isActive, index}) => {
    return (
      <ScaleDecorator>
        <ListItem
          style={{backgroundColor: 'transparent'}}
          size="lg"
          onLongPress={drag}
          disabled={isActive}
          onPress={drag}
          leftIcon={
            <IconEntypo name="dots-three-vertical" size={15} color="#A8B3CF" />
          }
          rightIcon={
            <Icon
              onPress={() => handleDeletetitle(item.key)}
              name="trash-2"
              size={20}
              color="#A8B3CF"
            />
          }
          textStyle={{
            color: '#A8B3CF',
          }}>
          {`${
            stepsListData.list.findIndex(
              dataItem => dataItem.key === item.key,
            ) + 1
          }. ${item.title}`}
        </ListItem>
      </ScaleDecorator>
    );
  };

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
          Escreva suas metas e organize de acordo com a prioridade
        </Text>
        <Icon name="info" size={15} color="#FFF" />
      </Box>
      <Flex flexDirection="column" justifyContent="space-between">
        {stepsListData.list && stepsListData.list?.length === 0 && (
          <Box space="6xl">
            <Text>Lista Vazia</Text>
          </Box>
        )}
        <View style={{flex: 1}}>
          <DraggableFlatList
            data={stepsListData.list ?? []}
            onDragEnd={({data}) =>
              setStepsListData(prevState => ({
                ...prevState,
                list: data,
              }))
            }
            keyExtractor={item => item.key}
            renderItem={renderItem}
          />
        </View>

        <Stack horizontalSpace="lg">
          <Box space="6xl">
            <Text size="lg">{`${stepsListData.list?.length} de 25`}</Text>
          </Box>
          <Input
            style={{backgroundColor: '#1C1F26'}}
            value={text}
            outline
            placeholder={'Digite sua meta'}
            onChangeText={handleTextInput}
            onSubmitEditing={handleAddGoal}
          />
          {stepsListData.list?.length > 0 && (
            <Button
              textColor={'#1C1F26'}
              style={{
                backgroundColor: '#CB3FF4',
                borderColor: '#CB3FF4',
              }}
              onPress={() => setStepsListData({...stepsListData, step: 2})}>
              Próximo
            </Button>
          )}
        </Stack>
      </Flex>
    </>
  );
}

export {Step1};
