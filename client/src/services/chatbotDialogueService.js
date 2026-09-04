// Natural Human-Like Multilingual Dialogue Engine for WayMate Guide

export const CHAT_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', locale: 'en-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', locale: 'ta-IN' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', locale: 'hi-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', locale: 'te-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', locale: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', locale: 'ml-IN' }
];

export const UI_STRINGS = {
  en: {
    headerTitle: "WayMate Guide",
    headerSubtitle: "Your Travel Companion",
    tabChat: "Chat",
    tabSpeak: "Speak",
    tabTranslate: "Translate",
    inputPlaceholder: "Type a message...",
    send: "Send",
    speakPrompt: "Tap to speak",
    listening: "Listening...",
    youSaid: "You said",
    assistant: "Assistant",
    listen: "Listen",
    translateTitle: "Translate",
    from: "From",
    to: "To",
    translateInputPlaceholder: "Type something to translate...",
    translateBtn: "Translate",
    original: "Original",
    copied: "Copied!",
    copy: "Copy",
    quickChips: [
      "Places near me",
      "Plan my day",
      "I only have ₹500 left",
      "Best sunset spot"
    ],
    micError: "Microphone access is needed for voice input. You can continue using Chat or enable microphone access in your browser settings.",
    micNotSupported: "Voice input isn't supported in this browser. You can continue using Chat.",
    translateError: "Sorry, I couldn't translate that right now. Please try again."
  },
  ta: {
    headerTitle: "வேமேட் வழிகாட்டி",
    headerSubtitle: "உங்கள் பயணத் தோழன்",
    tabChat: "அரட்டை",
    tabSpeak: "பேசுக",
    tabTranslate: "மொழிபெயர்",
    inputPlaceholder: "செய்தியைத் தட்டச்சு செய்க...",
    send: "அனுப்பு",
    speakPrompt: "பேசத் தொடங்குங்கள்",
    listening: "கேட்கிறது...",
    youSaid: "நீங்கள் சொன்னது",
    assistant: "வழிகாட்டி",
    listen: "கேளுங்கள்",
    translateTitle: "மொழிபெயர்ப்பு",
    from: "மூலம்",
    to: "இலக்கு",
    translateInputPlaceholder: "மொழிபெயர்க்க வேண்டியதைத் தட்டச்சு செய்க...",
    translateBtn: "மொழிபெயர்",
    original: "அசல்",
    copied: "நகலெடுக்கப்பட்டது!",
    copy: "நகலெடு",
    quickChips: [
      "அருகிலுள்ள இடங்கள்",
      "என் நாளைத் திட்டமிடு",
      "என்னிடம் ₹500 மட்டுமே உள்ளது",
      "சூரிய அஸ்தமன இடம்"
    ],
    micError: "குரல் உள்ளீட்டிற்கு மைக்ரோஃபோன் அனுமதி தேவை. நீங்கள் தொடர்ந்து அரட்டையைப் பயன்படுத்தலாம்.",
    micNotSupported: "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.",
    translateError: "மன்னிக்கவும், இப்போது மொழிபெயர்க்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்."
  },
  hi: {
    headerTitle: "वेमेट गाइड",
    headerSubtitle: "आपका यात्रा साथी",
    tabChat: "चैट",
    tabSpeak: "बोलें",
    tabTranslate: "अनुवाद",
    inputPlaceholder: "संदेश लिखें...",
    send: "भेजें",
    speakPrompt: "बोलने के लिए टैप करें",
    listening: "सुन रहे हैं...",
    youSaid: "आपने कहा",
    assistant: "सहायक",
    listen: "सुनें",
    translateTitle: "अनुवाद",
    from: "से",
    to: "में",
    translateInputPlaceholder: "अनुवाद के लिए कुछ लिखें...",
    translateBtn: "अनुवाद करें",
    original: "मूल",
    copied: "कॉपी हो गया!",
    copy: "कॉपी",
    quickChips: [
      "आस-पास की जगहें",
      "मेरा दिन प्लान करें",
      "मेरे पास सिर्फ ₹500 बचे हैं",
      "सूर्यास्त का स्थान"
    ],
    micError: "आवाज इनपुट के लिए माइक्रोफ़ोन की अनुमति चाहिए। आप चैट का उपयोग जारी रख सकते हैं।",
    micNotSupported: "इस ब्राउज़र में वॉयस इनपुट समर्थित नहीं है।",
    translateError: "क्षमा करें, अभी अनुवाद नहीं हो सका। कृपया पुनः प्रयास करें।"
  },
  te: {
    headerTitle: "వేమేట్ గైడ్",
    headerSubtitle: "మీ ప్రయాణ సహచరుడు",
    tabChat: "చాట్",
    tabSpeak: "మాట్లాడండి",
    tabTranslate: "అనువాదం",
    inputPlaceholder: "సందేశాన్ని టైప్ చేయండి...",
    send: "పంపు",
    speakPrompt: "మాట్లాడటానికి నొక్కండి",
    listening: "వింటున్నారు...",
    youSaid: "మీరు చెప్పింది",
    assistant: "సహాయకుడు",
    listen: "వినండి",
    translateTitle: "అనువాదం",
    from: "నుండి",
    to: "కు",
    translateInputPlaceholder: "అనువాదం కోసం ఏదైనా టైప్ చేయండి...",
    translateBtn: "అనువదించు",
    original: "అసలు",
    copied: "కాపీ చేయబడింది!",
    copy: "కాపీ",
    quickChips: [
      "నా దగ్గర ప్రదేశాలు",
      "నా రోజును ప్లాన్ చేయండి",
      "నా దగ్గర ₹500 మాత్రమే మిగిలింది",
      "సూర్యాస్తమయ ప్రదేశం"
    ],
    micError: "వాయిస్ ఇన్‌పుట్ కోసం మైక్రోఫోన్ అనుమతి అవసరం.",
    micNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు.",
    translateError: "క్షమించండి, అనువదించడం సాధ్యం కాలేదు."
  },
  kn: {
    headerTitle: "ವೇಮೇಟ್ ಗೈಡ್",
    headerSubtitle: "ನಿಮ್ಮ ಪ್ರವಾಸದ ಒಡನಾಡಿ",
    tabChat: "ಚಾಟ್",
    tabSpeak: "ಮಾತನಾಡಿ",
    tabTranslate: "ಅನುವಾದ",
    inputPlaceholder: "ಸಂದೇಶ ಬರೆಯಿರಿ...",
    send: "ಕಳುಹಿಸಿ",
    speakPrompt: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...",
    youSaid: "ನೀವು ಹೇಳಿದ್ದು",
    assistant: "ಸಹಾಯಕ",
    listen: "ಕೇಳಿ",
    translateTitle: "ಅನುವಾದ",
    from: "ಇಂದ",
    to: "ಗೆ",
    translateInputPlaceholder: "ಅನುವಾದಿಸಲು ಏನಾದರೂ ಬರೆಯಿರಿ...",
    translateBtn: "ಅನುವಾದಿಸಿ",
    original: "ಮೂಲ",
    copied: "ಕಾಪಿ ಆಯಿತು!",
    copy: "ಕಾಪಿ",
    quickChips: [
      "ಹತ್ತಿರದ ಸ್ಥಳಗಳು",
      "ನನ್ನ ದಿನವನ್ನು ಯೋಜಿಸಿ",
      "ನನ್ನ ಬಳಿ ₹500 ಮಾತ್ರ ಉಳಿದಿದೆ",
      "ಸೂರ್ಯಾಸ್ತದ ಸ್ಥಳ"
    ],
    micError: "ಧ್ವನಿ ಇನ್‌ಪುಟ್‌ಗಾಗಿ ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ಅಗತ್ಯವಿದೆ.",
    micNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ವಾಯ್ಸ್ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.",
    translateError: "ಕ್ಷಮಿಸಿ, ಈಗ ಅನುವಾದಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ."
  },
  ml: {
    headerTitle: "വേമേറ്റ് ഗൈഡ്",
    headerSubtitle: "നിങ്ങളുടെ യാത്രാ കൂട്ടുകാരൻ",
    tabChat: "ചാറ്റ്",
    tabSpeak: "സംസാരിക്കുക",
    tabTranslate: "വിവർത്തനം",
    inputPlaceholder: "സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
    send: "അയക്കുക",
    speakPrompt: "സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക",
    listening: "കേൾക്കുന്നു...",
    youSaid: "നിങ്ങൾ പറഞ്ഞത്",
    assistant: "സഹായി",
    listen: "കേൾക്കൂ",
    translateTitle: "വിവർത്തനം",
    from: "ഇതിൽ നിന്ന്",
    to: "ഇതിലേക്ക്",
    translateInputPlaceholder: "വിവർത്തനം ചെയ്യാൻ ടൈപ്പ് ചെയ്യുക...",
    translateBtn: "വിവർത്തനം ചെയ്യുക",
    original: "യഥാർത്ഥം",
    copied: "പകർത്തി!",
    copy: "പകർത്തുക",
    quickChips: [
      "അടുത്തുള്ള സ്ഥലങ്ങൾ",
      "എന്റെ ദിവസം പ്ലാൻ ചെയ്യൂ",
      "എനിക്ക് ₹500 മാത്രമേ ബാക്കിയുള്ളൂ",
      "സൂര്യാസ്തമയ സ്ഥലം"
    ],
    micError: "വോയ്‌സ് ഇൻപുട്ടിനായി മൈക്രോഫോൺ അനുമതി ആവശ്യമാണ്.",
    micNotSupported: "ഈ ബ്രൗസറിൽ വോയ്‌സ് ഇൻപുട്ട് ലഭ്യമല്ല.",
    translateError: "ക്ഷമിക്കണം, ഇപ്പോൾ വിവർത്തനം ചെയ്യാൻ കഴിഞ്ഞില്ല."
  }
};

