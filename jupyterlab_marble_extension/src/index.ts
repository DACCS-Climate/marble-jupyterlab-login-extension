import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
    INotebookTracker,
    NotebookActions
} from '@jupyterlab/notebook'


/**
 * Initialization data for the jupyterlab-marble-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-marble-extension:plugin',
  description: 'A JupyterLab extension that gets the session of the marble node',
  autoStart: true,
  requires: [INotebookTracker],
  optional: [],
  activate: (app: JupyterFrontEnd, notebookTracker: INotebookTracker) => {
    console.log('JupyterLab extension jupyterlab-marble-extension is activated!');


    const { commands } = app;

    const command = 'jupyterlab-marble-extension:command';

    commands.addCommand(command, {
        label: 'Get Marble Session',
      caption: 'Get Marble Session',
        execute: async (args: any) => {
        const current = notebookTracker.currentWidget;
        const notebook = current!.content;
        NotebookActions.insertAbove(notebook);


        const activeCell = notebook.activeCell;


        activeCell!.model.sharedModel.setSource('import sys' +
            '\n!{sys.executable} -m pip install marble_client' +
            '\nfrom marble_client import MarbleClient' +
            '\nclient = MarbleClient()' +
            '\nprint(client.this_node)' +
            '\nsession = requests.Session()' +
            '\nclientSession = this_session(session)' +
            '\nprint(client)')




        const cellReturn = await NotebookActions.runCells(notebook, [activeCell!]);
        console.log("activeCell")
        console.log(activeCell)
        console.log("cellReturn")
        console.log(cellReturn)

          NotebookActions.runAndAdvance(notebook)
          NotebookActions.selectLastRunCell(notebook);

          NotebookActions.showAllCode(notebook)
          //NotebookActions.toggleAllLineNumbers(notebook);


            //const cellOutput = activeCell.runCell();
        /*"cells" : [
    {
      "cell_type" : "code",
      "execution_count": null,
      "metadata" : {},
      "source" : "[some multi-line code]",
      "outputs": [],
    }
  ]*/





      }

});

    // Call the command execution
    commands.execute(command, { origin: 'init' }).catch(reason => {
console.error(
        `An error occurred during the execution of jupyterlab-marble-extension:command.\n${reason}`
      );

    });



  }
};

export default plugin;
