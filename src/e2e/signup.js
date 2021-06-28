const {
  openBrowser,
  goto,
  click,
  textBox,
  into,
  write,
  timeField,
  closeBrowser,
} = require("taiko");

const assert = require("assert").strict;

(async () => {
  try {
    await openBrowser();
    await goto("localhost:4200");
    await click("Iscriviti");
    await write("Test", into(textBox("Nome")));
    await write("Test", into(textBox("Cognome")));
    await write("12051997", into(timeField("Data di nascita")));
    await write("test@test.it", into(textBox("E-mail")));
    await write("Test123@", into(textBox("Password")));
    await write("Test123@", into(textBox("Conferma Password")));
    await write(
      "0xEd1bB395f00B22454c22B6c76b645657c739D3cc",
      into(textBox("Indirizzo wallet"))
    );
    await click("Registrati");
    await assert.ok(await text("Le mie").exists());
  } catch (error) {
    console.error(error);
  } finally {
    await closeBrowser();
  }
})();
