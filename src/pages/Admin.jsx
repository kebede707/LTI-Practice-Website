import { useState, useRef, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Save,
  X,
  Search,
} from 'lucide-react';

// ─── Login Form ──────────────────────────────────────────────────────────────

function LoginForm() {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
              <Lock className="w-7 h-7 text-primary-600" />
            </div>
          </div>
          <h1 className="text-xl font-display font-bold text-center text-gray-900 mb-1">
            Admin Access
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter the administrator password to continue.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirmation Modal ───────────────────────────────────────────────

function DeleteModal({ itemName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-display font-semibold text-gray-900">Delete Item</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-gray-900">{itemName}</span>? This action cannot be
          undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Reset Confirmation Modal ────────────────────────────────────────────────

function ResetModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-display font-semibold text-gray-900">Reset to Defaults</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          This will discard all your changes and revert scholarships and programs back to the
          original data files. Are you sure?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Scholarship Form ────────────────────────────────────────────────────────

const EMPTY_SCHOLARSHIP = {
  name: '',
  amount: '',
  frequency: '',
  description: '',
  eligibility: '',
  gradeLevels: [],
  deadline: '',
  season: '',
  applicationRequirements: '',
  website: '',
  tags: '',
};

const EMPTY_PROGRAM = {
  name: '',
  organization: '',
  description: '',
  eligibility: '',
  gradeLevels: [],
  season: '',
  duration: '',
  cost: '',
  deadline: '',
  website: '',
  category: '',
  tags: '',
};

const SEASON_OPTIONS = ['Fall', 'Winter', 'Spring', 'Summer', 'Year-Round'];
const PROGRAM_CATEGORIES = ['Academic', 'STEM', 'Leadership', 'Mentorship', 'Arts', 'Community Service', 'Other'];
const GRADE_OPTIONS = [9, 10, 11, 12];

function ItemForm({ type, initialData, onSave, onCancel }) {
  const isScholarship = type === 'scholarships';
  const emptyForm = isScholarship ? EMPTY_SCHOLARSHIP : EMPTY_PROGRAM;

  const [form, setForm] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags || '',
        applicationRequirements: isScholarship
          ? Array.isArray(initialData.applicationRequirements)
            ? initialData.applicationRequirements.join(', ')
            : initialData.applicationRequirements || ''
          : undefined,
      };
    }
    return { ...emptyForm };
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleGrade = (grade) => {
    setForm((prev) => {
      const grades = prev.gradeLevels.includes(grade)
        ? prev.gradeLevels.filter((g) => g !== grade)
        : [...prev.gradeLevels, grade].sort();
      return { ...prev, gradeLevels: grades };
    });
    if (errors.gradeLevels) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.gradeLevels;
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (form.gradeLevels.length === 0) newErrors.gradeLevels = 'Select at least one grade level';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const tagsArray = form.tags
      ? form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const data = { ...form, tags: tagsArray };

    if (isScholarship && typeof data.applicationRequirements === 'string') {
      data.applicationRequirements = data.applicationRequirements
        ? data.applicationRequirements
            .split(',')
            .map((r) => r.trim())
            .filter(Boolean)
        : [];
    }

    // Remove undefined fields
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) delete data[key];
    });

    onSave(data);
  };

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
  const errorClass = 'text-xs text-red-600 mt-1';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-lg text-gray-900">
            {initialData ? 'Edit' : 'Add'} {isScholarship ? 'Scholarship' : 'Program'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`${inputClass} ${errors.name ? 'border-red-400' : ''}`}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          {/* Scholarship-specific: Amount & Frequency */}
          {isScholarship && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Amount</label>
                <input
                  type="text"
                  value={form.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  className={inputClass}
                  placeholder="e.g., $5,000"
                />
              </div>
              <div>
                <label className={labelClass}>Frequency</label>
                <input
                  type="text"
                  value={form.frequency}
                  onChange={(e) => handleChange('frequency', e.target.value)}
                  className={inputClass}
                  placeholder="e.g., One Time, Per Year"
                />
              </div>
            </div>
          )}

          {/* Program-specific: Organization */}
          {!isScholarship && (
            <div>
              <label className={labelClass}>Organization</label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => handleChange('organization', e.target.value)}
                className={inputClass}
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className={labelClass}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`${inputClass} resize-y ${errors.description ? 'border-red-400' : ''}`}
            />
            {errors.description && <p className={errorClass}>{errors.description}</p>}
          </div>

          {/* Eligibility */}
          <div>
            <label className={labelClass}>Eligibility</label>
            <textarea
              rows={2}
              value={form.eligibility}
              onChange={(e) => handleChange('eligibility', e.target.value)}
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Grade Levels */}
          <div>
            <label className={labelClass}>
              Grade Levels <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 mt-1">
              {GRADE_OPTIONS.map((grade) => (
                <label
                  key={grade}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition ${
                    form.gradeLevels.includes(grade)
                      ? 'bg-primary-50 border-primary-400 text-primary-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.gradeLevels.includes(grade)}
                    onChange={() => toggleGrade(grade)}
                    className="sr-only"
                  />
                  Grade {grade}
                </label>
              ))}
            </div>
            {errors.gradeLevels && <p className={errorClass}>{errors.gradeLevels}</p>}
          </div>

          {/* Deadline & Season */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Deadline</label>
              <input
                type="text"
                value={form.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                className={inputClass}
                placeholder="e.g., 2026-05-31 or Rolling"
              />
            </div>
            <div>
              <label className={labelClass}>Season</label>
              <select
                value={form.season}
                onChange={(e) => handleChange('season', e.target.value)}
                className={inputClass}
              >
                <option value="">Select season</option>
                {SEASON_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Program-specific: Duration, Cost, Category */}
          {!isScholarship && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Duration</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., 6 weeks"
                  />
                </div>
                <div>
                  <label className={labelClass}>Cost</label>
                  <input
                    type="text"
                    value={form.cost}
                    onChange={(e) => handleChange('cost', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Free, $500"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select category</option>
                  {PROGRAM_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Scholarship-specific: Application Requirements */}
          {isScholarship && (
            <div>
              <label className={labelClass}>Application Requirements</label>
              <textarea
                rows={2}
                value={form.applicationRequirements}
                onChange={(e) => handleChange('applicationRequirements', e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Comma-separated, e.g., Online application, Transcript, Essay"
              />
            </div>
          )}

          {/* Website */}
          <div>
            <label className={labelClass}>Website</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className={labelClass}>Tags</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              className={inputClass}
              placeholder="Comma-separated, e.g., stem, colorado, merit"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {initialData ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard() {
  const { logout } = useAuth();
  const {
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
  } = useData();

  const [activeTab, setActiveTab] = useState('scholarships');
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [importMessage, setImportMessage] = useState(null);
  const fileInputRef = useRef(null);

  const items = activeTab === 'scholarships' ? scholarships : programs;

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  }, [items, searchQuery]);

  const handleAdd = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleFormSave = (data) => {
    if (activeTab === 'scholarships') {
      if (editingItem) {
        updateScholarship(editingItem.id, data);
      } else {
        addScholarship(data);
      }
    } else {
      if (editingItem) {
        updateProgram(editingItem.id, data);
      } else {
        addProgram(data);
      }
    }
    setFormOpen(false);
    setEditingItem(null);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    if (activeTab === 'scholarships') {
      deleteScholarship(deleteTarget.id);
    } else {
      deleteProgram(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = importData(ev.target.result);
      if (result.success) {
        setImportMessage({ type: 'success', text: 'Data imported successfully.' });
      } else {
        setImportMessage({ type: 'error', text: `Import failed: ${result.error}` });
      }
      setTimeout(() => setImportMessage(null), 4000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetConfirm = () => {
    resetToDefaults();
    setShowResetModal(false);
  };

  const formatGrades = (grades) => {
    if (!grades || grades.length === 0) return '---';
    return grades.sort((a, b) => a - b).join(', ');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage scholarships and programs for the Pre-Collegiate Resource Hub.
          </p>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => {
            setActiveTab('scholarships');
            setSearchQuery('');
          }}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition cursor-pointer ${
            activeTab === 'scholarships'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Scholarships
          <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
            {scholarships.length}
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab('programs');
            setSearchQuery('');
          }}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition cursor-pointer ${
            activeTab === 'programs'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Programs
          <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
            {programs.length}
          </span>
        </button>
      </div>

      {/* Toolbar: Search + Add */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Item Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">
                  Grades
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">
                  Deadline
                </th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-400">
                    {searchQuery
                      ? 'No items match your search.'
                      : `No ${activeTab} found.`}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 line-clamp-1">{item.name}</div>
                      {activeTab === 'scholarships' && item.amount && (
                        <div className="text-xs text-gray-500 mt-0.5">{item.amount}</div>
                      )}
                      {activeTab === 'programs' && item.organization && (
                        <div className="text-xs text-gray-500 mt-0.5">{item.organization}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {item.gradeLevels?.sort((a, b) => a - b).map((g) => (
                          <span
                            key={g}
                            className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 px-2 py-0.5 text-xs font-medium"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                      {item.deadline || '---'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h2 className="font-display font-semibold text-gray-900 mb-1">Data Management</h2>
        <p className="text-sm text-gray-500 mb-4">Export, import, or reset your data.</p>

        {importMessage && (
          <div
            className={`mb-4 px-4 py-2.5 rounded-lg text-sm ${
              importMessage.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {importMessage.text}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportData}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button
            onClick={handleImportClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Import Data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => setShowResetModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-700 bg-white border border-amber-300 hover:bg-amber-50 rounded-lg transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Reset to Defaults
          </button>
        </div>

        {lastModified && (
          <p className="text-xs text-gray-400 mt-4">
            Last modified: {new Date(lastModified).toLocaleString()}
          </p>
        )}
      </div>

      {/* Modals */}
      {formOpen && (
        <ItemForm
          type={activeTab}
          initialData={editingItem}
          onSave={handleFormSave}
          onCancel={() => {
            setFormOpen(false);
            setEditingItem(null);
          }}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          itemName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {showResetModal && (
        <ResetModal
          onConfirm={handleResetConfirm}
          onCancel={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
}

// ─── Admin Page ──────────────────────────────────────────────────────────────

export default function Admin() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <LoginForm />;
}
