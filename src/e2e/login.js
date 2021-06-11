const {
  openBrowser,
  goto,
  click,
  textBox,
  into,
  write,
  closeBrowser,
} = require("taiko");

const assert = require("assert").strict;

(async () => {
  try {
    await openBrowser();
    await goto("localhost:4200");
    await click("Login");
    await write("test@test.it", into(textBox("E-mail")));
    await write("Test123@", into(textBox("Password")));
    await click("Login");
    await assert.ok(await text("Ciao").exists());
  } catch (error) {
    console.error(error);
  } finally {
    await closeBrowser();
  }
})();
