import React, {useState} from 'react';
import {Box, Button, Flex, Text} from 'react-native-design-system';
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
  const [date, setDate] = useState(new Date());
  const [selectItem, setSelectItem] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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
            <Flex flexDirection="column" alignItems="center">
              <Flex
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
                  </Flex>
                  <Text size="sm" style={{color: '#A8B3CF'}}>
                    {maskDate(e.date) ?? 'Selecione uma data'}
                  </Text>
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
          date={date}
          onConfirm={(value: Date) => {
            setOpen(false);
            setDate(value);
            console.log(stepsListData.list);
            setStepsListData(prevState => ({
              ...prevState,
              list: prevState.list.map((item, itemIndex) =>
                itemIndex === selectItem ? {...item, date: value} : item,
              ),
            }));
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
            style={{width: '100%'}}
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
          {!stepsListData.list[selectItem].goals && (
            <Text>Nenhum objetivo adicionado</Text>
          )}
        </Box>
      </Modal>
      {
        // Verifica se todos os elementos do array "list" possuem a propriedade "date" preenchida
        stepsListData.list.every(item => item.date) && (
          <Button
            textColor={'#1C1F26'}
            style={{
              backgroundColor: '#CB3FF4',
              borderColor: '#CB3FF4',
            }}
            onPress={() => setStepsListData({...stepsListData, step: 2})}>
            Próximo
          </Button>
        )
      }
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
