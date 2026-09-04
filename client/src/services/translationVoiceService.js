// Multi-Language Translation, Voice STT, TTS and Travel Phrasebook Service for WayMate

export const SUPPORTED_LANGUAGES = [
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', locale: 'ta-IN' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', locale: 'hi-IN' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', locale: 'ml-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', locale: 'te-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', locale: 'kn-IN' },
  { code: 'en', name: 'English', native: 'English', locale: 'en-IN' }
];

// Essential Tourist Travel Phrasebook with authentic translations
export const TRAVEL_PHRASEBOOK = [
  // 1. Food
  {
    category: 'Food',
    icon: '🍜',
    phraseId: 'f1',
    english: 'Is this vegetarian?',
    translations: {
      ta: 'இது சைவ உணவா? (Idhu saiva unavaa?)',
      hi: 'क्या यह शाकाहारी है? (Kya yeh shakahari hai?)',
      ml: 'ഇത് സസ്യാഹാരമാണോ? (Ithu sasyahaaramaano?)',
      te: 'ఇది శాకాహారమా? (Idi shaakaahaaramaa?)',
      kn: 'ಇದು ಸಸ್ಯಾಹಾರವೇ? (Idu sasyaahaarave?)'
    }
  },
  {
    category: 'Food',
    icon: '🍜',
    phraseId: 'f2',
    english: 'How much does this cost?',
    translations: {
      ta: 'இதன் விலை என்ன? (Idhan vilai enna?)',
      hi: 'इसकी कीमत क्या है? (Iski keemat kya hai?)',
      ml: 'ഇതിന് എത്ര വിലയാകും? (Ithinu ethra vilayaakum?)',
      te: 'దీని ధర ఎంత? (Deeni dhara entha?)',
      kn: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು? (Idara bele eshtu?)'
    }
  },
  {
    category: 'Food',
    icon: '🍜',
    phraseId: 'f3',
    english: 'Please give me drinking water.',
    translations: {
      ta: 'தயவுசெய்து குடிநீர் கொடுங்கள். (Dayavu seidhu kudinir kodungal.)',
      hi: 'कृपया मुझे पीने का पानी दीजिए। (Kripya mujhe peene ka paani dijiye.)',
      ml: 'ദയവായി കുടിവെള്ളം തരൂ. (Dayavaayi kudivellam tharoo.)',
      te: 'దయచేసి త్రాగునీరు ఇవ్వండి. (Dayachesi traaguneeru ivvandi.)',
      kn: 'ದಯವಿಟ್ಟು ಕುಡಿಯುವ ನೀರು ಕೊಡಿ. (Dayavittu kudiyuva neeru kodi.)'
    }
  },
  {
    category: 'Food',
    icon: '🍜',
    phraseId: 'f4',
    english: 'Is this food very spicy?',
    translations: {
      ta: 'இந்த உணவு மிகவும் காரமானதா? (Indha unavu migavum kaaramaanadhaa?)',
      hi: 'क्या यह खाना बहुत तीखा है? (Kya yeh khaana bahut teekha hai?)',
      ml: 'ഈ ഭക്ഷണത്തിന് വളരെ എരിവുണ്ടോ? (Ee bhakshanathinu valare erivundo?)',
      te: 'ఈ ఆహారం చాలా కారంగా ఉందా? (Ee aahaaram chaala kaaranga undaa?)',
      kn: 'ಈ ಆಹಾರ ತುಂಬಾ ಖಾರವಾಗಿದೆಯೇ? (Ee aahaara tumba khaaravaagideye?)'
    }
  },

  // 2. Transport & Cabs
  {
    category: 'Transport',
    icon: '🚖',
    phraseId: 't1',
    english: 'Where is the nearest bus stop?',
    translations: {
      ta: 'அருகிலுள்ள பேருந்து நிறுத்தம் எங்கே உள்ளது? (Arugilulla perundhu nirutham enge ulladhu?)',
      hi: 'निकटतम बस स्टॉप कहाँ है? (Nikatatam bus stop kahan hai?)',
      ml: 'ഏറ്റവും അടുത്തുള്ള ബസ് സ്റ്റോപ്പ് എവിടെയാണ്? (Ettavum aduthulla bus stop evideyaanu?)',
      te: 'దగ్గరలోని బస్ స్టాప్ ఎక్కడ ఉంది? (Daggaraloni bus stop ekkada undi?)',
      kn: 'ಹತ್ತಿರದ ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (Hattirada bus nildaana ellide?)'
    }
  },
  {
    category: 'Transport',
    icon: '🚖',
    phraseId: 't2',
    english: 'How much to the railway station?',
    translations: {
      ta: 'ரயில் நிலையத்திற்கு எவ்வளவு கட்டணம்? (Rail nilaiyathirku evvalavu kattanam?)',
      hi: 'रेलवे स्टेशन तक का किराया कितना है? (Railway station tak ka kiraya kitna hai?)',
      ml: 'റെയിൽവേ സ്റ്റേഷനിലേക്ക് എത്രയാകും? (Railway stationilekku ethrayaakum?)',
      te: 'రైల్వే స్టేషన్‌కు ఎంత అవుతుంది? (Railway station ku entha avuthundi?)',
      kn: 'ರೈಲ್ವೆ ನಿಲ್ದಾಣಕ್ಕೆ ಎಷ್ಟು ಶುಲ್ಕ? (Railway nildaanakke eshtu shulka?)'
    }
  },
  {
    category: 'Transport',
    icon: '🚖',
    phraseId: 't3',
    english: 'Please turn on the meter.',
    translations: {
      ta: 'தயவுசெய்து மீட்டரைப் போடுங்கள். (Dayavu seidhu meter-ai podungal.)',
      hi: 'कृपया मीटर चालू करें। (Kripya meter chaalu karein.)',
      ml: 'ദയവായി മീറ്റർ ഇടൂ. (Dayavaayi meter idoo.)',
      te: 'దయచేసి మీటర్ వేయండి. (Dayachesi meter veyandi.)',
      kn: 'ದಯವಿಟ್ಟು ಮೀಟರ್ ಹಾಕಿ. (Dayavittu meter haaki.)'
    }
  },

  // 3. Hotel & Stays
  {
    category: 'Hotel',
    icon: '🏡',
    phraseId: 'h1',
    english: 'Do you have a room available for tonight?',
    translations: {
      ta: 'இன்றிரவு அறை உள்ளதா? (Indriravu arai ulladha?)',
      hi: 'क्या आज रात के लिए कमरा उपलब्ध है? (Kya aaj raat ke liye kamra uplabdh hai?)',
      ml: 'ഇന്ന് രാത്രിക്ക് മുറി ലഭ്യമാണോ? (Innu raathrikku muri labhyamaano?)',
      te: 'ఈ రాత్రికి గది అందుబాటులో ఉందా? (Ee raatriki gadi andubaatulo undaa?)',
      kn: 'ಇಂದಿನ ರಾತ್ರಿಗೆ ಕೊಠಡಿ ಲಭ್ಯವಿದೆಯೇ? (Indina raatrige kothadi labhyavideye?)'
    }
  },
  {
    category: 'Hotel',
    icon: '🏡',
    phraseId: 'h2',
    english: 'What time is check-out?',
    translations: {
      ta: 'செக்-அவுட் நேரம் என்ன? (Check-out neram enna?)',
      hi: 'चेक-आउट का समय क्या है? (Check-out ka samay kya hai?)',
      ml: 'ചെക്ക്-ഔട്ട് സമയം എപ്പോഴാണ്? (Check-out samayam eppozhaanu?)',
      te: 'చెక్-అవుట్ సమయం ఎంత? (Check-out samayam entha?)',
      kn: 'ಚೆಕ್-ಔಟ್ ಸಮಯ ಯಾವುದು? (Check-out samaya yaavudu?)'
    }
  },

  // 4. Shopping
  {
    category: 'Shopping',
    icon: '🛍️',
    phraseId: 's1',
    english: 'Can you reduce the price a little?',
    translations: {
      ta: 'கொஞ்சம் விலை குறைக்க முடியுமா? (Konjam vilai kuraikka mudiyumaa?)',
      hi: 'क्या आप कीमत थोड़ी कम कर सकते हैं? (Kya aap keemat thodi kam kar sakte hain?)',
      ml: 'വില കുറച്ച് കുറയ്ക്കാമോ? (Vila kurachu kuraykkaamo?)',
      te: 'ధర కొంచెం తగ్గించగలరా? (Dhara konchem tagginchagalaraa?)',
      kn: 'ಬೆಲೆಯನ್ನು ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಬಹುದೇ? (Beleyannu swalpa kadime maadabahude?)'
    }
  },
  {
    category: 'Shopping',
    icon: '🛍️',
    phraseId: 's2',
    english: 'Do you accept UPI / Google Pay / Card?',
    translations: {
      ta: 'யுபிஐ / கூகுள் பே / கார்டு வாங்குகிறீர்களா? (UPI / Google Pay / Card vaangugireergala?)',
      hi: 'क्या आप UPI / Google Pay / कार्ड स्वीकार करते हैं? (Kya aap UPI / Card lete hain?)',
      ml: 'UPI / കാർഡ് സ്വീകരിക്കുമോ? (UPI / Card sweekarikumo?)',
      te: 'మీరు UPI / కార్డ్ తీసుకుంటారా? (Meeru UPI / Card theesukuntaaraa?)',
      kn: 'ನೀವು UPI / ಕಾರ್ಡ್ ಸ್ವೀಕರಿಸುತ್ತೀರಾ? (Neevu UPI / Card sweekarisutteeraa?)'
    }
  },

  // 5. Emergency
  {
    category: 'Emergency',
    icon: '🚨',
    phraseId: 'e1',
    english: 'Please help me, it is an emergency!',
    translations: {
      ta: 'தயவுசெய்து எனக்கு உதவுங்கள், இது அவசரம்! (Dayavu seidhu enakku udhavungal, idhu avasaram!)',
      hi: 'कृपया मेरी मदद करें, यह एक आपात स्थिति है! (Kripya meri madad karein, yeh aapaat sthiti hai!)',
      ml: 'ദയവായി എന്നെ സഹായിക്കൂ, ഇതൊരു അടിയന്തര സാഹചര്യമാണ്! (Dayavaayi enne sahaayikku!)',
      te: 'దయచేసి నాకు సహాయం చేయండి, ఇది అత్యవసరం! (Dayachesi naaku sahaayam cheyandi!)',
      kn: 'ದಯವಿಟ್ಟು ನನಗೆ ಸಹಾಯ ಮಾಡಿ, ಇದು ತುರ್ತು ಪರಿಸ್ಥಿತಿ! (Dayavittu nanage sahaaya maadi!)'
    }
  },
  {
    category: 'Emergency',
    icon: '🚨',
    phraseId: 'e2',
    english: 'Where is the nearest hospital or pharmacy?',
    translations: {
      ta: 'அருகிலுள்ள மருத்துவமனை அல்லது மருந்தகம் எங்கே? (Arugilulla maruthuvamanai enge?)',
      hi: 'निकटतम अस्पताल या दवा की दुकान कहाँ है? (Nikatatam aspatal kahan hai?)',
      ml: 'അടുത്തുള്ള ആശുപത്രി അല്ലെങ്കിൽ ഫാർമസി എവിടെയാണ്? (Aduthulla aashupathri evideyaanu?)',
      te: 'దగ్గరలోని ఆసుపత్రి లేదా మందుల దుకాణం ఎక్కడ ఉంది? (Daggaraloni aasupathri ekkada undi?)',
      kn: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಅಥವಾ ಔಷಧಾಲಯ ಎಲ್ಲಿದೆ? (Hattirada aaspatre ellide?)'
    }
  },

  // 6. Directions
  {
    category: 'Directions',
    icon: '🧭',
    phraseId: 'd1',
    english: 'Which way to the temple / viewpoint?',
    translations: {
      ta: 'கோவிலுக்கு / காட்சி முனைக்கு எந்த வழி? (Kovilukku / Kaatchi munaikku endha vazhi?)',
      hi: 'मंदिर / व्यूप्वाइंट की तरफ कौन सा रास्ता जाता है? (Mandir ki taraf kaun sa rasta jata hai?)',
      ml: 'ക്ഷേത്രത്തിലേക്ക് / വ്യൂ പോയിന്റിലേക്ക് ഏത് വഴിയാണ്? (Kshethrathilekku ethu vazhiyaanu?)',
      te: 'గుడికి / వ్యూ పాయింట్‌కి ఏ దారి? (Gudiki / View point ki ye daari?)',
      kn: 'ದೇವಸ್ಥಾನಕ್ಕೆ / ವ್ಯೂ ಪಾಯಿಂಟ್‌ಗೆ ಯಾವ ದಾರಿ? (Devasthanakke yaava daari?)'
    }
  },
  {
    category: 'Directions',
    icon: '🧭',
    phraseId: 'd2',
    english: 'Is this place walkable from here?',
    translations: {
      ta: 'இங்கிருந்து நடந்து செல்ல முடியுமா? (Ingirundhu nadandhu sella mudiyumaa?)',
      hi: 'क्या यहाँ से पैदल जाया जा सकता है? (Kya yahan se paidal jaaya ja sakta hai?)',
      ml: 'ഇവിടെ നിന്ന് നടക്കാവുന്ന ദൂരമാണോ? (Ivide ninnu nadakkaavunna dooramaano?)',
      te: 'ఇక్కడి నుండి నడిచి వెళ్లవచ్చా? (Ikkadi nundi nadichi vellavachaa?)',
      kn: 'ಇಲ್ಲಿಂದ ನಡೆದುಕೊಂಡು ಹೋಗಬಹುದೇ? (Illinda nadedukondu hogabahude?)'
    }
  }
];

