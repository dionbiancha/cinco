import {Box, Text} from 'react-native-design-system';
import {useStepsList} from '../../context/StepsListContext';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const DottedLine = () => (
  <View
    style={{
      flex: 1,
      borderColor: '#2D323C',
      borderBottomWidth: 1,
      borderStyle: 'dotted',
    }}
  />
);

export default function HeaderStep() {
  const {stepsListData} = useStepsList();

  function isColorStep(value: number) {
    if (stepsListData.step >= value) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
      }}>
      <Box
        style={{
          ...styles.styleNumberArea,
          backgroundColor: isColorStep(1) ? '#1976D2' : '#2D323C',
        }}>
        {isColorStep(1) ? (
          <Icon name="check" size={20} />
        ) : (
          <Text style={styles.styleText}>1</Text>
        )}
      </Box>
      <DottedLine />
      <Box
        style={{
          ...styles.styleNumberArea,
          backgroundColor: isColorStep(2) ? '#1976D2' : '#2D323C',
        }}>
        {isColorStep(2) ? (
          <Icon name="check" size={20} />
        ) : (
          <Text style={styles.styleText}>2</Text>
        )}
      </Box>
      <DottedLine />
      <Box
        style={{
          ...styles.styleNumberArea,
          backgroundColor: isColorStep(3) ? '#1976D2' : '#2D323C',
        }}>
        <Text style={styles.styleText}>3</Text>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  styleNumberArea: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: '#2D323C',
  },
  styleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1C1F26',
  },
});
