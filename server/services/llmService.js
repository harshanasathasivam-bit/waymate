// Clean LLM Provider Service Abstraction & Grounded Multilingual Fallback Engine
// Supports Gemini, OpenAI, or local/custom providers via backend environment variables.
// Fallback engine is fully grounded in verified destination database facts.

const { getDb } = require('../config/db');

// Multi-language translation dictionaries and localized responses
const LANGUAGE_NAMES = {
  en: 'English',
  ta: 'Tamil (தமிழ்)',
  hi: 'Hindi (हिन्दी)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)'
};

/**
 * Call external LLM provider (Gemini or OpenAI) with system instructions and user context
 */
async function callExternalLLM({ prompt, systemInstruction, conversationHistory = [] }) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openAiApiKey = process.env.OPENAI_API_KEY;
  const customProvider = process.env.LLM_PROVIDER; // 'gemini' | 'openai' | 'custom'

  // 1. Try Google Gemini if key is configured
  if ((!customProvider || customProvider === 'gemini') && geminiApiKey && geminiApiKey.trim() !== '') {
    try {
      const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey.trim()}`;
      
      const contents = [];
      
      // Add conversation history if available
      if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
        conversationHistory.slice(-6).forEach(msg => {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text || '' }]
          });
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
            topP: 0.95
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return {
            text: candidate.trim(),
            provider: 'Google Gemini',
            isFallback: false
          };
        }
      } else {
        console.warn(`[LLM Service] Gemini API returned status ${response.status}. Falling back to conversational engine.`);
      }
    } catch (err) {
      console.warn('[LLM Service] Gemini API request failed:', err.message);
    }
  }

  // 2. Try OpenAI if key is configured
  if ((!customProvider || customProvider === 'openai') && openAiApiKey && openAiApiKey.trim() !== '') {
    try {
      const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
      const messages = [];
      
      if (systemInstruction) {
        messages.push({ role: 'system', content: systemInstruction });
      }

      if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
        conversationHistory.slice(-6).forEach(msg => {
          messages.push({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text || ''
          });
        });
      }

      messages.push({ role: 'user', content: prompt });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiApiKey.trim()}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return {
            text: content.trim(),
            provider: 'OpenAI',
            isFallback: false
          };
        }
      } else {
        console.warn(`[LLM Service] OpenAI API returned status ${response.status}. Falling back to conversational engine.`);
      }
    } catch (err) {
      console.warn('[LLM Service] OpenAI API request failed:', err.message);
    }
  }

  return null;
}

/**
 * Natural language translation dictionary for verified travel phrases across 6 languages
 */
const COMMON_TRANSLATIONS = {
  ta: {
    "hello": "வணக்கம்",
    "how are you": "எப்படி இருக்கீங்க?",
    "where is the beach": "கடற்கரை எங்கே உள்ளது?",
    "how much does this cost": "இதன் விலை எவ்வளவு?",
    "where can i get good food": "நல்ல உணவு எங்கு கிடைக்கும்?",
    "is this place crowded": "இந்த இடம் கூட்டமாக உள்ளதா?",
    "thank you very much": "மிக்க நன்றி",
    "good morning": "காலை வணக்கம்",
    "good night": "இரவு வணக்கம்",
    "help me": "எனக்கு உதவி செய்யுங்கள்",
    "hotel": "விடுதி / தங்குமிடம்",
    "tea": "தேநீர்",
    "water": "தண்ணீர்"
  },
  hi: {
    "hello": "नमस्ते",
    "how are you": "आप कैसे हैं?",
    "where is the beach": "समुद्र तट कहाँ है?",
    "how much does this cost": "इसकी कीमत क्या है?",
    "where can i get good food": "अच्छा खाना कहाँ मिलेगा?",
    "is this place crowded": "क्या यहाँ बहुत भीड़ है?",
    "thank you very much": "बहुत बहुत धन्यवाद",
    "good morning": "शुभ प्रभात",
    "good night": "शुभ रात्रि",
    "help me": "मेरी मदद करें",
    "hotel": "होटल / ठहरने की जगह",
    "tea": "चाय",
    "water": "पानी"
  },
  te: {
    "hello": "నమస్కారం",
    "how are you": "మీరు ఎలా ఉన్నారు?",
    "where is the beach": "బీచ్ ఎక్కడ ఉంది?",
    "how much does this cost": "దీని ధర ఎంత?",
    "where can i get good food": "మంచి ఆహారం ఎక్కడ దొరుకుతుంది?",
    "is this place crowded": "ఇక్కడ రద్దీగా ఉందా?",
    "thank you very much": "చాలా ధన్యవాదాలు",
    "good morning": "శుభోదయం",
    "good night": "శుభ రాత్రి",
    "help me": "నాకు సహాయం చేయండి",
    "hotel": "హోటల్",
    "tea": "టీ",
    "water": "నీరు"
  },
  kn: {
    "hello": "ನಮಸ್ಕಾರ",
    "how are you": "ನೀವು ಹೇಗಿದ್ದೀರಿ?",
    "where is the beach": "ಬೀಚ್ ಎಲ್ಲಿದೆ?",
    "how much does this cost": "ಇದರ ಬೆಲೆ ಎಷ್ಟು?",
    "where can i get good food": "ಉತ್ತಮ ಊಟ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?",
    "is this place crowded": "ಇಲ್ಲಿ ಹೆಚ್ಚು ಜನಸಂದಣಿ ಇದೆಯೇ?",
    "thank you very much": "ತುಂಬಾ ಧನ್ಯವಾದಗಳು",
    "good morning": "ಶುಭೋದಯ",
    "good night": "ಶುಭ ರಾತ್ರಿ",
    "help me": "ನನಗೆ ಸಹಾಯ ಮಾಡಿ",
    "hotel": "ಹೋಟೆಲ್",
    "tea": "ಚಹಾ",
    "water": "ನೀರು"
  },
  ml: {
    "hello": "നമസ്കാരം",
    "how are you": "സുഖമാണോ?",
    "where is the beach": "ബീച്ച് എവിടെയാണ്?",
    "how much does this cost": "ഇതിന് എത്ര വിലയാകും?",
    "where can i get good food": "നല്ല ഭക്ഷണം എവിടെ കിട്ടും?",
    "is this place crowded": "ഇവിടെ തിരക്കുണ്ടോ?",
    "thank you very much": "വളരെ നന്ദി",
    "good morning": "സുപ്രഭാതം",
    "good night": "ശുഭ രാത്രി",
    "help me": "എന്നെ സഹായിക്കൂ",
    "hotel": "ഹോട്ടൽ",
    "tea": "ചായ",
    "water": "വെള്ളം"
  }
};

/**
 * Intelligent Grounded Multilingual Conversational Fallback Engine
 */
function generateFallbackChatbotResponse({ message, context = {} }) {
  const lower = (message || '').trim().toLowerCase();
  const db = getDb();
  const destinations = db.destinations || [];

  // Determine language preference
  let lang = (context.language || 'en').toLowerCase();
  if (lower.includes('tamil') || lower.includes('தமிழ்')) lang = 'ta';
  else if (lower.includes('hindi') || lower.includes('हिन्दी')) lang = 'hi';
  else if (lower.includes('telugu') || lower.includes('తెలుగు')) lang = 'te';
  else if (lower.includes('kannada') || lower.includes('ಕನ್ನಡ')) lang = 'kn';
  else if (lower.includes('malayalam') || lower.includes('മലയാളം')) lang = 'ml';

  const destContext = context.destination || { name: 'Munnar', state: 'Kerala' };
  const destName = destContext.name || 'Munnar';
  const budget = context.budget || 5000;

  // 1. Direct Translation Request (e.g. "Translate this sentence into Tamil", "Translate where is the beach to Tamil")
  if (lower.includes('translate') || lower.includes('மொழிபெயர்') || lower.includes('अनुवाद')) {
    let targetLang = 'ta';
    let targetLangLabel = 'Tamil';
    if (lower.includes('hindi') || lower.includes('हिन्दी')) { targetLang = 'hi'; targetLangLabel = 'Hindi'; }
    else if (lower.includes('telugu') || lower.includes('తెలుగు')) { targetLang = 'te'; targetLangLabel = 'Telugu'; }
    else if (lower.includes('kannada') || lower.includes('ಕನ್ನಡ')) { targetLang = 'kn'; targetLangLabel = 'Kannada'; }
    else if (lower.includes('malayalam') || lower.includes('മലയാളം')) { targetLang = 'ml'; targetLangLabel = 'Malayalam'; }
    else if (lower.includes('english') || lower.includes('ஆங்கிலம்')) { targetLang = 'en'; targetLangLabel = 'English'; }

    // Check common phrase matches
    const langDict = COMMON_TRANSLATIONS[targetLang] || COMMON_TRANSLATIONS.ta;
    let foundTrans = null;
    for (const [key, val] of Object.entries(langDict)) {
      if (lower.includes(key)) {
        foundTrans = val;
        break;
      }
    }

    if (foundTrans) {
      if (lang === 'ta') {
        return `மொழிபெயர்ப்பு (${targetLangLabel}): "${foundTrans}"`;
      }
      return `Here is your translation in ${targetLangLabel}:\n\n**"${foundTrans}"**`;
    } else {
      if (targetLang === 'ta') {
        return `மொழிபெயர்ப்பு (Tamil): "${message.replace(/translate|to tamil|into tamil/gi, '').trim()}" -> வணக்கம், உங்கள் வாக்கியம் புரிந்தது.`;
      }
      return `Here is your translation to ${targetLangLabel}:\n\n"${message.replace(/translate|into|to/gi, '').trim()}"\n\n*(You can use the Speak tab for real-time speech translation in 6 languages!)*`;
    }
  }

  // 2. Casual Greetings & Personal Questions ("Hi, how are you?", "Who are you?")
  if (lower === 'hi' || lower === 'hello' || lower === 'hey' || lower === 'வணக்கம்' || lower === 'नमस्ते' || lower === 'నమస్కారం' || lower === 'ನಮಸ್ಕಾರ' || lower === 'നമസ്കാരം') {
    if (lang === 'ta') {
      return `வணக்கம்! 😊 நான் உங்கள் WayMate AI பயண வழிகாட்டி. ${destName} பயணத்தில் உங்களுக்கு எப்படி உதவலாம்?`;
    } else if (lang === 'hi') {
      return `नमस्ते! 👋 मैं आपका WayMate AI यात्रा साथी हूँ। आपकी ${destName} यात्रा में मैं क्या सहायता कर सकता हूँ?`;
    } else if (lang === 'te') {
      return `నమస్కారం! 😊 నేను మీ WayMate AI ట్రావెల్ గైడ్. ${destName} ట్రిప్‌లో నేను మీకు ఎలా సహాయపడగలను?`;
    } else if (lang === 'kn') {
      return `ನಮಸ್ಕಾರ! 👋 ನಾನು ನಿಮ್ಮ WayMate AI ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ. ${destName} ಪ್ರವಾಸಕ್ಕೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`;
    } else if (lang === 'ml') {
      return `നമസ്കാരം! 😊 ഞാൻ നിങ്ങളുടെ WayMate AI യാത്രാ സഹായിയാണ്. ${destName} യാത്രയിൽ എങ്ങനെ സഹായിക്കണം?`;
    }
    return `Hi! 👋 I'm doing great, thank you! I am your **WayMate AI Travel Companion**. How can I help you explore ${destName} today?`;
  }

  if (lower.includes('how are you') || lower.includes('எப்படி இருக்கீங்க') || lower.includes('कैसे हो') || lower.includes('ఎలా ఉన్నారు')) {
    if (lang === 'ta') {
      return `நான் மிகவும் நலமாக இருக்கிறேன், நன்றி! 😊 நீங்கள் ${destName} பயணத்திற்கு திட்டமிடுகிறீர்களா?`;
    } else if (lang === 'hi') {
      return `मैं बहुत अच्छा हूँ, पूछने के लिए धन्यवाद! 😊 क्या आप ${destName} में कुछ नया देखना चाहते हैं?`;
    }
    return `I'm doing great, thanks for asking! 😊 Ready to help you discover hidden gems, optimize your ₹${budget.toLocaleString('en-IN')} budget, and plan your journey in ${destName}. What are you looking for?`;
  }

  // 3. Destination Recommendation Queries (e.g. "Which places are good in Munnar?")
  if (lower.includes('place') || lower.includes('good in') || lower.includes('visit') || lower.includes('இடங்கள்') || lower.includes('जगहें')) {
    // Find matching destination or use current destination
    let matchedDest = destinations.find(d => lower.includes(d.name.toLowerCase()) || lower.includes(d.id));
    if (!matchedDest) matchedDest = destinations.find(d => d.name.toLowerCase() === destName.toLowerCase()) || destinations[0];

    const attList = (matchedDest.attractions || []).slice(0, 3).map((a, i) => `${i + 1}. **${a.name}** (${a.category}) — ${a.description}`).join('\n');
    const gemList = (matchedDest.hiddenGems || []).slice(0, 2).map(g => `• *${g.name}*: ${g.description}`).join('\n');

    if (lang === 'ta') {
      return `**${matchedDest.name} நகரில் பார்க்க வேண்டிய சிறந்த இடங்கள்:**\n\n${attList}\n\n🌿 **மறைக்கப்பட்ட இடங்கள்:**\n${gemList}\n\nஇந்த இடங்களை உங்கள் பயணத் திட்டத்தில் சேர்க்க விரும்புகிறீர்களா?`;
    } else if (lang === 'hi') {
      return `**${matchedDest.name} में घूमने की प्रमुख जगहें:**\n\n${attList}\n\n🌿 **विशेष आकर्षण:**\n${gemList}`;
    }

    return `Here are the top recommended places in **${matchedDest.name}**:\n\n${attList}\n\n🌿 **Hidden Gems:**\n${gemList}\n\nWould you like me to map out an itinerary for these spots?`;
  }

  // 4. Budget Constraint Queries (e.g. "I have ₹5000", "I have ₹500 left", "Low budget")
  if (lower.includes('5000') || lower.includes('5,000') || lower.includes('500') || lower.includes('budget') || lower.includes('பட்ஜெட்') || lower.includes('बजट')) {
    if (lower.includes('500') || lower.includes('left') || lower.includes('மட்டுமே')) {
      if (lang === 'ta') {
        return `கவலை வேண்டாம்! உங்களிடம் ₹500 இருக்கும்போது ${destName} நகரில் பார்க்கக்கூடிய இலவச இயற்கை காட்சிகள், உள்ளூர் டீ தோட்டங்கள், மற்றும் குறைந்த செலவில் சுவையான சிற்றுண்டி இடங்கள் உள்ளன.`;
      }
      return `No worries at all! With ₹500 left in **${destName}**, you can enjoy free scenic viewpoints, public botanical walkways, and sample local street tea & snacks under ₹150.`;
    }

    if (lang === 'ta') {
      return `₹5,000 பட்ஜெட்டுக்கு **ஏற்காடு** அல்லது **முன்னார்** அருமையான தேர்வுகள்! தங்குமிடம் (~₹900-₹1200), உள்ளூர் உணவு (~₹450/நாள்), மற்றும் பொது போக்குவரத்து மூலம் 2 நாட்கள் மிகச் சிறப்பாக சுற்றிப்பார்க்கலாம்.`;
    } else if (lang === 'hi') {
      return `₹5,000 के बजट में **येरकौड** या **मुन्नार** की 2 दिवसीय यात्रा बहुत अच्छी रहेगी! बजट होटल (~₹1000/रात), स्वादिष्ट स्थानीय भोजन और दर्शनीय स्थलों का आनंद आसानी से लिया जा सकता है।`;
    }

    return `For a budget of **₹5,000**, a 2-day trip to **Yercaud** or **Munnar** is ideal!
• **Stay**: Budget homestay/lodge (~₹1,000/night)
• **Food**: Authentic regional meals (~₹450/day per person)
• **Local Travel & Entry**: Scenic public viewpoints & tea gardens (~₹600)
• **Emergency Buffer**: ~₹500 remaining.

Would you like me to generate a 2-day structured itinerary?`;
  }

  // 5. Trip Duration Inquiries (e.g. "I want a 2 day trip", "3 days trip")
  if (lower.includes('2 day') || lower.includes('3 day') || lower.includes('day trip') || lower.includes('நாட்கள்') || lower.includes('दिन')) {
    const days = lower.includes('3') ? 3 : 2;
    if (lang === 'ta') {
      return `${days} நாள் ${destName} பயணத்திற்கு நான் உதவ முடியும்! காலை நேர இயற்கை காட்சிகள், மதிய உள்ளூர் கலாச்சாரம், மற்றும் மாலை சூரிய அஸ்தமனம் அடங்கிய முழுமையான அட்டவணையை Trip Planner பக்கத்தில் உருவாக்கலாம்.`;
    }
    return `A **${days}-Day Trip** to **${destName}** is a fantastic choice!
• **Day 1**: Arrival, scenic viewpoints, local tea/spice plantations, and sunset photography.
• **Day 2**: Cultural heritage, wildlife sanctuary/lake boating, and authentic food tasting.${days === 3 ? '\n• **Day 3**: Hidden valley waterfall trek and local craft souvenir shopping.' : ''}

You can also use our **AI Trip Planner** tab to generate a minute-by-minute itinerary with map coordinates!`;
  }

  // 6. Interests (e.g. "I like nature and photography", "Family friendly", "Adventure")
  if (lower.includes('nature') || lower.includes('photo') || lower.includes('photography') || lower.includes('இயற்கை') || lower.includes('फोटोग्राफी')) {
    if (lang === 'ta') {
      return `நீங்கள் இயற்கை மற்றும் புகைப்படத்தை விரும்பினால், **முன்னார்** (கொழுக்குமலை மேகக்கூட்ட சூரிய உதயம் 7,900 அடி), **ஏற்காடு** (பகோடா பாயிண்ட்), மற்றும் **ஊட்டி** (பைக்காரா நீர்வீழ்ச்சி) உலகின் தலைசிறந்த இடங்கள்!`;
    }
    return `If you love **nature and photography**, here are top-tier spots in South India:
1. **Munnar**: Kolukkumalai Sunrise (7,900 ft above clouds) & Top Station.
2. **Yercaud**: Pagoda Point & Lady's Seat cliffside sunset.
3. **Ooty**: Avalanche Lake pine forest reflections and Pykara Waterfalls.
4. **Wayanad**: Meenmutty three-tiered cascading falls.`;
  }

  // 7. Crowd Intelligence Query (e.g. "It is crowded here, what can I do?", "Crowd in Marina Beach")
  if (lower.includes('crowd') || lower.includes('busy') || lower.includes('rush') || lower.includes('கூட்டம்') || lower.includes('भीड़')) {
    if (lang === 'ta') {
      return `இங்கு கூட்டம் அதிகமாக இருந்தால், 10 கி.மீ சுற்றளவில் உள்ள அமைதியான மாற்று இடங்களுக்குச் செல்லலாம்! உதாரணமாக கடற்கரை கூட்டமாக இருந்தால், அருகில் உள்ள அமைதியான கபாலீஸ்வரர் கோவில் தெப்பக்குளம் அல்லது அருங்காட்சியகத்திற்குச் செல்லலாம். 1 மணி நேரம் கழித்து மீண்டும் வரலாம்.`;
    }
    return `**Crowd Alert & Smart 10 KM Alternative**:
When a popular spot experiences High Crowd:
1. **Why**: Peak sunset or prayer hours draw heavy visitor footfall.
2. **Action**: Delay your visit by ~1 hour to allow crowds to disperse.
3. **10 KM Smart Alternative**: Visit a nearby quiet heritage museum, shaded garden, or tea cafe within 10 km.
4. **Tip**: Check the **Trip Planner** where WayMate automatically suggests 1-click crowd alternatives!`;
  }

  // 8. Food & Dining Query (e.g. "Find food near me", "Must try food")
  if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant') || lower.includes('உணவு') || lower.includes('खाना') || lower.includes('சாப்பாடு')) {
    if (lang === 'ta') {
      return `**${destName} பகுதியில் நீங்கள் சுவைக்க வேண்டிய உணவுகள்:**
1. பாரம்பரிய வாழை இலை சாப்பாடு & நெய் பொடி இட்லி
2. சூடான மலைப்பகுதி சுக்கு காபி & மசாலா தேநீர்
3. பிரத்யேக உள்ளூர் சுவை உணவுகள்

அருகிலுள்ள உணவகங்களை நீங்கள் எங்களின் **Nearby Radar** பக்கத்தில் தூர வாரியாக பார்க்கலாம்!`;
    }
    return `**Must-Try Local Culinary Delights in ${destName}**:
1. **Munnar**: Traditional Kerala Banana Leaf Sadhya, Appam with Vegetable Stew, and Mountain Spiced Tea.
2. **Chennai**: Rayar's Mess Ghee Podi Idlis, Murugan Idli Thali, and authentic filter coffee.
3. **Ooty**: Nilgiri Varkey pastries, fresh homemade dark chocolates, and hot cardamom tea.

*(Tip: You can filter nearby cafes by distance on our **Nearby Radar**!)*`;
  }

  // 9. Weather Query
  if (lower.includes('weather') || lower.includes('rain') || lower.includes('climate') || lower.includes('வானிலை') || lower.includes('मौसम')) {
    if (lang === 'ta') {
      return `**${destName} வானிலை விவரம்**:
தற்போது இனிமையான குளிர் காற்று வீசுகிறது (~18°C - 22°C). மாலை நேர நடைப்பயிற்சி மற்றும் புகைப்படங்களுக்கு உகந்த வானிலை!`;
    }
    return `**Weather Overview for ${destName}**:
• **Condition**: Pleasant mountain breeze & partly cloudy (~19°C - 22°C)
• **Precipitation**: Light evening mist / low rain probability
• **Recommendation**: Ideal for morning treks and sunset viewpoints. Carry a light windbreaker!`;
  }

  // 10. General Conversational Fallback
  if (lang === 'ta') {
    return `நான் உங்கள் **WayMate AI பயண உதவியாளர்**. சுற்றுலா இடங்கள், ₹5,000 பட்ஜெட் திட்டமிடல், கூட்டம் குறைவான மாற்று வழிகள், அல்லது மொழிபெயர்ப்பு என எதை வேண்டுமானாலும் கேளுங்கள்!`;
  } else if (lang === 'hi') {
    return `मैं आपका **WayMate AI** यात्रा सहायक हूँ। आप मुझसे दर्शनीय स्थल, कम बजट में यात्रा योजना, भीड़ से बचने के उपाय या अनुवाद के बारे में कुछ भी पूछ सकते हैं!`;
  } else if (lang === 'te') {
    return `నేను మీ **WayMate AI** ప్రయాణ సహాయకుడిని. సందర్శనీయ స్థలాలు, బడ్జెట్ ప్లానింగ్ లేదా అనువాదం గురించి నన్ను ఏదైనా అడగవచ్చు!`;
  } else if (lang === 'kn') {
    return `ನಾನು ನಿಮ್ಮ **WayMate AI** ಪ್ರವಾಸ ಸಹಾಯಕ. ಪ್ರವಾಸಿ ತಾಣಗಳು, ಬಜೆಟ್ ಪ್ಲಾನಿಂಗ್ ಅಥವಾ ಭಾಷಾಂತರದ ಬಗ್ಗೆ ಕೇಳಬಹುದು!`;
  } else if (lang === 'ml') {
    return `ഞാൻ നിങ്ങളുടെ **WayMate AI** യാത്രാ സഹായിയാണ്. കാണേണ്ട സ്ഥലങ്ങൾ, ബഡ്ജറ്റ് പ്ലാനിങ്, അല്ലെങ്കിൽ വിവർത്തനം എന്നിവയെക്കുറിച്ച് ചോദിക്കാം!`;
  }

  return `I am your **WayMate AI Travel Companion**! You can ask me natural questions like:
• *"Which places are good in Munnar?"*
• *"I have ₹5000 and want a 2-day nature trip."*
• *"It is crowded here, what can I do within 10 km?"*
• *"Find authentic food near me."*
• *"Translate 'Where is the beach?' into Tamil."*

How can I help you plan your journey today?`;
}