// Offline translation engine for tourist sentences
export function translateSentence(text, targetLang = 'ta') {
  if (!text || !text.trim()) return '';
  const lower = text.trim().toLowerCase();

  // Check phrasebook exact or partial match first
  for (const phrase of TRAVEL_PHRASEBOOK) {
    if (phrase.english.toLowerCase().includes(lower) || lower.includes(phrase.english.toLowerCase().slice(0, 10))) {
      return phrase.translations[targetLang] || phrase.translations['ta'] || text;
    }
  }

  // Common tourist query dictionaries
  const dictionary = {
    ta: {
      "where is the nearest bus stop": "அருகிலுள்ள பேருந்து நிறுத்தம் எங்கே உள்ளது?",
      "where is the hotel": "ஹோட்டல் எங்கே உள்ளது?",
      "where is the nearest hotel": "அருகிலுள்ள தங்கும் விடுதி எங்கே உள்ளது?",
      "find a cheap restaurant": "அருகில் குறைந்த கட்டண உணவகத்தைக் கண்டறியவும்.",
      "find a cheap restaurant nearby": "அருகிலுள்ள மலிவான உணவகத்தைக் காட்டுங்கள்.",
      "what can i visit near me": "என் அருகில் நான் என்னென்ன இடங்களைப் பார்வையிடலாம்?",
      "which place is better for sunset": "சூரிய அஸ்தமனத்தைப் பார்க்க எந்த இடம் சிறந்தது?",
      "how much is the ticket": "நுழைவுச் சீட்டு விலை என்ன?",
      "where is marina beach": "மெரினா கடற்கரை எங்கே உள்ளது?",
      "where is yercaud lake": "ஏற்காடு ஏரி எங்கே உள்ளது?",
      "i need a taxi": "எனக்கு ஒரு வாடகை வண்டி வேண்டும்.",
      "thank you very much": "மிக்க நன்றி!",
      "good morning": "காலை வணக்கம்!",
      "good evening": "மாலை வணக்கம்!"
    },
    hi: {
      "where is the nearest bus stop": "निकटतम बस स्टॉप कहाँ है?",
      "where is the hotel": "होटल कहाँ है?",
      "where is the nearest hotel": "निकटतम होटल कहाँ है?",
      "find a cheap restaurant": "पास में कोई किफायती भोजनालय खोजें।",
      "find a cheap restaurant nearby": "पास में कोई सस्ता और अच्छा रेस्टोरेंट बताइए।",
      "what can i visit near me": "मेरे पास घूमने के लिए कौन से स्थान हैं?",
      "which place is better for sunset": "सूर्यास्त देखने के लिए कौन सी जगह सबसे अच्छी है?",
      "how much is the ticket": "टिकट कितने का है?",
      "where is marina beach": "मरीना बीच कहाँ है?",
      "where is yercaud lake": "यरकाड झील कहाँ है?",
      "i need a taxi": "मुझे एक टैक्सी चाहिए।",
      "thank you very much": "बहुत-बहुत धन्यवाद!",
      "good morning": "शुभ प्रभात!",
      "good evening": "शुभ संध्या!"
    },
    ml: {
      "where is the nearest bus stop": "ഏറ്റവും അടുത്തുള്ള ബസ് സ്റ്റോപ്പ് എവിടെയാണ്?",
      "where is the hotel": "ഹോട്ടൽ എവിടെയാണ്?",
      "where is the nearest hotel": "അടുത്തുള്ള നല്ലൊരു ഹോട്ടൽ എവിടെയാണ്?",
      "find a cheap restaurant": "അടുത്തുള്ള കുറഞ്ഞ ചിലവിലുള്ള ഒരു റസ്റ്റോറന്റ് കണ്ടെത്തൂ.",
      "what can i visit near me": "എന്റെ അടുത്ത് എനിക്ക് എന്തൊക്കെ സന്ദർശിക്കാം?",
      "which place is better for sunset": "സൂര്യാസ്തമയം കാണാൻ ഏറ്റവും നല്ല സ്ഥലം ഏതാണ്?",
      "how much is the ticket": "ടിക്കറ്റിന് എത്രയാണ്?",
      "thank you very much": "വളരെ നന്ദി!"
    },
    te: {
      "where is the nearest bus stop": "దగ్గరలోని బస్ స్టాప్ ఎక్కడ ఉంది?",
      "where is the hotel": "హోటల్ ఎక్కడ ఉంది?",
      "what can i visit near me": "నా దగ్గరలో చూడదగిన ప్రదేశాలు ఏమిటి?",
      "which place is better for sunset": "సూర్యాస్తమయం చూడటానికి ఏ ప్రదేశం బాగుంటుంది?",
      "thank you very much": "చాలా ధన్యవాదాలు!"
    },
    kn: {
      "where is the nearest bus stop": "ಹತ್ತಿರದ ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?",
      "where is the hotel": "ಹೋಟೆಲ್ ಎಲ್ಲಿದೆ?",
      "what can i visit near me": "ನನ್ನ ಹತ್ತಿರ ನಾನು ಏನನ್ನು ನೋಡಬಹುದು?",
      "which place is better for sunset": "ಸೂರ್ಯಾಸ್ತ ನೋಡಲು ಯಾವ ಸ್ಥಳ ಉತ್ತಮ?",
      "thank you very much": "ತುಂಬಾ ಧನ್ಯವಾದಗಳು!"
    }
  };

  const langDict = dictionary[targetLang] || dictionary.ta;
  for (const [key, value] of Object.entries(langDict)) {
    if (lower.includes(key) || key.includes(lower)) {
      return value;
    }
  }

  // Fallback transliteration wrapper
  return `[${SUPPORTED_LANGUAGES.find(l => l.code === targetLang)?.name || targetLang}]: ${text}`;
}

// Text-to-Speech (TTS) Speaker with locale matching
export function speakText(text, langCode = 'en') {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Strip transliteration bracket guides if present (e.g. text in parentheses)
  const cleanText = text.replace(/\(.*?\)/g, '').trim();

  window.speechSynthesis.cancel(); // Stop ongoing speech
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Map to matching locale
  const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
  utterance.lang = langObj?.locale || 'en-IN';
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Browser Speech-to-Text (STT) Recognition Wrapper
export function createSpeechRecognizer({ onResult, onError, onEnd }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-IN';

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    if (onResult) onResult(transcript, event.results[0].isFinal);
  };

  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
}
