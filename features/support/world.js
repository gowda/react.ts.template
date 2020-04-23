import { setWorldConstructor, setDefaultTimeout } from 'cucumber';

function CustomWorld() {
  this.driver = null;

  setDefaultTimeout(20000);
}

setWorldConstructor(CustomWorld);
