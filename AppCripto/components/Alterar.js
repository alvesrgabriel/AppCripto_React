import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { updateCripto } from './Api';
import Icon from 'react-native-vector-icons/FontAwesome';
 
export default function Alterar({ route, navigation }) {
  const { cripto } = route.params;
  const [nomeCripto, setNomeCripto] = useState(cripto.nomeCripto);
  const [siglaCripto, setSiglaCripto] = useState(cripto.siglaCripto);
 
  const handleUpdate = () => {
    const updatedData = {
      nomeCripto,
      siglaCripto
    };
 
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja alterar esta Cripto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Alterar',
          onPress: () => updateCripto(cripto.id, updatedData, navigation),
        },
      ]
    );
  };
 
  return (
    <View style={styles.container}>
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
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Icon name="check" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.buttonText}>Atualizar</Text>
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
  button: {
    backgroundColor: '#3498db',
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
 