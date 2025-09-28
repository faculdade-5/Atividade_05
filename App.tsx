import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AppProvider } from './src/context/AppContext';
import { HomePage } from './src/view/HomePage';
import { ListPage } from './src/view/ListPage';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator
              initialRouteName="HomePage"
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen 
                name="HomePage" 
                component={HomePage}
                options={{ 
                  title: 'Início',
                  headerShown: false 
                }}
              />
              <Stack.Screen 
                name="ListPage" 
                component={ListPage}
                options={{ 
                  title: 'Lista de Itens',
                  headerBackTitle: 'Voltar'
                }}
              />
            </Stack.Navigator>
            <Toast />
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});