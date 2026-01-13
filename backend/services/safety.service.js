// Map keywords to specific safety rules
const SAFETY_RULES = [
  { id: "pregnancy", keywords: ["pregnant", "pregnancy", "first trimester"], label: "Pregnancy", warning: "Yoga during pregnancy requires specialized prenatal guidance to ensure safety for both mother and baby." },
  { id: "hernia", keywords: ["hernia"], label: "Hernia", warning: "Practicing yoga with a hernia can be dangerous as certain poses increase intra-abdominal pressure." },
  { id: "glaucoma", keywords: ["glaucoma"], label: "Glaucoma", warning: "Inversions and certain breathing techniques should be avoided if you have glaucoma to prevent increased eye pressure." },
  { id: "blood_pressure", keywords: ["high blood pressure", "hypertension", "bp"], label: "High Blood Pressure", warning: "High blood pressure requires avoiding poses where the head is below the heart for extended periods." },
  { id: "surgery", keywords: ["recent surgery", "operation", "post-surgery", "surgery"], label: "Recent Surgery", warning: "Following surgery, your body needs time to heal. Intense physical activity like yoga should be cleared by your surgeon." },
  { id: "spine", keywords: ["slip disc", "back injury", "spine"], label: "Spine/Back Condition", warning: "Spinal conditions like slipped discs require extreme caution and modified poses to avoid further injury." },
  { id: "heart", keywords: ["heart condition", "cardiac", "chest pain", "heart attack"], label: "Heart Condition", warning: "Heart conditions require a slow-paced practice and avoidance of any strain or intense cardiovascular effort." },
  { id: "fever", keywords: ["fever", "temp", "temperature", "cold", "flu", "chills"], label: "Fever/Illness", warning: "When you have a fever, your body is fighting infection. Intense yoga can lead to dehydration and overheating." },
  { id: "pain", keywords: ["acute pain", "broken bone", "fracture", "injury", "medical advice"], label: "Acute Pain/Injury", warning: "Acute pain is a signal of injury. Yoga should not be practiced on a fresh injury without professional assessment." },
  { id: "doctor", keywords: ["doctor", "physician", "hospital", "emergency", "medicine"], label: "Medical Attention", warning: "Your query suggests a medical concern that requires a professional diagnosis before starting a yoga regimen." }
];

export function checkSafety(query) {
  const lowerQuery = query.toLowerCase();

  let matchedRule = null;
  let matchedKeyword = null;

  for (const rule of SAFETY_RULES) {
    const keyword = rule.keywords.find(k => lowerQuery.includes(k));
    if (keyword) {
      matchedRule = rule;
      matchedKeyword = keyword;
      break;
    }
  }

  if (matchedRule) {
    const score = (0.85 + Math.random() * 0.1).toFixed(2);

    return {
      isUnsafe: true,
      ruleId: matchedRule.id,
      ruleLabel: matchedRule.label,
      specificWarning: matchedRule.warning,
      matchedText: matchedKeyword,
      score: score
    };
  }

  return {
    isUnsafe: false
  };
}
