const { openBrowser, goto, click, textBox, into, write, clear, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("localhost:4200");
        await click("Login");
        await write("Test123@", into(textBox("Password")));
        await write("test@test.it", into(textBox("E-mail")));
        await click("Login");
        await click("Ciao");
        await click("Le mie opere");
        await click("Modifica dati");
        await clear(textBox("Nome"));
        await write("Test", into(textBox("Nome")));
        await write("Test123@", into(textBox("Password")));
        await click("Salva");
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
