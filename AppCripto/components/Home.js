import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchCripto, deleteCripto } from './Api';

export default function Home({ navigation }) {
  const [registro, setRegistros] = useState([]);
 
  useEffect(() => {
    const loadCriptos = () => {
      fetchCripto((result) => {
        setRegistros(result);
        console.log('Estado atualizado:', result);
      });
    };

    loadCriptos();
    const unsubscribe = navigation.addListener('focus', loadCriptos);
    return () => unsubscribe();
  }, [navigation]);
 
  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja deletar esta Cripto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: () => deleteCripto(id, setRegistros),
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Criptomoedas</Text>
        <Text style={styles.headerSubtitle}>Gerencie suas criptomoedas</Text>
      </View>

      <FlatList
        data={registro}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <View style={styles.cryptoInfo}>
                <Text style={styles.cryptoSymbol}>{item.siglaCripto}</Text>
                <Text style={styles.cryptoName}>{item.nomeCripto}</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => navigation.navigate('Alterar', { cripto: item })}
                >
                  <Icon name="edit" size={16} color="#fff" />
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Icon name="trash" size={16} color="#fff" />
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemFooter}>
              <Text style={styles.dateText}>
                Criado em: {formatDate(item.created_at)}
              </Text>
              <Text style={styles.dateText}>
                Atualizado em: {formatDate(item.updated_at)}
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    padding: 15,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'hidden',
  },
  itemHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cryptoSymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
    backgroundColor: '#f0fff4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  cryptoName: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
  itemFooter: {
    padding: 12,
    backgroundColor: '#fafafa',
  },
  dateText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 2,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
 
 