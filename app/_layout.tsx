import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';
import { useCategoryStore } from '../src/stores/useCategoryStore';
import { useEntryStore } from '../src/stores/useEntryStore';
import { useHabitStore } from '../src/stores/useHabitStore';
import { useSoundStore } from '../src/stores/useSoundStore';
import { APP_COLORS } from '../src/constants/colors';

export default function RootLayout() {
  const loadCategories = useCategoryStore((s) => s.loadCategories);
  const loadEntries = useEntryStore((s) => s.loadEntries);
  const loadHabits = useHabitStore((s) => s.loadHabits);
  const loadSoundPref = useSoundStore((s) => s.loadPref);

  const [fontsLoaded] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    JetBrainsMono_500Medium,
  });

  useEffect(() => {
    loadCategories()
      .then(() => loadEntries())
      .then(() => loadHabits());
    loadSoundPref();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: APP_COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={APP_COLORS.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: APP_COLORS.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="entry-modal" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="category-edit" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="settings" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </>
  );
}
