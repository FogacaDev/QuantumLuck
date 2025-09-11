// App.tsx
// ====================================================================
// Mantive o layout e visuais; apenas corrigi a lógica dos anúncios.
// Importante: este arquivo usa // @ts-ignore no import do AnimatedButton
// porque seu componente está em .jsx e ajuda a evitar warnings/erros TS.
// ====================================================================

import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';

// @ts-ignore - evita reclamação do TypeScript por AnimatedButton ser .jsx
import AnimatedButton from './src/components/AnimatedButton';

// Usa TestIds no modo DEV; troque para seus IDs reais em produção
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-seu-id-real-aqui';
const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-seu-id-interstitial';

// Contador simples de cliques (reinicia a cada exibição)
let clickCount = 0;

export default function App() {
  // Referência para a instância atual do interstitial
  const interstitialRef = useRef<any>(null);
  // Estado para saber quando o anúncio atual está carregado
  const [adLoaded, setAdLoaded] = useState(false);

  // Guards para as funções de unsubscribe retornadas por addAdEventListener
  const loadedUnsubRef = useRef<(() => void) | null>(null);
  const closedUnsubRef = useRef<(() => void) | null>(null);

  /**
   * Cria uma nova instância do interstitial e começa a carregar.
   * Também registra listeners LOADED e CLOSED (CLOSED somente zera estado,
   * o recriamento é feito imediatamente após o show() — para evitar duplo load).
   */
  const createAndLoadInterstitial = () => {
    try {
      // limpa listeners antigos (se existirem)
      if (loadedUnsubRef.current) {
        loadedUnsubRef.current();
        loadedUnsubRef.current = null;
      }
      if (closedUnsubRef.current) {
        closedUnsubRef.current();
        closedUnsubRef.current = null;
      }

      // cria nova instância
      const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId);
      interstitialRef.current = interstitial;

      // inicia o carregamento
      interstitial.load();

      // quando carregar, marcamos adLoaded = true
      loadedUnsubRef.current = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        console.log('✅ Interstitial carregado');
        setAdLoaded(true);
      });

      // quando o anúncio for fechado, apenas marcamos como não carregado
      // (não chamamos createAndLoadInterstitial aqui para evitar duplicidade)
      closedUnsubRef.current = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('ℹ️ Interstitial fechado pelo usuário');
        setAdLoaded(false);
      });
    } catch (err) {
      console.error('Erro ao criar/carregar interstitial:', err);
      setAdLoaded(false);
    }
  };

  // Inicializa o interstitial quando o app monta
  useEffect(() => {
    createAndLoadInterstitial();

    return () => {
      // cleanup: remove listeners
      try {
        if (loadedUnsubRef.current) loadedUnsubRef.current();
        if (closedUnsubRef.current) closedUnsubRef.current();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Função chamada ao clicar no AnimatedButton (passada via prop)
  const handleButtonClick = () => {
    clickCount++;
    console.log('👉 Clique número:', clickCount);

    // A cada 6 cliques, tentamos exibir o interstitial
    if (clickCount === 6) {
      if (adLoaded && interstitialRef.current) {
        try {
          // Exibe o interstitial atual
          interstitialRef.current.show();
          console.log('🚀 Interstitial exibido (show chamado)');

          // Marca como não carregado e já inicia o carregamento do próximo
          setAdLoaded(false);
          // carrega o próximo imediatamente (atende seu pedido)
          createAndLoadInterstitial();
        } catch (err) {
          console.error('Erro ao chamar show():', err);
          Alert.alert('Erro de anúncio', 'Não foi possível exibir o anúncio agora.');
        }
      } else {
        // Ainda não carregou
        Alert.alert('Aguardando anúncio', 'O anúncio ainda não carregou.');
        console.log('⚠️ Interstitial não estava pronto no clique 6');
      }

      // reinicia contador para a próxima rodada de cliques
      clickCount = 0;
    }
  };

  // --- RENDER (NENHUMA alteração visual intencional) ---
  return (
    <SafeAreaView style={styles.container}>
      {/* ===== BANNER SUPERIOR ===== */}
      <View style={styles.topBannerContainer}>
        <BannerAd unitId={adUnitId} size={BannerAdSize.BANNER} />
      </View>

      {/* ===== CONTEÚDO PRINCIPAL (AnimatedButton controla o fundo animado) ===== */}
      <View style={styles.mainContent}>
        <AnimatedButton onPress={handleButtonClick} />
      </View>

      {/* ===== BANNER INFERIOR ===== */}
      <View style={styles.bottomBannerContainer}>
        <BannerAd unitId={adUnitId} size={BannerAdSize.BANNER} />
      </View>
    </SafeAreaView>
  );
}

// Estilos mantidos — sem background fixo para não sobrescrever o fundo animado
const styles = StyleSheet.create({
  container: { flex: 1 },
  topBannerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  bottomBannerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
