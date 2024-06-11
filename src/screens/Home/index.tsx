import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {Box, CheckBox, Flex, Text} from 'react-native-design-system';
import {useState} from 'react';
import {useStepsList} from '../../context/StepsListContext';
import {maskDate} from '../../utils/masks';
import {hasRepeat} from '../StepsList/Step3';

const ITEMS = [1, 2, 3, 4, 5];

const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

export default function Home() {
  const {stepsListData, setStepsListData} = useStepsList();
  const [goalSelected, setGoalSelected] = useState<number>(1);

  function lastFourDays() {
    let days = [];
    for (let i = 0; i < 4; i++) {
      let d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d);
    }
    return days;
  }

  function isSelected(goal: number) {
    return goal === goalSelected;
  }

  function add0(value: string) {
    return value.length === 1 ? `0${value}` : value;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center">
        <Flex
          flexDirection="column"
          style={{
            width: '100%',
          }}>
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-start"
            flex={0.2}>
            <Text>
              {stepsListData.list[goalSelected - 1]?.title ?? 'vazio'}
            </Text>
            <Text>perfil</Text>
          </Flex>
          <Text>Habitos</Text>
          <Flex flex={0.2} flexDirection="row" justifyContent="space-between">
            <Box style={{width: '50%'}}>{''}</Box>
            {lastFourDays().map((day, key) => (
              <Flex key={key} flexDirection="column" alignItems="center">
                <Text style={{textTransform: 'uppercase', fontSize: 10}}>
                  {daysOfWeek[day.getDay()].substring(0, 3)}.
                </Text>
                <Text style={{fontSize: 10, marginTop: -5}}>
                  {add0(day?.getDate().toLocaleString())}
                </Text>
              </Flex>
            ))}
          </Flex>
          {stepsListData?.list[goalSelected - 1]?.goals?.map((goal, key) =>
            hasRepeat(goal.repeat) ? (
              <Flex
                flex={0.1}
                key={key}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Flex flexDirection="column">
                  <Text
                    style={{
                      color: '#A8B3CF',
                      textDecorationLine: goal.finished
                        ? 'line-through'
                        : 'none',
                    }}>
                    {goal.title}
                  </Text>
                </Flex>
              </Flex>
            ) : null,
          )}
          <Text>Checkpoints</Text>
          {stepsListData?.list[goalSelected - 1]?.goals?.map((goal, key) =>
            !hasRepeat(goal.repeat) ? (
              <Flex
                flex={0.2}
                key={key}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Flex flexDirection="column">
                  <Text
                    style={{
                      color: '#A8B3CF',
                      textDecorationLine: goal.finished
                        ? 'line-through'
                        : 'none',
                    }}>
                    {goal.title}
                  </Text>
                  <Text
                    style={{
                      color: '#A8B3CF',
                      textDecorationLine: goal.finished
                        ? 'line-through'
                        : 'none',
                    }}>
                    Prazo até {maskDate(goal.date)}
                  </Text>
                </Flex>
                <CheckBox
                  checked={goal.finished}
                  onPress={() => {
                    setStepsListData(prev => {
                      const newList = [...prev?.list];
                      const newGoals = [...newList[goalSelected - 1]?.goals];
                      newGoals[key].finished = !goal.finished;
                      newList[goalSelected - 1].goals = newGoals;
                      return {
                        ...prev,
                        list: newList,
                      };
                    });
                  }}>
                  {''}
                </CheckBox>
              </Flex>
            ) : null,
          )}
        </Flex>
        <Flex
          flexDirection="row"
          alignItems="flex-end"
          justifyContent="space-between"
          style={{
            width: '100%',
          }}>
          {ITEMS.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => setGoalSelected(item)}>
              <Box>
                <Text
                  style={{
                    fontSize: 60,
                    lineHeight: 60,
                    color: isSelected(item) ? '#FFF' : '#A8B3CF',
                  }}>
                  {item}
                </Text>
              </Box>
            </TouchableWithoutFeedback>
          ))}
        </Flex>
      </Flex>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#1C1F26',
    padding: 10,
  },
});
