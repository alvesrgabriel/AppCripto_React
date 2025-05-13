import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FloatingActionButton from 'react-native-floating-action-button';
import { fetchCripto, deleteCripto } from './Api';  // Importação corrigida
import Icon from 'react-native-vector-icons/FontAwesome';
 
export default function Home({ navigation }) {
  const [registro, setRegistros] = useState([]);
 
  useEffect(() => {
    fetchCripto(setRegistros);  // Carrega as Criptos ao iniciar o componente
  }, []);
 
  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja deletar esta Cripto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: () => deleteCripto(id, setRegistros),  // Deleta a Cripto
        },
      ]
    );
  };
 
  return (
    <View style={styles.container}>
      <FlatList
        data={registro}
        keyExtractor={(item) => item.codigo.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              Cripto: {item.sigla} - Nome: {item.nome}
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.codigo)}
              >
                <Icon name="trash" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => navigation.navigate('Alterar', { Book: item })}
              >
                <Icon name="edit" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate('Cadastro')}
        icon="plus"
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#c3c3c3',
    borderRadius: 6,
  },
  itemText: {
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
 
 