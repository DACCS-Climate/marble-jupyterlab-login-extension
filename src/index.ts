//Adds buttons to launcher panel
import {
 // ILauncher
} from '@jupyterlab/launcher'

import {

  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';



// src/index.ts#L9-L38

const extension: JupyterFrontEndPlugin<void> = {
  id: 'commands',
  description: 'Minimal JupyterLab example creating a new command.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    const { commands } = app;

    const command = 'jlab-examples:command';

    // Add a command
    commands.addCommand(command, {
      label: 'Execute jlab-examples:command Command',
      caption: 'Execute jlab-examples:command Command',
      execute: (args: any) => {
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
  }
};




//export default plugin;
export default extension;
