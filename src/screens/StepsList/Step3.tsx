import React, {useState} from 'react';
import {Box, Button, Flex, Input, Text} from 'react-native-design-system';
import {useStepsList} from '../../context/StepsListContext';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {maskDate} from '../../utils/masks';
import Icon from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {TextInput} from 'react-native-paper';

export function hasRepeat(repeat: string[] | undefined) {
  return repeat && repeat?.length > 0;
}

function Step3() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {setStepsListData, stepsListData} = useStepsList();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [repeate, setRepeat] = useState<string[]>([]);
  const [selectItem, setSelectItem] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');

  const handleTextInput = (input: string) => {
    setText(input);
  };

  const addGoal = () => {
    if (!date) {
      return;
    }
    setStepsListData(prevState => ({
      ...prevState,
      list: prevState.list.map((item, itemIndex) =>
        itemIndex === selectItem
          ? {
              ...item,
              goals: [
                ...(item.goals ?? []),
                {
                  title: text,
                  date: date,
                  repeat: repeate,
                },
              ],
            }
          : item,
      ),
    }));
    setDate(undefined);
    setRepeat([]);
    setText('');
  };

  function hasGoals() {
    console.log(stepsListData.list);
    return stepsListData.list
      .slice(0, 5)
      .some(item => item.goals && item?.goals.length > 0);
  }

  function isEnabled(value: string) {
    if (repeate.includes(value)) {
      return true;
    }

    return false;
  }

  const handleDeleteGoal = (itemIndex: number, goalKey: string | number) => {
    setStepsListData(prevState => ({
      ...prevState,
      list: prevState.list.map((item, index) =>
        index === itemIndex
          ? {
              ...item,
              goals: item?.goals?.filter((__, goal) => goal !== goalKey),
            }
          : item,
      ),
    }));
  };

  const days = [
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sabado',
    'domingo',
  ];

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
          Defina os objetivos que deve cumprir para atingir cada meta
        </Text>
      </Box>
      <ScrollView style={{flex: 1, marginTop: 30}}>
        {stepsListData.list?.map(
          (e, index) =>
            index <= 4 && (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  setModalVisible(true);
                  setSelectItem(index);
                }}>
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  style={{paddingBottom: 30}}>
                  <Flex
                    style={{marginBottom: 40}}
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="flex-start">
                    <Text
                      style={{fontSize: 50, lineHeight: 60, marginRight: 20}}>
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
                      </Flex>
                      <Text size="sm" style={{color: '#A8B3CF'}}>
                        {maskDate(e.date) ?? 'Selecione uma data'}
                      </Text>
                      {e.goals?.map((goal, key) => (
                        <Flex
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                          key={key}
                          style={{marginBottom: 30}}>
                          <Flex style={{marginTop: 20}} flexDirection="column">
                            <Text style={{color: '#A8B3CF'}}>{goal.title}</Text>
                            <Text style={{color: '#A8B3CF'}}>
                              Prazo até {maskDate(goal.date)}
                            </Text>

                            <Box
                              style={{
                                display: hasRepeat(goal?.repeat)
                                  ? 'flex'
                                  : 'none',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                padding: 0,
                                marginTop: 10,
                              }}>
                              <Text style={{color: '#A8B3CF'}}>Retepe</Text>
                              <Box
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  padding: 0,
                                }}>
                                {days.map((day, index) => (
                                  <Text
                                    style={{
                                      textTransform: 'uppercase',
                                      marginLeft: 10,
                                      fontSize: 15,
                                      color: goal.repeat?.includes(day)
                                        ? '#1976D2'
                                        : '#A8B3CF',
                                    }}
                                    key={index}>
                                    {day.charAt(0)}
                                  </Text>
                                ))}
                              </Box>
                            </Box>
                          </Flex>
                          <Icon
                            onPress={() => handleDeleteGoal(selectItem, key)}
                            name="trash-2"
                            size={20}
                            color="#A8B3CF"
                          />
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                  {!e.goals && <Text>Nenhum objetivo adicionado</Text>}
                </Flex>
              </TouchableWithoutFeedback>
            ),
        )}
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date ?? new Date()}
          onConfirm={(value: Date) => {
            setOpen(false);
            setDate(value);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <TextInput
            theme={{
              colors: {
                onSurfaceVariant: '#a8b3cf58',
              },
            }}
            style={{
              backgroundColor: '#1C1F26',
              marginBottom: 20,
            }}
            mode="outlined"
            textColor="#fff"
            outlineColor="#a8b3cf58"
            outlineStyle={{borderWidth: 1}}
            activeOutlineColor="#a8b3cf58"
            label="Nome"
            placeholderTextColor="#a8b3cf58"
            value={text}
            placeholder={'Ex: Estudar 1h por dia'}
            onChangeText={e => handleTextInput(e)}
          />
          <TextInput
            theme={{
              colors: {
                onSurfaceVariant: '#a8b3cf58',
                surfaceVariant: '#FFF',
              },
            }}
            style={{backgroundColor: '#1C1F26', marginBottom: 20}}
            mode="outlined"
            textColor="#fff"
            outlineColor="#a8b3cf58"
            placeholderTextColor="#a8b3cf58"
            outlineStyle={{borderWidth: 1}}
            activeOutlineColor="#a8b3cf58"
            label="Questão"
            value={''}
            placeholder={'Ex: Você estudou hoje?'}
            onChangeText={() => {}}
          />

          <Input
            label={'Freqüência'}
            style={{
              backgroundColor: '#1C1F26',
              width: '100%',
            }}
            value={maskDate(date) ?? ''}
            outline
            placeholder={'Selecione uma data'}
            onPressIn={() => setOpen(true)}
          />
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: 0,
              marginTop: 20,
            }}>
            <Text>Retepe</Text>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 0,
              }}>
              {days.map((day, index) => (
                <Text
                  style={{
                    textTransform: 'uppercase',
                    marginLeft: 10,
                    fontSize: 20,
                    color: isEnabled(day) ? '#1976D2' : '#A8B3CF',
                  }}
                  onPress={() => {
                    console.log(repeate);
                    if (repeate.includes(day)) {
                      setRepeat(repeate.filter(item => item !== day));
                    } else {
                      setRepeat([...repeate, day]);
                    }
                  }}
                  key={index}>
                  {day.charAt(0)}
                </Text>
              ))}
            </Box>
          </Box>
          {date && text && (
            <Button
              textColor={'#1C1F26'}
              style={{
                backgroundColor: '#1976D2',
                borderColor: '#1976D2',
                marginTop: 10,
                width: '100%',
              }}
              onPress={addGoal}>
              Adicionar
            </Button>
          )}
        </View>
      </Modal>

      {hasGoals() && (
        <Button
          textColor={'#1C1F26'}
          style={{
            backgroundColor: '#1976D2',
            borderColor: '#1976D2',
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          Próximo
        </Button>
      )}
      <Text
        style={{textAlign: 'center', marginTop: 20}}
        onPress={() => setStepsListData({...stepsListData, step: 1})}>
        Voltar
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#1C1F26',
    padding: 30,
    flex: 1,
  },
});

export {Step3};
