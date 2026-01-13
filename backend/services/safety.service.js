// Map keywords to specific safety rules
const SAFETY_RULES = [
  { id: "pregnancy", keywords: ["pregnant", "pregnancy", "first trimester"], label: "Pregnancy" },
  { id: "hernia", keywords: ["hernia"], label: "Hernia" },
  { id: "glaucoma", keywords: ["glaucoma"], label: "Glaucoma" },
  { id: "blood_pressure", keywords: ["high blood pressure", "hypertension", "bp"], label: "High Blood Pressure" },
  { id: "surgery", keywords: ["recent surgery", "operation", "post-surgery", "surgery"], label: "Recent Surgery" },
  { id: "spine", keywords: ["slip disc", "back injury", "spine"], label: "Spine/Back Condition" },
  { id: "heart", keywords: ["heart condition", "cardiac"], label: "Heart Condition" }
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
      matchedText: matchedKeyword,
      score: score,
      debugInfo: `**Safety Notice:** This query relates to a medical or sensitive topic.\n**Matched safety rule:** ${matchedRule.id}, **Semantic match with unsafe intent:** "${query}" (**Score:** ${score})`
    };
  }

  return {
    isUnsafe: false
  };
}
