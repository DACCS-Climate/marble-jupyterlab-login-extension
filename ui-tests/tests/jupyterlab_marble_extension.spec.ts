import { test } from '@jupyterlab/galata';
import { expect } from '@playwright/test';
/**
 * Don't load JupyterLab webpage before running the tests.
 * This is required to ensure we capture all log messages.
 */
test.use({ autoGoto: false });

test('should emit an activation console message', async ({ page }) => {
  const logs: string[] = [];

  page.on('console', message => {
    logs.push(message.text());
  });

  await page.goto();

  expect(
    logs.filter(
      s =>
        s === 'JupyterLab extension jupyterlab-marble-extension is activated!'
    )
  ).toHaveLength(1);
});

/*
test('marble-login command should be called', async() =>{

})
*/
/*
test('should add a code cell at the top of the current notebook', async() =>{
  //await page.notebook.addCell('code')
  expect(await getCellType(0)).toBe('code');

})
*/
/*
test('new notebook created', async ({ page, tmpPath }) => {
  const newNotebook = 'create_test.ipynb';
  await page.notebook.createNew(newNotebook);

  expect(
    await page.waitForSelector(`[role="main"] >> text=${newNotebook}`)
  ).toBeTruthy();

  expect(await page.contents.fileExists(`${tmpPath}/${newNotebook}`)).toEqual(
    true
  );

  //expect(await getToolbarItemByIndex(10))
});
*/

/*
test('the added code cell should contain code/strings of code', async({page}) =>{
  //const notebook = "Untitled.ipynb";
  expect(await page.notebook.getCellIndex(0)).expect.anything()
})


*/
