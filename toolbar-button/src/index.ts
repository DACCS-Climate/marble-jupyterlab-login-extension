import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook'

/**
 * The plugin registration information.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@jupyterlab-examples/toolbar-button:plugin',
  description:
    'A JupyterLab extension adding a button to the Notebook toolbar.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    const { commands } = app;
    const command = 'birdhouse:marble-session-cell';
    commands.addCommand(command, {
      label: 'Marble Session',
      caption: 'Marble Session',
      execute: (args: any) => {
        const current = tracker.currentWidget;
        const notebook = current!.content;
        notebook.activeCell!.model.sharedModel.setSource("from marble_client import MarbleClient\nsession = MarbleClient().this_session()");
      }
    })
  }
};

/**
 * Export the plugin as default.
 */
export default plugin;
 