# QuantumLuck

Quantum Luck é um aplicativo interativo desenvolvido com **React Native**, voltado para diversão e motivação. 
Ele possui um único botão que gera efeitos visuais e uma frase afirmação. proporcionando uma experiência divertida e relaxante para o usuário.

---

## 🔹 Funcionalidades

- Botão principal que gera frases aleatórias.
- Efeitos de animação e tremida para aumentar a interatividade.
- Interface simples e intuitiva.
- Possibilidade de expansão para novas funções de entretenimento.

---

## 🔹 Tecnologias utilizadas

- **React Native** – Framework para desenvolvimento mobile cross-platform.
- **JavaScript (ES6)** – Linguagem principal do app.
- **React Hooks** – Para gerenciamento de estado e efeitos.
- **Animated API** – Para animações e efeitos visuais.
- **Git & GitHub** – Controle de versão e hospedagem do código.

---

## 🔹 Estrutura do projeto
QuantumLuck/
├─ src/
│ ├─ components/
│ │ └─ AnimatedButton.jsx
│ ├─ App.js
├─ package.json
├─ README.md


- `src/components/AnimatedButton.jsx` → Componente principal do botão animado.
- `App.js` → Arquivo de entrada do aplicativo.
- `package.json` → Dependências do projeto.
- `README.md` → Documento explicativo do projeto.

---

## 🔹 Como visualizar e rodar o app

Como o Quantum Luck é um aplicativo mobile, **não pode ser executado diretamente no GitHub Pages**. Existem três formas principais de visualizar e testar o app:

### 1️⃣ Usando Expo (Recomendado para teste rápido)

1. Instale o **Expo CLI** (se ainda não tiver):

```bash
npm install -g expo-cli
npm install
expo start
Abra o app no seu celular:

Escaneie o QR Code que aparece no terminal usando o app Expo Go (disponível na Play Store ou App Store).

Rodando no Android Studio (React Native CLI)

Instale o Android Studio e configure o emulador Android.

Instale as dependências do projeto:

npm install


Execute o app no emulador:

npx react-native run-android


⚠️ Para rodar no iOS, é necessário um Mac com Xcode instalado:

npx react-native run-ios

3️⃣ Gerando APK (Android)

Gere o APK de release:

cd android
./gradlew assembleRelease


O APK estará disponível em:

android/app/build/outputs/apk/release/app-release.apk


Instale no celular Android diretamente ou compartilhe com outras pessoas.

🔹 Próximos passos / Melhorias futuras

Adicionar mais efeitos sonoros e visuais.

Implementar tema escuro e personalização do botão.

Criar sistema de pontuação ou conquistas.

Adicionar integração com Firebase para salvar dados do usuário.

Expandir para múltiplas telas com React Navigation.

🔹 Autor

Renan Fogaça (FogacaDEV)
Estudante de TI e desenvolvedor apaixonado por aplicativos interativos e experiências de usuário.

Meu GitHub

🔹 Licença

License © Renan Fogaça
