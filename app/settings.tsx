import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { APP_COLORS, FONTS } from '../src/constants/colors';
import { useSoundStore } from '../src/stores/useSoundStore';
import { play } from '../src/services/sound';

export default function SettingsScreen() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const soundEnabled = useSoundStore((s) => s.enabled);
  const setSoundEnabled = useSoundStore((s) => s.setEnabled);

  useEffect(() => {
    SecureStore.getItemAsync('groq_api_key').then((key) => {
      if (key) setApiKey(key);
      setIsLoaded(true);
    });
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      await SecureStore.deleteItemAsync('groq_api_key');
      Alert.alert('Cleared', 'API key removed');
    } else {
      await SecureStore.setItemAsync('groq_api_key', apiKey.trim());
      Alert.alert('Saved', 'The Bandleader is ready. Voice & AI features are live.');
    }
    router.back();
  };

  const handleSoundToggle = async (v: boolean) => {
    await setSoundEnabled(v);
    if (v) play('habit'); // sample sound when re-enabling
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelBtn}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Green Room</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveBtn}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Sound */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Sound FX</Text>
              <Text style={styles.cardText}>
                Brushed snares, piano keys, vinyl crackle. The music is the point — but you can mute it.
              </Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={handleSoundToggle}
              trackColor={{ false: APP_COLORS.surfaceLight, true: APP_COLORS.primary }}
              thumbColor={APP_COLORS.text}
            />
          </View>
        </View>

        {/* API Key Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Call the Bandleader</Text>
          <Text style={styles.cardText}>
            Your Groq API key powers voice entry, AI text parsing, and The Bandleader's nightly notes. It's free.
          </Text>

          <View style={styles.stepsContainer}>
            <Text style={styles.stepTitle}>Get your free key:</Text>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>1</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepText}>
                  Create a free account at console.groq.com
                </Text>
                <TouchableOpacity
                  style={styles.linkBtn}
                  onPress={() => Linking.openURL('https://console.groq.com')}
                >
                  <Text style={styles.linkBtnText}>Open Groq Console</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={[styles.stepText, { flex: 1 }]}>
                Go to API Keys and click "Create API Key"
              </Text>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={[styles.stepText, { flex: 1 }]}>
                Copy the key (starts with gsk_) and paste it below
              </Text>
            </View>
          </View>

          {isLoaded && (
            <View style={styles.keyInputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={apiKey}
                onChangeText={setApiKey}
                placeholder="gsk_..."
                placeholderTextColor={APP_COLORS.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!showKey}
              />
              <TouchableOpacity
                style={styles.showKeyBtn}
                onPress={() => setShowKey(!showKey)}
              >
                <Text style={styles.showKeyBtnText}>{showKey ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          )}

          {apiKey.trim().length > 0 && (
            <View style={styles.keyStatus}>
              <Text style={styles.keyStatusIcon}>✓</Text>
              <Text style={styles.keyStatusText}>Bandleader on standby</Text>
            </View>
          )}
        </View>

        {/* Features Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What the AI plays</Text>

          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>🎙️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>Voice Entry</Text>
              <Text style={styles.featureText}>
                Hum your day to the mic. Whisper transcribes, the Bandleader composes.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>✏️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>Smart Text Parsing</Text>
              <Text style={styles.featureText}>
                Type "worked out 7-8 then breakfast for 30 min" and it splits into blocks.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>👆</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>Quick Tap (no key needed)</Text>
              <Text style={styles.featureText}>
                Tap a key on the setlist and pick a category. Works fully offline.
              </Text>
            </View>
          </View>
        </View>

        {/* Free tier info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Free Tier Limits</Text>
          <Text style={styles.cardText}>
            Groq's free tier includes:{'\n'}
            · 30 requests per minute{'\n'}
            · 14,400 requests per day{'\n'}
            · Whisper transcription + LLM parsing{'\n'}
            {'\n'}
            Personal tracking uses ~30-50 requests/day. Plenty of room.
          </Text>
        </View>

        <Text style={styles.footerText}>TakeFive · 5/4 · v1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: APP_COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.border,
  },
  cancelBtn: { color: APP_COLORS.textSecondary, fontSize: 15, fontFamily: FONTS.body },
  headerTitle: { color: APP_COLORS.text, fontSize: 17, fontFamily: FONTS.heading, letterSpacing: -0.2 },
  saveBtn: { color: APP_COLORS.primary, fontSize: 15, fontFamily: FONTS.bodyBold },
  card: {
    backgroundColor: APP_COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: APP_COLORS.text,
    fontSize: 18,
    fontFamily: FONTS.heading,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  cardText: {
    color: APP_COLORS.textSecondary,
    fontSize: 13,
    fontFamily: FONTS.body,
    lineHeight: 20,
  },
  rowBetween: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepsContainer: { marginTop: 14, marginBottom: 14 },
  stepTitle: {
    color: APP_COLORS.text,
    fontSize: 13,
    fontFamily: FONTS.bodyBold,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: APP_COLORS.primary,
    color: APP_COLORS.background,
    fontSize: 13,
    fontFamily: FONTS.bodyBold,
    textAlign: 'center',
    lineHeight: 24,
    overflow: 'hidden',
  },
  stepText: { color: APP_COLORS.textSecondary, fontSize: 13, fontFamily: FONTS.body, lineHeight: 20 },
  linkBtn: {
    backgroundColor: APP_COLORS.primary + '20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  linkBtnText: { color: APP_COLORS.primary, fontSize: 13, fontFamily: FONTS.bodyBold },
  keyInputRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: {
    backgroundColor: APP_COLORS.surfaceLight,
    borderRadius: 10,
    padding: 14,
    color: APP_COLORS.text,
    fontSize: 14,
    fontFamily: FONTS.mono,
    borderWidth: 1,
    borderColor: APP_COLORS.border,
  },
  showKeyBtn: { padding: 10 },
  showKeyBtnText: { fontSize: 20 },
  keyStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  keyStatusIcon: { fontSize: 14, color: APP_COLORS.success, fontFamily: FONTS.bodyBold },
  keyStatusText: { color: APP_COLORS.success, fontSize: 13, fontFamily: FONTS.bodyBold },
  featureRow: { flexDirection: 'row', gap: 12, marginTop: 14, alignItems: 'flex-start' },
  featureIcon: { fontSize: 22, marginTop: 2 },
  featureTitle: { color: APP_COLORS.text, fontSize: 14, fontFamily: FONTS.bodyBold },
  featureText: { color: APP_COLORS.textSecondary, fontSize: 12, fontFamily: FONTS.body, lineHeight: 18, marginTop: 2 },
  footerText: {
    color: APP_COLORS.textMuted,
    fontSize: 11,
    fontFamily: FONTS.mono,
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: 1,
  },
});