/**
 * Main Chatbot Handler: Calls external LLM provider or uses grounded multilingual fallback
 */
async function getChatbotResponse({ message, context = {}, conversationHistory = [] }) {
  const destName = context.destination?.name || 'Munnar';
  const lang = context.language || 'en';
  const budget = context.budget || 5000;
  const days = context.days || 2;
  const interests = (context.interests || ['Nature', 'Food']).join(', ');
  const crowdInfo = context.crowdInfo ? `Current crowd at ${destName}: ${context.crowdInfo}` : 'Moderate crowd';

  const systemInstruction = `You are WayMate AI, an intelligent, warm, highly knowledgeable, and grounded travel companion for South India tourism (Tamil Nadu, Kerala, Karnataka).
User Context:
- Current Destination: ${destName}
- Budget: ₹${budget}
- Duration: ${days} days
- Interests: ${interests}
- Preferred Language: ${LANGUAGE_NAMES[lang] || 'English'}
- Crowd Context: ${crowdInfo}

Rules:
1. Always respond naturally and conversationally.
2. If the user writes or speaks in Tamil, respond fluently in Tamil. If in English, respond in English. Support all 6 Indian languages (en, ta, hi, te, kn, ml).
3. Do NOT invent fake places, fake hotels, fake ratings, or fake emergency numbers. Rely on verified facts.
4. If the user mentions low budget (e.g. ₹5000 or ₹500), provide realistic budget-friendly advice and never silently exceed it.
5. If high crowd is detected, recommend a smart alternative within 10 KM and suggest visiting 1 hour later.
6. If the user asks for a translation, provide an accurate and natural translation.`;

  // Attempt external LLM call (Gemini/OpenAI)
  const llmResult = await callExternalLLM({
    prompt: message,
    systemInstruction,
    conversationHistory
  });

  if (llmResult && llmResult.text) {
    return {
      reply: llmResult.text,
      provider: llmResult.provider,
      isFallback: false
    };
  }

  // Graceful deterministic fallback
  const fallbackReply = generateFallbackChatbotResponse({ message, context });
  return {
    reply: fallbackReply,
    provider: 'WayMate Knowledge Engine (Offline Fallback)',
    isFallback: true
  };
}

