import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { createCripto } from './Api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Cadastro({ navigation }) {
  const [nomeCripto, setNomeCripto] = useState('');
  const [siglaCripto, setSiglaCripto] = useState('');

  const handleSubmit = async () => {
    if (!nomeCripto || !siglaCripto) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de cadastrar.');
      return;
    }

    const newCripto = { nomeCripto, siglaCripto };
    const addedCripto = await createCripto(newCripto);
    
    if (addedCripto) {
      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Criptomoeda</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome da Criptomoeda</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Bitcoin"
          value={nomeCripto}
          onChangeText={setNomeCripto}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Sigla da Criptomoeda</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: BTC"
          value={siglaCripto}
          onChangeText={setSiglaCripto}
          placeholderTextColor="#999"
          autoCapitalize="characters"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="check" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  }
});
 