class Storage {
  constructor() {

  }

  get(key) {
    return sessionStorage.getItem(key);
  }

  set(key, value) {
    return sessionStorage.setItem(key, value);
  }

  remove(key) {
    return sessionStorage.removeItem(key);
  }
};

export default new Storage();