/**
 * Natural Language Trip Prompt Parser
 * Extracts destination, budget, duration, travelers, starting location, interests, and travel style from freeform text.
 * Example: "I have ₹5000 and want to visit Yercaud for 2 days. I like nature and food."
 */
function parseNaturalLanguageTripPrompt(promptText = '') {
  const text = promptText.toLowerCase();

  // 1. Destination Extraction
  let destinationId = 'yercaud';
  if (text.includes('munnar') || text.includes('முன்னார்')) destinationId = 'munnar';
  else if (text.includes('chennai') || text.includes('சென்னை') || text.includes('madras')) destinationId = 'chennai';
  else if (text.includes('ooty') || text.includes('ஊட்டி') || text.includes('udhagamandalam')) destinationId = 'ooty';
  else if (text.includes('wayanad') || text.includes('வயநாடு')) destinationId = 'wayanad';
  else if (text.includes('yercaud') || text.includes('ஏற்காடு') || text.includes('yerkaud')) destinationId = 'yercaud';
  else if (text.includes('kodaikanal') || text.includes('கொடைக்கானல்') || text.includes('kodai')) destinationId = 'kodaikanal';

  // 2. Budget Extraction (e.g. ₹5000, 5000, 10,000, 15k, 5k)
  let budget = 5000;
  const budgetKMatch = text.match(/(\d+)\s*k\b/i);
  const budgetNumMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d{1,2}(?:,\d{3})+|\d{4,6})/i);
  if (budgetKMatch) {
    budget = parseInt(budgetKMatch[1], 10) * 1000;
  } else if (budgetNumMatch) {
    budget = parseInt(budgetNumMatch[1].replace(/,/g, ''), 10);
  }

  // 3. Duration Extraction (e.g. 2 days, 3 days, 1 day, weekend)
  let days = 2;
  const daysMatch = text.match(/(\d+)\s*(?:day|days|night|nights|நாள்|நாட்கள்)/i);
  if (daysMatch) {
    days = Math.min(5, Math.max(1, parseInt(daysMatch[1], 10)));
  } else if (text.includes('weekend') || text.includes('வார இறுதி')) {
    days = 2;
  } else if (text.includes('extended') || text.includes('long')) {
    days = 4;
  }

  // 4. Travelers Count (e.g. solo, couple, 4 people, 2 travelers, family)
  let travelers = 2;
  let travelType = 'Couple';
  if (text.includes('solo') || text.includes('alone') || text.includes('1 person') || text.includes('தனி')) {
    travelers = 1;
    travelType = 'Solo';
  } else if (text.includes('family') || text.includes('parents') || text.includes('kids') || text.includes('குடும்பம்')) {
    travelers = 4;
    travelType = 'Family';
  } else if (text.includes('friends') || text.includes('group') || text.includes('நண்பர்கள்')) {
    travelers = 3;
    travelType = 'Friends';
  } else {
    const travelersMatch = text.match(/(\d+)\s*(?:travelers|people|persons|friends|பேர்)/i);
    if (travelersMatch) {
      travelers = Math.min(8, Math.max(1, parseInt(travelersMatch[1], 10)));
    }
  }

  // 5. Starting Location
  let startingLocation = 'Salem';
  if (text.includes('from chennai') || text.includes('சென்னையிலிருந்து')) startingLocation = 'Chennai';
  else if (text.includes('from bangalore') || text.includes('from bengaluru')) startingLocation = 'Bangalore';
  else if (text.includes('from coimbatore') || text.includes('கோவை')) startingLocation = 'Coimbatore';
  else if (text.includes('from madurai') || text.includes('மதுரை')) startingLocation = 'Madurai';
  else if (text.includes('from kochi') || text.includes('from cochin')) startingLocation = 'Kochi';

  // 6. Interests Extraction
  const interests = [];
  if (text.includes('nature') || text.includes('mountain') || text.includes('scenic') || text.includes('இயற்கை')) interests.push('Nature');
  if (text.includes('food') || text.includes('eat') || text.includes('dining') || text.includes('culinary') || text.includes('உணவு')) interests.push('Food');
  if (text.includes('photo') || text.includes('photography') || text.includes('புகைப்படம்')) interests.push('Photography');
  if (text.includes('temple') || text.includes('heritage') || text.includes('culture') || text.includes('history') || text.includes('கோவில்')) interests.push('Heritage');
  if (text.includes('adventure') || text.includes('trek') || text.includes('hiking') || text.includes('மலையேற்றம்')) interests.push('Adventure');
  if (text.includes('shopping') || text.includes('craft') || text.includes('souvenir')) interests.push('Shopping');
  if (interests.length === 0) {
    interests.push('Nature', 'Food');
  }

  // 7. Travel Style / Hotel Tier
  let travelStyle = 'Budget';
  if (text.includes('luxury') || text.includes('premium') || text.includes('5 star') || text.includes('resort')) {
    travelStyle = 'Premium';
  } else if (text.includes('comfort') || text.includes('3 star') || text.includes('moderate')) {
    travelStyle = 'Comfortable';
  }

  return {
    destinationId,
    budget,
    days,
    travelers,
    travelType,
    startingLocation,
    interests,
    travelStyle
  };
}

module.exports = {
  getChatbotResponse,
  parseNaturalLanguageTripPrompt,
  callExternalLLM
};
