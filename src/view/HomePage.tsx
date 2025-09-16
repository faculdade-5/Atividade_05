import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

interface HomePageProps {
  navigation: any;
}

export const HomePage = ({ navigation }: HomePageProps) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Bem-vindo ao App!
      </Text>
      
      <Text variant="bodyLarge" style={styles.subtitle}>
        Escolha uma das opções abaixo:
      </Text>

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Lista de Itens
          </Text>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            Gerencie sua lista de itens personalizada
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('ListPage')}
            style={styles.button}
            icon="format-list-bulleted"
          >
            Acessar Lista
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Sobre o App
          </Text>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            Informações sobre esta aplicação
          </Text>
          <Button
            mode="outlined"
            style={styles.button}
            icon="information"
          >
            Sobre
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#1976d2',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    marginBottom: 8,
    color: '#1976d2',
  },
  cardDescription: {
    marginBottom: 16,
    color: '#666',
  },
  button: {
    marginTop: 8,
  },
});
