// Storage Mock
export function storageMock() {
  const storage = {};

  return {
    setItem (key: string, value: any) {
      storage[key] = value || '';
    },

    getItem (key: string) {
      return key in storage ? storage[key] : null;
    },

    removeItem (key) {
      delete storage[key];
    },

    get length() {
      return Object.keys(storage).length;
    },

    key (i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}