// Initial warm greeting for each language
export function getInitialGreeting(lang = 'en', destinationName = 'Chennai') {
  switch (lang) {
    case 'ta':
      return `வணக்கம்! 😊 எப்படி இருக்கீங்க? உங்கள் ${destinationName} பயணத்திற்கு நான் எப்படி உதவலாம்?`;
    case 'hi':
      return `नमस्ते! 👋 आप कैसे हैं? आपकी ${destinationName} यात्रा में मैं आपकी क्या मदद कर सकता हूँ?`;
    case 'te':
      return `నమస్కారం! 😊 మీరు ఎలా ఉన్నారు? మీ ${destinationName} ప్రయాణంలో నేను ఎలా సహాయపడగలను?`;
    case 'kn':
      return `ನಮಸ್ಕಾರ! 👋 ನೀವು ಹೇಗಿದ್ದೀರಿ? ನಿಮ್ಮ ${destinationName} ಪ್ರವಾಸಕ್ಕೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`;
    case 'ml':
      return `നമസ്കാരം! 😊 സുഖമാണോ? നിങ്ങളുടെ ${destinationName} യാത്രയിൽ ഞാൻ എങ്ങനെ സഹായിക്കണം?`;
    case 'en':
    default:
      return `Hi! 👋 I'm doing great. How are you? What can I help you with on your ${destinationName} trip?`;
  }
}

