import React, { createContext, useContext, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const SettingsContext = createContext();

const translations = {
  en: {
    dashboard: "Dashboard",
    activeGoals: "Active Goals",
    newGoal: "New Goal",
    allGoals: "All Goals",
    totalXp: "Total XP",
    streak: "Streak",
    completed: "Completed",
    categories: "Categories",
    settings: "Settings",
    back: "Back",
    edit: "Edit Goal",
    delete: "Delete Goal",
    pause: "Pause",
    resume: "Resume",
    noGoals: "No active goals yet!",
    confirmDelete: "Are you sure you want to delete this goal?",
    logProgress: "Log Progress Today",
    history: "Progress History",
    days: "Days",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    save: "Save",
    cancel: "Cancel"
  },
  fa: {
    dashboard: "داشبورد",
    activeGoals: "اهداف فعال",
    newGoal: "هدف جدید",
    allGoals: "همه اهداف",
    totalXp: "امتیاز کل (XP)",
    streak: "تداوم روزانه",
    completed: "تکمیل شده",
    categories: "دسته بندی‌ها",
    settings: "تنظیمات",
    back: "بازگشت",
    edit: "ویرایش هدف",
    delete: "حذف هدف",
    pause: "توقف",
    resume: "ادامه",
    noGoals: "هنوز هدفی ثبت نشده است!",
    confirmDelete: "آیا از حذف این هدف اطمینان دارید؟",
    logProgress: "ثبت فعالیت امروز",
    history: "تاریخچه پیشرفت",
    days: "روز",
    language: "زبان",
    theme: "پوسته",
    light: "روشن",
    dark: "تاریک",
    save: "ذخیره",
    cancel: "لغو"
  }
};

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'mui',
});

export const SettingsProvider = ({ children }) => {
  const [lang, setLang] = useLocalStorage('app_lang', 'fa');
  const [mode, setMode] = useLocalStorage('app_theme', 'light'); 

  const isRtl = lang === 'fa' || lang === 'ar';
  const direction = isRtl ? 'rtl' : 'ltr';

  const t = useMemo(() => translations[lang] || translations.en, [lang]);

  const theme = useMemo(() => createTheme({
    direction,
    palette: {
      mode,
      primary: { 
        main: '#1976d2'
      },
      secondary: { 
        main: '#9c27b0'
      },
    },
    typography: {
      fontFamily: isRtl ? 'Tahoma, Arial, sans-serif' : 'Roboto, Arial, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  }), [mode, direction, isRtl]);

  return (
    <SettingsContext.Provider value={{ lang, setLang, mode, setMode, direction, t }}>
      <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={theme}>
          <div 
            dir={direction} 
            style={{ 
              minHeight: '100vh', 
              direction: direction, 
              fontFamily: isRtl ? 'Tahoma' : 'Roboto',
              backgroundColor: mode === 'light' ? '#f5f5f5' : '#121212',
              color: mode === 'light' ? '#000' : '#fff'
            }}
          >
            {children}
          </div>
        </ThemeProvider>
      </CacheProvider>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);