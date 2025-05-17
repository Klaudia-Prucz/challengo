import { View, Text, StyleSheet } from 'react-native';
import theme from '../constants/theme';

export default function Chat() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>💬 Czat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
