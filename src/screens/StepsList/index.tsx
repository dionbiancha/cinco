import {Step1} from './Step1';
import HeaderStep from '../../features/HeaderStep';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

export default function StepsList() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <HeaderStep />
      <Step1 />
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
