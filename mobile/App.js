import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform, StatusBar, Linking, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Send, ShieldAlert, BookOpen, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react-native';

const BACKEND_URL = __DEV__
  ? 'http://192.168.29.51:5001'
  : 'https://wellness-yoga-rag.onrender.com';

const renderFormattedText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <Text key={index} style={{ fontWeight: 'bold' }}>{part.slice(2, -2)}</Text>;
    }
    return part;
  });
};

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [feedbackStatus, setFeedbackStatus] = useState(null);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    setFeedbackStatus(null);

    try {
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get a response from server');
      }

      setResponse(data);
    } catch (error) {
      console.error('Error fetching answer:', error);
      alert(error.message || 'Failed to get answer. Please check if your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (isHelpful) => {
    try {
      await fetch(`${BACKEND_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          queryLogId: response?.queryLogId,
          isHelpful,
        }),
      });
      setFeedbackStatus(isHelpful ? 'positive' : 'negative');
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Sparkles color="#fff" size={32} />
              <Text style={styles.title}>Yoga Assistant</Text>
              <Text style={styles.subtitle}>Ask Me Anything About Yoga</Text>
            </View>

            <View style={styles.glassCard}>
              <View style={styles.inputWrapper}>
                <Search color="#666" size={20} style={styles.searchIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ask anything about yoga..."
                  placeholderTextColor="#999"
                  value={query}
                  onChangeText={setQuery}
                  multiline
                />
              </View>
              <TouchableOpacity
                style={[styles.askButton, loading && styles.disabledButton]}
                onPress={handleAsk}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.askButtonText}>Ask Now</Text>
                    <Send color="#fff" size={18} />
                  </>
                )}
              </TouchableOpacity>
            </View>

            {response && (
              <View style={[styles.glassCard, styles.responseCard]}>
                {response.isUnsafe && (
                  <View style={styles.redWarningBox}>
                    <Text style={styles.redWarningHeader}>⚠️ Safety Warning</Text>
                    <Text style={styles.redWarningText}>
                      This question relates to a medical or sensitive topic.{"\n"}
                      Please consult a certified yoga instructor or healthcare professional before attempting any poses.
                    </Text>
                  </View>
                )}

                {(response.answer || (response.sources && response.sources.length > 0)) && (
                  <>
                    {response.answer && (
                      <View style={styles.answerSection}>
                        <View style={styles.sectionHeader}>
                          <Sparkles color="#fdbb2d" size={18} />
                          <Text style={styles.sectionTitle}>AI Answer</Text>
                        </View>
                        <Text style={styles.answerText}>
                          {renderFormattedText(response.answer)}
                        </Text>
                      </View>
                    )}

                    {response.sources && response.sources.length > 0 && (
                      <View style={styles.sourcesSection}>
                        <View style={styles.sectionHeader}>
                          <BookOpen color="#fdbb2d" size={18} />
                          <Text style={styles.sectionTitle}>Source used</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.sourceTag}
                          onPress={() => Linking.openURL('https://www.artofliving.org/in-en/yoga/beginners/beginner-yoga-asanas-for-everyday')}
                        >
                          <Text style={styles.sourceText}>
                            Art of Living
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    <View style={styles.feedbackSection}>
                      <Text style={styles.feedbackLabel}>Was this helpful?</Text>
                      <View style={styles.feedbackButtons}>
                        <TouchableOpacity
                          style={[styles.feedbackIcon, feedbackStatus === 'positive' && styles.feedbackSelected]}
                          onPress={() => handleFeedback(true)}
                        >
                          <ThumbsUp color={feedbackStatus === 'positive' ? '#fff' : '#fff'} size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.feedbackIcon, feedbackStatus === 'negative' && styles.feedbackSelected]}
                          onPress={() => handleFeedback(false)}
                        >
                          <ThumbsDown color={feedbackStatus === 'negative' ? '#fff' : '#fff'} size={24} />
                        </TouchableOpacity>
                      </View>
                      {feedbackStatus && (
                        <Text style={styles.thanksText}>Thank you for your feedback! ✨</Text>
                      )}
                    </View>
                  </>
                )}
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginTop: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    backdropFilter: 'blur(10px)', // Web only, but good for design intent
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    minHeight: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
  },
  askButton: {
    backgroundColor: '#1a2a6c',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  disabledButton: {
    opacity: 0.7,
  },
  askButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseCard: {
    marginTop: 24,
  },
  answerSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    opacity: 0.9,
  },
  answerText: {
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 16,
  },
  sourcesSection: {
    marginBottom: 24,
  },
  sourcesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sourceTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    maxWidth: '100%',
  },
  sourceText: {
    color: '#fff',
    fontSize: 12,
    opacity: 1,
    textDecorationLine: 'underline',
  },
  feedbackSection: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  feedbackLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.7,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 30,
  },
  feedbackIcon: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  feedbackSelected: {
    backgroundColor: 'rgba(253, 187, 45, 0.4)',
    borderColor: '#fdbb2d',
    borderWidth: 1,
  },
  thanksText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  unsafeContainer: {
    alignItems: 'center',
    padding: 10,
  },
  redWarningBox: {
    backgroundColor: '#ff4d4d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    width: '100%',
  },
  redWarningHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  redWarningText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '500',
  },
  guidanceSection: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  guidanceTitle: {
    color: '#fdbb2d',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  guidanceText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
});
