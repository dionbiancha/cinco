import React, {useState} from 'react';
import {Box, Button, Flex, Input, Text} from 'react-native-design-system';
import {useStepsList} from '../../context/StepsListContext';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import {maskDate} from '../../utils/masks';
import Icon from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';

function Step3() {
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
    return stepsListData.list.some(
      item => item.goals && item?.goals.length > 0,
    );
  }

  function hasRepeat(repeat: string[] | undefined) {
    return repeat && repeat?.length > 0;
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
          Defina os objetivos para atingir cada meta
        </Text>
        <Icon name="info" size={15} color="#FFF" />
      </Box>
      <ScrollView style={{flex: 1, marginTop: 30}}>
        {stepsListData.list?.map((e, index) => (
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
                  </Flex>
                  <Text size="sm" style={{color: '#A8B3CF'}}>
                    {maskDate(e.date) ?? 'Selecione uma data'}
                  </Text>
                  {e.goals?.map((goal, key) => (
                    <Flex
                      style={{marginTop: 20}}
                      key={key}
                      flexDirection="column">
                      <Text style={{color: '#A8B3CF'}}>{goal.title}</Text>
                      <Text style={{color: '#A8B3CF'}}>
                        Prazo até {maskDate(goal.date)}
                      </Text>

                      <Box
                        style={{
                          display: hasRepeat(goal?.repeat) ? 'flex' : 'none',
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
                                  ? '#CB3FF4'
                                  : '#A8B3CF',
                              }}
                              key={index}>
                              {day.charAt(0)}
                            </Text>
                          ))}
                        </Box>
                      </Box>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              {!e.goals && <Text>Nenhum objetivo adicionado</Text>}
            </Flex>
          </TouchableWithoutFeedback>
        ))}
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
          setModalVisible(!modalVisible);
        }}>
        <Box style={styles.modalView}>
          <Flex
            flexDirection="row"
            style={{width: '100%', marginBottom: 30}}
            justifyContent="space-between"
            alignItems="flex-start">
            <View />
            <Text size="md" style={{color: '#A8B3CF'}}>
              Objetivos
            </Text>
            <IconAntDesign
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              name="close"
              size={20}
              color="#A8B3CF"
            />
          </Flex>
          <ScrollView
            style={{
              width: '100%',
            }}>
            {!stepsListData.list[selectItem].goals ? (
              <Text>Nenhum objetivo adicionado</Text>
            ) : (
              stepsListData.list[selectItem].goals?.map((goal, index) => (
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  key={index}
                  style={{marginBottom: 30}}>
                  <Flex flexDirection="column">
                    <Text style={{color: '#A8B3CF'}}>{goal.title}</Text>
                    <Text style={{color: '#A8B3CF'}}>
                      Prazo até {maskDate(goal.date)}
                    </Text>

                    <Box
                      style={{
                        display: hasRepeat(goal.repeat) ? 'flex' : 'none',
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
                                ? '#CB3FF4'
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
                    onPress={() => handleDeleteGoal(selectItem, index)}
                    name="trash-2"
                    size={20}
                    color="#A8B3CF"
                  />
                </Flex>
              ))
            )}
          </ScrollView>

          <Input
            style={{backgroundColor: '#1C1F26', width: '100%'}}
            value={text}
            outline
            placeholder={'Digite seu objetivo'}
            onChangeText={handleTextInput}
          />
          <Input
            style={{backgroundColor: '#1C1F26', width: '100%', marginTop: 10}}
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
                    color: isEnabled(day) ? '#CB3FF4' : '#A8B3CF',
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
                backgroundColor: '#CB3FF4',
                borderColor: '#CB3FF4',
                marginTop: 10,
                width: '100%',
              }}
              onPress={addGoal}>
              Adicionar
            </Button>
          )}
        </Box>
      </Modal>
      {hasGoals() && (
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
    flex: 1,
    backgroundColor: '#2D323C',
    padding: 30,
  },
});

export {Step3};
