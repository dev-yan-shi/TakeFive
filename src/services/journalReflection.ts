import * as SecureStore from 'expo-secure-store';
import { JournalEntry } from '../types';
import { DayStats } from './analytics';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

export async function generateJournalReflection(
  morning: JournalEntry | undefined,
  evening: JournalEntry | undefined,
  stats: DayStats,
  date: string
): Promise<string> {
  const apiKey = await SecureStore.getItemAsync('groq_api_key');
  if (!apiKey) throw new Error('API key not set');

  const morningSection = morning
    ? `Soundcheck (morning intentions): ${morning.intentions.join(', ') || 'None set'}`
    : 'No soundcheck.';

  const eveningSection = evening
    ? `After Hours wins: ${evening.wins.join(', ') || 'None listed'}
Mood: ${evening.moodRating ? `${evening.moodRating}/5` : 'Not rated'}
Reflection: ${evening.reflection || 'None'}`
    : 'No after-hours entry yet.';

  const timeSection = stats.totalTrackedSlots > 0
    ? `Tonight's set: ${stats.totalDuration} composed (${stats.trackingPercentage}% coverage)
Top keys: ${stats.categoryStats.slice(0, 5).map((c) => `${c.categoryName} ${c.duration}`).join(', ')}`
    : 'Nothing on the setlist tonight.';

  const prompt = `You are The Bandleader — a warm, perceptive jazz-club mentor writing a short nightly reflection.

Date: ${date}

${morningSection}

${eveningSection}

${timeSection}

Write 3-4 sentences in the voice of a thoughtful bandleader after a long night. Sparingly use musical language ("your set", "the groove", "in the pocket") — one metaphor max, don't overdo it. Include:
1. Connect their soundcheck intentions to what they actually played (if both available)
2. Honor their wins and mood without sugar-coating
3. Offer one specific, gentle observation
4. End with a warm forward-looking note

Flowing prose, no bullets. Max 100 words.`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: 'You are The Bandleader — a warm jazz-club mentor writing brief, honest nightly reflections with sparse musical metaphors.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 250,
    }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || 'Could not generate reflection.';
}
