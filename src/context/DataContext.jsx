import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import defaultScholarships from '../data/scholarships.json';
import defaultPrograms from '../data/programs.json';

const DataContext = createContext(null);

const SCHOLARSHIPS_KEY = 'pcrh-scholarships';
const PROGRAMS_KEY = 'pcrh-programs';
const LAST_MODIFIED_KEY = 'pcrh-last-modified';

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error(`Failed to load ${key} from localStorage:`, e);
  }
  return fallback;
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(LAST_MODIFIED_KEY, new Date().toISOString());
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage:`, e);
  }
}

export function DataProvider({ children }) {
  const [scholarships, setScholarships] = useState(() =>
    loadFromStorage(SCHOLARSHIPS_KEY, defaultScholarships)
  );
  const [programs, setPrograms] = useState(() =>
    loadFromStorage(PROGRAMS_KEY, defaultPrograms)
  );
  const [lastModified, setLastModified] = useState(() =>
    localStorage.getItem(LAST_MODIFIED_KEY) || null
  );

  useEffect(() => {
    setLastModified(localStorage.getItem(LAST_MODIFIED_KEY) || null);
  }, [scholarships, programs]);

  // Scholarship CRUD
  const addScholarship = useCallback((scholarship) => {
    const newItem = { ...scholarship, id: generateId('sch') };
    setScholarships((prev) => {
      const updated = [...prev, newItem];
      saveToStorage(SCHOLARSHIPS_KEY, updated);
      return updated;
    });
    return newItem;
  }, []);

  const updateScholarship = useCallback((id, updates) => {
    setScholarships((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...updates, id } : s));
      saveToStorage(SCHOLARSHIPS_KEY, updated);
      return updated;
    });
  }, []);

  const deleteScholarship = useCallback((id) => {
    setScholarships((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveToStorage(SCHOLARSHIPS_KEY, updated);
      return updated;
    });
  }, []);

  // Program CRUD
  const addProgram = useCallback((program) => {
    const newItem = { ...program, id: generateId('prog') };
    setPrograms((prev) => {
      const updated = [...prev, newItem];
      saveToStorage(PROGRAMS_KEY, updated);
      return updated;
    });
    return newItem;
  }, []);

  const updateProgram = useCallback((id, updates) => {
    setPrograms((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updates, id } : p));
      saveToStorage(PROGRAMS_KEY, updated);
      return updated;
    });
  }, []);

  const deleteProgram = useCallback((id) => {
    setPrograms((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveToStorage(PROGRAMS_KEY, updated);
      return updated;
    });
  }, []);

  // Export data as JSON file download
  const exportData = useCallback(() => {
    const data = {
      scholarships,
      programs,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pcrh-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [scholarships, programs]);

  // Import data from JSON file
  const importData = useCallback((jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (parsed.scholarships && Array.isArray(parsed.scholarships)) {
        setScholarships(parsed.scholarships);
        saveToStorage(SCHOLARSHIPS_KEY, parsed.scholarships);
      }
      if (parsed.programs && Array.isArray(parsed.programs)) {
        setPrograms(parsed.programs);
        saveToStorage(PROGRAMS_KEY, parsed.programs);
      }
      return { success: true };
    } catch (e) {
      console.error('Failed to import data:', e);
      return { success: false, error: e.message };
    }
  }, []);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(SCHOLARSHIPS_KEY);
    localStorage.removeItem(PROGRAMS_KEY);
    localStorage.removeItem(LAST_MODIFIED_KEY);
    setScholarships(defaultScholarships);
    setPrograms(defaultPrograms);
    setLastModified(null);
  }, []);

  return (
    <DataContext.Provider
      value={{
        scholarships,
        programs,
        lastModified,
        addScholarship,
        updateScholarship,
        deleteScholarship,
        addProgram,
        updateProgram,
        deleteProgram,
        exportData,
        importData,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
