import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the jupyterlab-marble-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-marble-extension:plugin',
  description: 'A JupyterLab extension that gets the session of the marble node',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension jupyterlab-marble-extension is activated!');


    const { commands } = app;

    const command = 'jupyterlab-marble-extension:command';

commands.addCommand(command, {
  label: 'Execute jlab-examples:command Command',
      caption: 'Execute jlab-examples:command Command',
execute: (args: any) => {
      const current = notebookTracker.currentWidget;
    const notebook = current.content;
    NotebookActions.insertBelow(notebook);
    const activeCell = notebook.activeCell;

        const orig = args['origin'];
        console.log(`jlab-examples:command has been called from ${orig}.`);
        if (orig !== 'init') {
          window.alert(`jlab-examples:command has been called from ${orig}.`);
        }
      }

});

    // Call the command execution
    commands.execute(command, { origin: 'init' }).catch(reason => {
console.error(
        `An error occurred during the execution of jlab-examples:command.\n${reason}`
      );

    });

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('jupyterlab-marble-extension settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for jupyterlab-marble-extension.', reason);
        });
    }

  }
};

export default plugin;
