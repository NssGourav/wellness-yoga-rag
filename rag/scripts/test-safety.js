import { checkSafety } from "../../backend/services/safety.service.js";

function testSafety() {
  const testCases = [
    {
      query: "Can I do yoga during pregnancy?",
      expected: true
    },
    {
      query: "Best yoga poses for back pain",
      expected: false
    },
    {
      query: "I have high blood pressure, what should I avoid?",
      expected: true
    },
    {
      query: "how to do surya namaskar",
      expected: false
    },
    {
      query: "yoga after recent surgery",
      expected: true
    }
  ];

  console.log("Testing Safety Service...\n");
  testCases.forEach(({ query, expected }, i) => {
    const result = checkSafety(query);
    const passed = result.isUnsafe === expected;

    console.log(`Test ${i + 1}: "${query}"`);
    console.log(`Result: ${result.isUnsafe ? "⚠️ UNSAFE" : "✅ SAFE"}`);
    if (result.isUnsafe) console.log(`Reason: ${result.reason}`);
    console.log(`Status: ${passed ? "PASS" : "FAIL"}\n`);
  });
}

testSafety();
