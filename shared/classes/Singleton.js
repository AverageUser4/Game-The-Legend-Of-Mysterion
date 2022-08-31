class Singleton {

  static hasInstance = false;

  constructor() {
    if(this.constructor.hasInstance)
      throw new Error('Only one instance of this object can exist.');

    this.constructor.hasInstance = true;
  }

}