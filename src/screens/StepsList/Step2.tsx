import React, {useState} from 'react';
import {Box, Button, Flex, Text} from 'react-native-design-system';
import Icon from 'react-native-vector-icons/Feather';
import {useStepsList} from '../../context/StepsListContext';
import {TouchableWithoutFeedback} from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import {maskDate} from '../../utils/masks';
import {ScrollView} from 'react-native-gesture-handler';

function Step2() {
  const {setStepsListData, stepsListData} = useStepsList();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectItem, setSelectItem] = useState(0);

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
          Até quando deve atinger essa meta?
        </Text>
      </Box>
      <ScrollView style={{flex: 1, marginTop: 30}}>
        {stepsListData.list?.map(
          (e, index) =>
            index <= 4 && (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  setSelectItem(index);

                  setOpen(true);
                }}>
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
                      <IconMaterialIcons
                        name="date-range"
                        size={20}
                        color="#A8B3CF"
                      />
                    </Flex>
                    <Text size="sm" style={{color: '#A8B3CF'}}>
                      {maskDate(e.date) ?? 'Selecione uma data'}
                    </Text>
                  </Flex>
                </Flex>
              </TouchableWithoutFeedback>
            ),
        )}
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
      {
        // Verifica se todos os elementos do array "list" possuem a propriedade "date" preenchida
        stepsListData.list.slice(0, 5).every(item => item.date) && (
          <Button
            textColor={'#1C1F26'}
            style={{
              backgroundColor: '#1976D2',
              borderColor: '#1976D2',
            }}
            onPress={() => setStepsListData({...stepsListData, step: 3})}>
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

export {Step2};
