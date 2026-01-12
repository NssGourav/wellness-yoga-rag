// List of unsafe keywords/phrases
const UNSAFE_KEYWORDS = [
  "pregnant",
  "pregnancy",
  "first trimester",
  "hernia",
  "glaucoma",
  "high blood pressure",
  "recent surgery",
  "slip disc",
  "heart condition"
];

export function checkSafety(query) {
  const lowerQuery = query.toLowerCase();

  const matchedKeyword = UNSAFE_KEYWORDS.find(keyword =>
    lowerQuery.includes(keyword)
  );

  return {
    isUnsafe: Boolean(matchedKeyword),
    reason: matchedKeyword || null
  };
}
