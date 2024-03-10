import {Step1} from './Step1';
import HeaderStep from '../../features/HeaderStep';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {useStepsList} from '../../context/StepsListContext';
import {Step2} from './Step2';
import {Step3} from './Step3';

export default function StepsList() {
  const {stepsListData} = useStepsList();
  return (
    <GestureHandlerRootView style={styles.container}>
      <HeaderStep />
      {stepsListData.step === 1 && <Step1 />}
      {stepsListData.step === 2 && <Step2 />}
      {stepsListData.step === 3 && <Step3 />}
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
