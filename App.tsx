// App.tsx// App.tsx
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';

// @ts-ignore
import AnimatedButton from './src/components/AnimatedButton';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-seu-id-real-aqui';
const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-seu-id-interstitial';

let clickCount = 0;

export default function App() {
  const interstitialRef = useRef<any>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);

  const loadedUnsubRef = useRef<(() => void) | null>(null);
  const closedUnsubRef = useRef<(() => void) | null>(null);

  const createAndLoadInterstitial = () => {
    try {
      loadedUnsubRef.current?.();
      closedUnsubRef.current?.();

      const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId);
      interstitialRef.current = interstitial;
      interstitial.load();

      loadedUnsubRef.current = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        console.log('✅ Interstitial carregado');
        setAdLoaded(true);
      });

      closedUnsubRef.current = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('ℹ️ Interstitial fechado');
        setAdLoaded(false);
        createAndLoadInterstitial(); // Recarrega automaticamente
      });
    } catch (err) {
      console.error('Erro ao criar interstitial:', err);
      setAdLoaded(false);
    }
  };

  useEffect(() => {
    createAndLoadInterstitial();
    return () => {
      loadedUnsubRef.current?.();
      closedUnsubRef.current?.();
    };
  }, []);

  const handleButtonClick = () => {
    clickCount++;
    console.log('👉 Clique número:', clickCount);

    if (clickCount === 3) { // 🔥 Mudei para 3 cliques (estratégia inteligente)
      if (adLoaded && interstitialRef.current) {
        try {
          interstitialRef.current.show();
        } catch (err) {
          console.error('Erro ao mostrar interstitial:', err);
        }
      } else {
        console.log('⚠️ Interstitial não carregado ainda');
      }
      clickCount = 0;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    {/* BOTÃO FORA do container do banner */}
    <TouchableOpacity
      onPress={() => setInstructionsVisible(true)}
      style={styles.instructionsButton}
    >
      <Text style={styles.infoIcon}>❓</Text>
    </TouchableOpacity>

    {/* BANNER SUPERIOR */}
    <View style={styles.topBannerContainer}>
      <BannerAd unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>

      {/* CONTEÚDO PRINCIPAL */}
      <View style={styles.mainContent}>
        <AnimatedButton onPress={handleButtonClick} />
      </View>

      {/* BANNER INFERIOR */}
      <View style={styles.bottomBannerContainer}>
        <BannerAd unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      </View>

      {/* MODAL DE INSTRUÇÕES */}
      <Modal
        visible={instructionsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setInstructionsVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              <Text style={styles.modalTitle}>✨ Método QuantumLuck 3x3x3 ✨</Text>
              {"\n\n"}
              Para ativação quântica máxima, recomendamos:
              {"\n\n"}
              <Text style={styles.modalHighlight}>3 FRASES • 3 MINUTOS • 3 VEZES AO DIA</Text>
              {"\n\n"}
              <Text style={styles.modalStep}>1️⃣</Text> Selecione 3 frases por sessão
              {"\n"}
              <Text style={styles.modalStep}>2️⃣</Text> Medite 3 minutos em cada frase  
              {"\n"}
              <Text style={styles.modalStep}>3️⃣</Text> Pratique 3x ao dia: manhã, tarde e noite
              {"\n\n"}
              <Text style={styles.modalSubtitle}>Como praticar:</Text>
              {"\n"}
              • Leia a frase com atenção profunda
              {"\n"}
              • Feche os olhos e respire fundo 3 vezes
              {"\n"}
              • Mentalize a frase como realidade já manifestada
              {"\n"}
              • Permita que a frequência quântica impregne cada célula
              {"\n\n"}
              <Text style={styles.modalQuote}>
                "Três frases, três minutos, três vezes ao dia, 9 minutos de meditação por sessão são 27 minutos de programação diários. {"\n"}
                QuantumLuck seu App de Meditação guiada te dá a fórmula para reprogramação mental."
              </Text>
            </Text>
            
            <TouchableOpacity
              onPress={() => setInstructionsVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ESTILOS CORRETOS (fora do componente)
const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  topBannerContainer: {
    width: '90%', // ✅ Largura 90% para margem automática
    alignSelf: 'center', // ✅ Centraliza
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    marginTop: 25,
    borderRadius: 12, // ✅ Bordas arredondadas
    shadowColor: '#000', // ✅ Sombra suave
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomBannerContainer: {
    width: '90%', // ✅ Largura 90% para margem automática
    alignSelf: 'center', // ✅ Centraliza
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    marginBottom: 20,
    borderRadius: 12, // ✅ Bordas arredondadas
    shadowColor: '#000', // ✅ Sombra suave
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructionsButton: {
    position: 'absolute',
    top: 5,
    right: 15,
    marginTop:120,
    alignSelf: 'flex-end',
    marginRight: 1,
    zIndex: 10,
  },
  infoIcon: {
    fontSize: 24,
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a11cb',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalHighlight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6b6b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  modalStep: {
    fontWeight: 'bold',
    color: '#6a11cb',
  },
  modalSubtitle: {
    fontWeight: 'bold',
    color: '#2575fc',
    marginTop: 10,
    marginBottom: 5,
  },
  modalQuote: {
    fontStyle: 'italic',
    color: '#1dd1a1',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 20,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: '#6a11cb',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});