// Natural Human-Like Multilingual Response Generator
export function generateHumanResponse({
  userMessage,
  currentLanguage = 'en',
  currentDestination = { name: 'Chennai' },
  tripContext = {}
}) {
  const lower = (userMessage || '').trim().toLowerCase();
  const destName = currentDestination?.name || 'Chennai';
  const budgetLeft = tripContext?.budget || 500;

  // 1. Casual Greetings & Courtesy
  if (lower === 'hi' || lower === 'hello' || lower === 'hey' || lower === 'வணக்கம்' || lower === 'नमस्ते' || lower === 'నమస్కారం' || lower === 'ನಮಸ್ಕಾರ' || lower === 'നമസ്കാരം') {
    switch (currentLanguage) {
      case 'ta':
        return "வணக்கம்! 👋 உங்களை சந்தித்ததில் மகிழ்ச்சி. உங்கள் பயணத்திற்கு நான் எப்படி உதவலாம்?";
      case 'hi':
        return "नमस्ते! 👋 आपसे मिलकर खुशी हुई। मैं आपकी यात्रा में क्या मदद कर सकता हूँ?";
      case 'te':
        return "హలో! 👋 మిమ్మల్ని కలవడం ఆనందంగా ఉంది. మీ ట్రిప్‌లో నేను ఎలా సహాయపడగలను?";
      case 'kn':
        return "ಹಲೋ! 👋 ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದು ಸಂತೋಷವಾಯಿತು. ನಿಮ್ಮ ಪ್ರವಾಸಕ್ಕೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?";
      case 'ml':
        return "ഹലോ! 👋 നിങ്ങളെ കണ്ടുമുട്ടിയതിൽ സന്തോഷം. യാത്രയിൽ ഞാൻ എങ്ങനെ സഹായിക്കണം?";
      case 'en':
      default:
        return "Hi! 👋 Nice to meet you. How can I help you with your trip?";
    }
  }

  if (lower.includes('how are you') || lower.includes('எப்படி இருக்கீங்க') || lower.includes('कैसे हो') || lower.includes('ఎలా ఉన్నారు') || lower.includes('ಹೇಗಿದ್ದೀರಿ') || lower.includes('സുഖമാണോ')) {
    switch (currentLanguage) {
      case 'ta':
        return `நான் நல்லா இருக்கேன், நன்றி! 😊 இன்று ${destName} நகரில் எங்கேனும் சுற்றிப்பார்க்க திட்டமிட்டுள்ளீர்களா?`;
      case 'hi':
        return `मैं बहुत अच्छा हूँ, धन्यवाद! 😊 क्या आज आप ${destName} में कहीं घूमने की योजना बना रहे हैं?`;
      case 'te':
        return `నేను చాలా బాగున్నాను, ధన్యవాదాలు! 😊 ఈరోజు మీరు ఎక్కడికైనా వెళ్లాలని చూస్తున్నారా?`;
      case 'kn':
        return `ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದಗಳು! 😊 ಇವತ್ತು ನೀವು ಎಲ್ಲಾದರೂ ಹೋಗಲು ಯೋಜಿಸುತ್ತಿದ್ದೀರಾ?`;
      case 'ml':
        return `എനിക്ക് സുഖമാണ്, നന്ദി! 😊 ഇന്ന് എവിടെയെങ്കിലും പോകാൻ പ്ലാനുണ്ടോ?`;
      case 'en':
      default:
        return `I'm doing well, thank you! 😊 Are you exploring somewhere around ${destName} today?`;
    }
  }

  if (lower.includes('good morning') || lower.includes('காலை வணக்கம்') || lower.includes('शुभ प्रभात')) {
    switch (currentLanguage) {
      case 'ta':
        return `காலை வணக்கம்! ☀️ இன்று ${destName} பகுதியில் எங்கு செல்ல திட்டமிட்டுள்ளீர்கள்?`;
      case 'hi':
        return `शुभ प्रभात! ☀️ आज आप कहाँ घूमने की योजना बना रहे हैं?`;
      case 'en':
      default:
        return `Good morning! ☀️ Where are you planning to explore in ${destName} today?`;
    }
  }

  if (lower.includes('thank you') || lower.includes('thanks') || lower.includes('நன்றி') || lower.includes('धन्यवाद') || lower.includes('ధన్యవాదాలు') || lower.includes('ಧನ್ಯವಾದ') || lower.includes('നന്ദി')) {
    switch (currentLanguage) {
      case 'ta':
        return "மகிழ்ச்சி! 😊 வேறு ஏதேனும் உதவி தேவைப்பட்டால் சொல்லுங்கள்.";
      case 'hi':
        return "आपका स्वागत है! 😊 अगर आपको कुछ और चाहिए तो जरूर बताएं।";
      case 'en':
      default:
        return "You're welcome! 😊 Let me know if you need anything else.";
    }
  }

  if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('போய் வருகிறேன்') || lower.includes('अलविदा')) {
    switch (currentLanguage) {
      case 'ta':
        return "போய் வாருங்கள்! உங்கள் பயணம் சிறக்க வாழ்த்துகள்! 😊";
      case 'hi':
        return "अलविदा! आपकी यात्रा मंगलमय हो और खूब आनंद लें! 😊";
      case 'en':
      default:
        return "Bye! Have a great trip and enjoy exploring! 😊";
    }
  }

  // 2. Destination Intent (e.g. "I'm going to Yercaud tomorrow" / "Visiting Munnar")
  if (lower.includes('yercaud') || lower.includes('ஏற்காடு') || lower.includes('yerkaud')) {
    switch (currentLanguage) {
      case 'ta':
        return "அருமை! ஏற்காடு ஒரு சிறந்த இடம். 😊 எத்தனை நாட்கள் தங்க திட்டமிட்டுள்ளீர்கள், உங்கள் budget எவ்வளவு?";
      case 'hi':
        return "बहुत बढ़िया! येरकौड एक बेहतरीन जगह है। 😊 आप कितने दिन रुकने की योजना बना रहे हैं, और आपका बजट क्या है?";
      case 'te':
        return "చాలా బాగుంది! యెర్కాడ్ అద్భుతమైన ఎంపిక. 😊 మీరు ఎన్ని రోజులు ఉండాలనుకుంటున్నారు మరియు మీ బడ్జెట్ ఎంత?";
      case 'kn':
        return "ಉತ್ತಮ ಆಯ್ಕೆ! ಯೇರ್ಕಾಡ್ ತುಂಬಾ ಸುಂದರವಾಗಿದೆ. 😊 ನೀವು ಎಷ್ಟು ದಿನ ಉಳಿಯಲು ಯೋಜಿಸುತ್ತಿದ್ದೀರಿ ಮತ್ತು ನಿಮ್ಮ ಬಜೆಟ್ ಎಷ್ಟು?";
      case 'ml':
        return "കൊള്ളാം! യേർക്കാട് ഒരു മികച്ച തിരഞ്ഞെടുപ്പാണ്. 😊 എത്ര ദിവസത്തെ യാത്രയാണ് ഉദ്ദേശിക്കുന്നത്, ബഡ്ജറ്റ് എത്രയാണ്?";
      case 'en':
      default:
        return "Nice! Yercaud is a great choice. 😊 How many days are you planning to stay, and what's your budget?";
    }
  }

  if (lower.includes('going to') || lower.includes('visit') || lower.includes('planning to explore') || lower.includes('செல்ல விரும்புகிறேன்') || lower.includes('जाना चाहता हूँ')) {
    switch (currentLanguage) {
      case 'ta':
        return `கண்டிப்பாக! நான் உங்களுக்கு உதவ மகிழ்ச்சியடைகிறேன். எத்தனை நாட்கள் தங்க திட்டமிட்டுள்ளீர்கள், தோராயமாக எவ்வளவு செலவிட விரும்புகிறீர்கள்?`;
      case 'hi':
        return `ज़रूर! मुझे मदद करने में खुशी होगी। आप कितने दिन रुकेंगे और लगभग कितना बजट है?`;
      case 'en':
      default:
        return `Sure! I'd be happy to help. How many days are you planning to stay, and approximately how much would you like to spend?`;
    }
  }

  // 3. Low Budget / Money Left Context (e.g. "I only have ₹500 left")
  if (lower.includes('500') || lower.includes('left') || lower.includes('cheap') || lower.includes('மட்டுமே உள்ளது') || lower.includes('बचे हैं') || lower.includes('మిగిలింది')) {
    switch (currentLanguage) {
      case 'ta':
        return `பிரச்சனையே இல்லை. உங்களிடம் இன்னும் பணம் இருக்கிறது. ${destName} நகரில் அருகில் குறைந்த செலவில் பார்க்கக்கூடிய இடங்களை நான் பரிந்துரைக்கிறேன். உணவு, சுற்றிப்பார்க்கும் இடம் அல்லது அமைதியான இடம் இதில் எது உங்களுக்கு வேண்டும்?`;
      case 'hi':
        return `कोई बात नहीं। आपके पास अभी भी बजट है। मैं ${destName} में आस-पास कम खर्च वाली जगहें सुझा सकता हूँ। क्या आप खाना, दर्शनीय स्थल या शांतिपूर्ण जगह पसंद करेंगे?`;
      case 'te':
        return `పర్వాలేదు. మీ దగ్గర ఇంకా బడ్జెట్ ఉంది. దగ్గరలో తక్కువ ఖర్చుతో కూడిన ప్రదేశాలను సూచించగలను. మీకు ఆహారం, సందర్శనీయ స్థలాలు లేదా విశ్రాంతి స్థలం కావాలా?`;
      case 'kn':
        return `ಯಾವುದೇ ತೊಂದರೆಯಿಲ್ಲ. ಕಡಿಮೆ ಖರ್ಚಿನ ಉತ್ತಮ ಸ್ಥಳಗಳನ್ನು ನಾನು ಸೂಚಿಸುತ್ತೇನೆ. ನಿಮಗೆ ಊಟ, ಪ್ರವಾಸಿ ತಾಣ ಅಥವಾ ವಿಶ್ರಾಂತಿಯ ಸ್ಥಳ ಬೇಕೇ?`;
      case 'ml':
        return `കുഴപ്പമില്ല. കുറഞ്ഞ ചിലവിൽ അടുത്തുള്ള നല്ല സ്ഥലങ്ങൾ ഞാൻ നിർദ്ദേശിക്കാം. ഭക്ഷണമാണോ അതോ കാഴ്ചകളാണോ നിങ്ങൾക്ക് വേണ്ടത്?`;
      case 'en':
      default:
        return `No problem. You still have ₹500 left. I can suggest some low-cost places nearby in ${destName}. Would you prefer food, sightseeing, or a relaxing place?`;
    }
  }

  // 4. Near Me / What to Visit
  if (lower.includes('near') || lower.includes('visit') || lower.includes('அருகில்') || lower.includes('आस-पास') || lower.includes('దగ్గర') || lower.includes('ಹತ್ತಿರ')) {
    switch (currentLanguage) {
      case 'ta':
        return `கண்டிப்பாக! 😊 ${destName} பகுதியில் உங்களுக்கு அருகில் பார்க்க நல்ல இடங்களைத் தேடுகிறேன். நீங்கள் பாரம்பரிய இடங்களை விரும்புகிறீர்களா அல்லது இயற்கை எழில் கொஞ்சும் இடங்களா?`;
      case 'hi':
        return `ज़रूर! 😊 ${destName} में आपके आस-पास बेहतरीन जगहें खोज रहा हूँ। क्या आप ऐतिहासिक स्थल पसंद करेंगे या प्राकृतिक नज़ारे?`;
      case 'te':
        return `ఖచ్చితంగా! 😊 ${destName} లో మీ దగ్గర చూడదగిన మంచి ప్రదేశాలు ఉన్నాయి. మీరు ప్రకృతి దృశ్యాలు ఇష్టపడతారా లేదా చారిత్రక ప్రదేశాలా?`;
      case 'kn':
        return `ಖಂಡಿತ! 😊 ${destName} ನಲ್ಲಿ ಹತ್ತಿರವಿರುವ ಸುಂದರ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕುತ್ತಿದ್ದೇನೆ. ನಿಮಗೆ ಪ್ರಕೃತಿ ಇಷ್ಟವೇ ಅಥವಾ ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳೇ?`;
      case 'ml':
        return `തീർച്ചയായും! 😊 ${destName} ൽ നിങ്ങളുടെ അടുത്ത് കാണാൻ നല്ല സ്ഥലങ്ങളുണ്ട്. പ്രകൃതി സൗന്ദര്യമാണോ അതോ പൈതൃക സ്ഥലങ്ങളാണോ താല്പര്യം?`;
      case 'en':
      default:
        return `Sure! 😊 In ${destName}, there are wonderful spots around you. Would you prefer nature viewpoints or historical cultural sights?`;
    }
  }

  // 5. Sunset / Evening
  if (lower.includes('sunset') || lower.includes('evening') || lower.includes('அஸ்தமனம்') || lower.includes('सूर्यास्त') || lower.includes('సూర్యాస్తమయం') || lower.includes('ಸೂರ್ಯಾಸ್ತ')) {
    switch (currentLanguage) {
      case 'ta':
        return `இன்று மாலை சூரிய அஸ்தமனத்தைப் பார்க்க சிறந்த இடம் காட்சி முனை அல்லது கடற்கரை பகுதி! மாலை 5:15 முதல் 6:30 மணி வரை சரியான நேரம். நீங்கள் அங்கு செல்ல விரும்புகிறீர்களா?`;
      case 'hi':
        return `आज शाम सूर्यास्त देखने के लिए सबसे अच्छी जगह व्यूप्वाइंट या बीच है! शाम 5:15 से 6:30 का समय सबसे उपयुक्त है।`;
      case 'en':
      default:
        return `For sunset this evening in ${destName}, the coastal promenade or high peak viewpoint is ideal! Best time is between 5:15 PM and 6:30 PM. Would you like walking directions?`;
    }
  }

  // 6. General Friendly Fallback
  switch (currentLanguage) {
    case 'ta':
      return `நான் உங்கள் ${destName} பயண வழிகாட்டி. சுற்றுலா இடங்கள், உணவு, அல்லது பயணத் திட்டமிடல் என எது வேண்டுமானாலும் என்னிடம் கேட்கலாம். என்ன உதவி வேண்டும்?`;
    case 'hi':
      return `मैं आपका ${destName} यात्रा साथी हूँ। आप मुझसे घूमने की जगहें, खाना या यात्रा योजना के बारे में कुछ भी पूछ सकते हैं। बताइए, क्या मदद करूँ?`;
    case 'te':
      return `నేను మీ ${destName} ప్రయాణ గైడ్. మీరు నన్ను సందర్శనీయ స్థలాలు, ఆహారం లేదా ప్రయాణ ప్రణాళిక గురించి అడగవచ్చు.`;
    case 'kn':
      return `ನಾನು ನಿಮ್ಮ ${destName} ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ. ಪ್ರವಾಸಿ ತಾಣಗಳು, ಊಟ ಅಥವಾ ಟ್ರಿಪ್ ಪ್ಲಾನಿಂಗ್ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ.`;
    case 'ml':
      return `ഞാൻ നിങ്ങളുടെ ${destName} യാത്രാ സഹായിയാണ്. കാണേണ്ട സ്ഥലങ്ങൾ, ഭക്ഷണം, അല്ലെങ്കിൽ യാത്രാ പ്ലാനിങ് എന്നിവയെക്കുറിച്ച് ചോദിക്കാം.`;
    case 'en':
    default:
      return `I'm here to help with your ${destName} trip! You can ask me for nearby sights, local dining, budget adjustments, or translation. What would you like to explore?`;
  }
}
