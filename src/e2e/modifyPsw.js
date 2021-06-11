const { openBrowser, goto, click, textBox, into, write, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("localhost:4200");
        await click("Login");
        await write("test@test.it", into(textBox("E-mail")));
        await write("Test123@", into(textBox("Password")));
        await click("Login");
        await click("Ciao");
        await click("Le mie opere");
        await click("Modifica password");
        await write("Test123@", into(textBox("Password attuale")));
        await write("Test123@123", into(textBox("Nuova password")));
        await write("Test123@123", into(textBox("Conferma password")));
        await click("Salva");
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
