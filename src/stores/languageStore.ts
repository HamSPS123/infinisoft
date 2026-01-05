import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the language interface
export interface Language {
  id: string;
  name: string;
  code: string;
  isDefault: boolean;
}

// Define the language store state
interface LanguageState {
  languages: Language[];
  defaultLanguage: Language | null;
  selectedLanguage: Language | null;
  isLoading: boolean;
  error: string | null;
  // Actions
  setLanguages: (languages: Language[]) => void;
  selectLanguage: (languageId: string) => void;
  fetchLanguages: () => Promise<void>;
}

// Create the language store with persistence
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      languages: [],
      defaultLanguage: null,
      selectedLanguage: null,
      isLoading: false,
      error: null,

      // Set languages and automatically set the default language
      setLanguages: (languages: Language[]) => {
        const defaultLanguage = languages.find(lang => lang.isDefault) || languages[0] || null;
        set({
          languages,
          defaultLanguage,
          // If no language is selected yet, select the default
          selectedLanguage: get().selectedLanguage || defaultLanguage
        });
      },

      // Select a language by ID
      selectLanguage: (languageId: string) => {
        const { languages, defaultLanguage } = get();
        // Don't allow changing from default language
        if (defaultLanguage && defaultLanguage.id === get().selectedLanguage?.id) {
          return;
        }
        
        const language = languages.find(lang => lang.id === languageId) || defaultLanguage;
        set({ selectedLanguage: language });
      },

      // Fetch languages from API (or use mock data for now)
      fetchLanguages: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Mock data - in a real app, this would be an API call
          const mockLanguages: Language[] = [
            { id: '1', name: 'English', code: 'en', isDefault: true },
            { id: '2', name: 'Indonesian', code: 'id', isDefault: false },
            { id: '3', name: 'French', code: 'fr', isDefault: false }
          ];
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Set languages in store
          get().setLanguages(mockLanguages);
          set({ isLoading: false });
        } catch (error) {
          console.error('Error fetching languages:', error);
          set({
            isLoading: false,
            error: 'Failed to load languages. Please try again later.'
          });
        }
      }
    }),
    {
      name: 'language-storage',
      partialize: (state) => ({
        selectedLanguage: state.selectedLanguage,
      }),
    }
  )
);

// Initialize languages when the app loads
if (typeof window !== 'undefined') {
  // Only run in browser environment
  useLanguageStore.getState().fetchLanguages();
}
