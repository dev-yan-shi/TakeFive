import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { APP_COLORS, FONTS } from '../../src/constants/colors';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Setlist: '🎹',
    Standards: '🥁',
    Journal: '📓',
    Keys: '🎵',
    'Liner Notes': '📀',
  };
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>
      {icons[label] || '♪'}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: APP_COLORS.surface,
          borderTopColor: APP_COLORS.border,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 30,
          paddingTop: 8,
        },
        tabBarActiveTintColor: APP_COLORS.primary,
        tabBarInactiveTintColor: APP_COLORS.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: FONTS.bodyMedium,
          letterSpacing: 0.4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Setlist', tabBarIcon: ({ focused }) => <TabIcon label="Setlist" focused={focused} /> }}
      />
      <Tabs.Screen
        name="habits"
        options={{ title: 'Standards', tabBarIcon: ({ focused }) => <TabIcon label="Standards" focused={focused} /> }}
      />
      <Tabs.Screen
        name="journal"
        options={{ title: 'Journal', tabBarIcon: ({ focused }) => <TabIcon label="Journal" focused={focused} /> }}
      />
      <Tabs.Screen
        name="categories"
        options={{ title: 'Keys', tabBarIcon: ({ focused }) => <TabIcon label="Keys" focused={focused} /> }}
      />
      <Tabs.Screen
        name="insights"
        options={{ title: 'Liner Notes', tabBarIcon: ({ focused }) => <TabIcon label="Liner Notes" focused={focused} /> }}
      />
    </Tabs>
  );
}
