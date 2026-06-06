import { useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface OnboardingProfile {
  name: string;
  experience: "zero" | "some" | "intermediate";
  goal: "skills" | "income" | "curiosity";
  dailyMinutes: 5 | 10 | 20;
  completedAt: string;
}

export interface ProgressState {
  profile: OnboardingProfile | null;
  xp: number;
  streak: number;
  lastActiveDay: string | null; // YYYY-MM-DD
  completedLessons: string[]; // `${moduleId}/${lessonId}`
  userId: string | null;
  hydrated: boolean;
}

const KEY = "tradely.progress.v1";

const defaultState: ProgressState = {
  profile: null,
  xp: 0,
  streak: 0,
  lastActiveDay: null,
  completedLessons: [],
  userId: null,
  hydrated: false,
};

function readLocal(): ProgressState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

let state: ProgressState = readLocal();
const listeners = new Set<() => void>();

function emit() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  }
  listeners.forEach((l) => l());
  // Fire-and-forget remote sync
  void pushRemote();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak() {
  const today = todayStr();
  if (state.lastActiveDay === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  state.streak = state.lastActiveDay === yesterday ? state.streak + 1 : 1;
  state.lastActiveDay = today;
}

let pushTimer: ReturnType<typeof setTimeout> | null = null;
async function pushRemote() {
  if (!state.userId) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    if (!state.userId) return;
    try {
      await supabase.from("user_progress").upsert(
        {
          user_id: state.userId,
          xp: state.xp,
          streak: state.streak,
          last_active_day: state.lastActiveDay,
          completed_lessons: state.completedLessons as unknown as never,
          profile: (state.profile ?? null) as unknown as never,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
    } catch (e) {
      console.warn("progress sync failed", e);
    }
  }, 400);
}

async function pullRemote(userId: string) {
  try {
    const { data } = await supabase
      .from("user_progress")
      .select("xp,streak,last_active_day,completed_lessons,profile")
      .eq("user_id", userId)
      .maybeSingle();

    if (data) {
      // Merge: take max XP / union completed lessons so local progress isn't lost.
      const remoteCompleted = (data.completed_lessons ?? []) as string[];
      const union = Array.from(new Set([...state.completedLessons, ...remoteCompleted]));
      state = {
        ...state,
        userId,
        hydrated: true,
        xp: Math.max(state.xp, data.xp ?? 0),
        streak: Math.max(state.streak, data.streak ?? 0),
        lastActiveDay: data.last_active_day ?? state.lastActiveDay,
        completedLessons: union,
        profile: (data.profile as OnboardingProfile | null) ?? state.profile,
      };
    } else {
      state = { ...state, userId, hydrated: true };
    }
    emit();
  } catch (e) {
    console.warn("progress pull failed", e);
    state = { ...state, userId, hydrated: true };
    emit();
  }
}

let authBound = false;
export function bindAuthToProgress() {
  if (authBound || typeof window === "undefined") return;
  authBound = true;
  supabase.auth.getSession().then(({ data }) => {
    const uid = data.session?.user?.id ?? null;
    if (uid) void pullRemote(uid);
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    const uid = session?.user?.id ?? null;
    if (uid && uid !== state.userId) {
      void pullRemote(uid);
    } else if (!uid && state.userId) {
      state = { ...state, userId: null };
      emit();
    }
  });
}

export const progressStore = {
  get: () => state,
  subscribe,
  setProfile(profile: OnboardingProfile) {
    state = { ...state, profile };
    bumpStreak();
    emit();
  },
  completeLesson(moduleId: string, lessonId: string, xp: number) {
    const key = `${moduleId}/${lessonId}`;
    if (state.completedLessons.includes(key)) {
      emit();
      return;
    }
    state = {
      ...state,
      xp: state.xp + xp,
      completedLessons: [...state.completedLessons, key],
    };
    bumpStreak();
    emit();
  },
  reset() {
    state = { ...defaultState, userId: state.userId };
    emit();
  },
};

const ssrSnapshot = defaultState;
export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, progressStore.get, () => ssrSnapshot);
}

export function lessonLevel(xp: number) {
  const level = Math.floor(xp / 100) + 1;
  const intoLevel = xp % 100;
  return { level, intoLevel, toNext: 100 - intoLevel };
}
