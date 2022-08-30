class StorageManager {

  static hasInstance = false;

  constructor() {
    if(StorageManager.hasInstance)
      throw new Error(`You mustn't initialise new StorageManager`);

    StorageManager.hasInstance = true;
  }

}

const save = new SaveManager();

// known family size shows wrong number