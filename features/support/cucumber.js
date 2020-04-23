import { After } from 'cucumber';

After(function() {
  if (this.driver) {
    return this.driver.quit().then((resp) => {
      this.driver = null;
      return resp;
    });
  }

  return null;
});
