import * as SecureStore from 'expo-secure-store';
import { DayStats } from './analytics';
import { slotsToDuration } from '../utils/time';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

export async function generateDailyInsight(
  stats: DayStats,
  date: string
): Promise<string> {
  const apiKey = await SecureStore.getItemAsync('groq_api_key');
  if (!apiKey) {
    throw new Error('API key not set');
  }

  const categoryBreakdown = stats.categoryStats
    .map((c) => `- ${c.categoryName}: ${c.duration} (${c.percentage}%)`)
    .join('\n');

  const eisenhowerBreakdown = stats.eisenhowerStats
    .filter((e) => e.totalSlots > 0)
    .map((e) => `- ${e.label}: ${e.duration} (${e.percentage}%)`)
    .join('\n');

  const untrackedSlots = 48 - stats.totalTrackedSlots;

  const prompt = `You are The Bandleader — a warm, perceptive jazz-club mentor giving liner notes on someone's day (${date}).

Tonight's setlist:
Tracked: ${stats.totalDuration} of 24h (${stats.trackingPercentage}% coverage)
Off the record: ${slotsToDuration(untrackedSlots)}

By key:
${categoryBreakdown || 'Nothing on the setlist yet'}

The four quadrants:
${eisenhowerBreakdown || 'No quadrant data'}

Write 3-4 short sentences in the voice of a jazz producer writing liner notes. Light musical language ok ("your set", "the groove", "in the pocket") but don't overdo it — one metaphor max. Include:
1. One genuine observation about what they played today
2. One concrete tweak (mention a specific key or time)
3. A warm sign-off

No bullets, no headings. Flowing prose. Max 80 words.`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: 'You are The Bandleader — a warm jazz-club mentor giving short, honest liner notes on a person\'s day. Sparingly use musical language.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || 'Could not generate insight.';
}
