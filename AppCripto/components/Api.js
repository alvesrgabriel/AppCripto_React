const API_URL = 'https://criptos.webapptech.cloud/api/cripto';
import { Alert } from 'react-native';
 
// Função para buscar as Criptos
export const fetchCripto = async (setRegistros) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar Criptos');
    }
    const result = await response.json();
    console.log('Dados recebidos:', result); // Para debugar a resposta da API
    setRegistros(result.data);  // Atualiza o estado com os dados recebidos
  } catch (error) {
    console.error('Erro ao buscar Criptos:', error);
    throw error;
  }
};
 
// Função para criar Cripto
export const createCripto = async (criptoData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(criptoData),
    });

    // Se a resposta for 204 (No Content) ou 200 (OK), consideramos sucesso
    if (response.status === 204 || response.status === 200) {
      return true;
    }

    const textResponse = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido:', textResponse);
      throw new Error('Erro ao processar resposta da API');
    }

    if (!responseData) {
      throw new Error('Resposta vazia da API');
    }

    if (!response.ok) {
      throw new Error(responseData.message || 'Erro desconhecido na API');
    }

    return responseData;
  } catch (error) {
    console.error('Erro ao cadastrar Cripto:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return false;
  }
};
 
// Função para deletar Cripto
export const deleteCripto = async (criptoId, setRegistros) => {
  try {
    const response = await fetch(`${API_URL}/${criptoId}`, {
      method: 'DELETE',
    });
 
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.success) {
        Alert.alert('Sucesso!', responseData.message);
        setRegistros((prevRegistros) => {
          const novaLista = prevRegistros.filter((cripto) => cripto.id !== criptoId);
          return novaLista;
        });
      } else {
        Alert.alert('Erro', responseData.message);
      }
    } else {
      const textResponse = await response.text();
      let responseData = null;
 
      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.warn('A resposta não é um JSON válido.');
      }
 
      throw new Error(responseData?.message || 'Erro desconhecido ao excluir o Cripto');
    }
  } catch (error) {
    console.error('Erro ao excluir Cripto:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};
 
// Função para atualizar Cripto
export const updateCripto = async (criptoId, updatedData, navigation) => {
  try {
    const response = await fetch(`${API_URL}/${criptoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
 
    if (response.status === 200) {
      Alert.alert('Sucesso!', 'Cripto atualizada com sucesso!');
      navigation.navigate('Home');
    } else {
      const textResponse = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.warn('A resposta não é um JSON válido.');
        responseData = null;
      }
 
      throw new Error(responseData?.message || 'Erro desconhecido ao atualizar o Cripto');
    }
  } catch (error) {
    console.error('Erro ao atualizar Cripto:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
};