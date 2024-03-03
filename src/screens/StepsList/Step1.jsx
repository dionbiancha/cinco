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

function TodoList() {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const handleTextInput = input => {
    setText(input);
  };

  const handleAddTodo = () => {
    const todo = text.trim();
    if (!todo) {
      return;
    }
    const key = uuidv4();
    setData(prevData => {
      const newItem = {
        key,
        todo,
        isCompleted: false,
      };
      return [newItem, ...prevData];
    });
    setText('');
  };

  const handleDeleteTodo = key => {
    setData(prevData => prevData.filter(item => item.key !== key));
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
              onPress={() => handleDeleteTodo(item.key)}
              name="trash-2"
              size={20}
              color="#A8B3CF"
            />
          }
          textStyle={{
            color: '#A8B3CF',
          }}>
          {`${data.findIndex(dataItem => dataItem.key === item.key) + 1}. ${
            item.todo
          }`}
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
          fontSize: '5px',
          color: '#FFF',
        }}>
        <Text size="xs" style={{color: '#FFF'}}>
          Escreva suas metas e organize de acordo com a prioridade
        </Text>
        <Icon name="info" size={15} color="#FFF" />
      </Box>
      <Flex flexDirection="column" justifyContent="space-between">
        {data && data.length === 0 && (
          <Box space="6xl">
            <Text>Lista Vazia</Text>
          </Box>
        )}
        <DraggableFlatList
          data={data}
          onDragEnd={({data}) => setData(data)}
          keyExtractor={item => item.key}
          renderItem={renderItem}
        />

        <Stack horizontalSpace="lg">
          <Box space="6xl">
            <Text size="lg">{`${data.length} de 25`}</Text>
          </Box>
          <Input
            style={{backgroundColor: '#1C1F26'}}
            value={text}
            outline
            placeholder={'Digite sua meta'}
            onChangeText={handleTextInput}
            onSubmitEditing={handleAddTodo}
          />
          <Button
            textColor={'#1C1F26'}
            style={{
              backgroundColor: '#CB3FF4',
              borderColor: '#CB3FF4',
            }}
            disabled={data.length > 25}
            onPress={() => {}}>
            Próximo
          </Button>
        </Stack>
      </Flex>
    </>
  );
}

export {TodoList};