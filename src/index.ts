//import MarbleClient


/*JupyterLab imports*/
import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

//Adds buttons to launcher panel
import {
  ILauncher
} from '@jupyterlab/launcher'

import {
  DocumentRegistry
} from "@jupyterlab/docregistry";

import {
  INotebookModel,
  NotebookPanel
} from "@jupyterlab/notebook";

import {
  IDisposable
} from "@lumino/disposable";

import {
  ToolbarButton,
  ICommandPalette,
  IToolbarWidgetRegistry
} from '@jupyterlab/apputils';

// MainAreaWidget,
//  WidgetTracker
/*
import {
  Widget,
    Menu,
    MenuBar
} from '@lumino/widgets';
*/
/*
interface sessionResponse {
  cookie: string;
  url: string;
};
*/

/*
class sessionWidget extends Widget{
  constructor(){
    super();
  }

  def getSessionCookie(){
    client = MarbleClient();
  }

  async getSessionCookie(){

  }

}
*/

class ToolbarExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    // Create the toolbar button
    let mybutton = new ToolbarButton({
      label: 'My Button',
      onClick: () => alert('You did it!')
    });

    // Add the toolbar button to the notebook toolbar
    panel.toolbar.insertItem(10, 'mybutton', mybutton);

    // The ToolbarButton class implements `IDisposable`, so the
    // button *is* the extension for the purposes of this method.
    return mybutton;
  }
}



function activate(app: JupyterFrontEnd, palette:ICommandPalette, restorer: ILayoutRestorer| null, launcher: ILauncher,
                  toolbarRegistry: IToolbarWidgetRegistry){
 console.log('JupyterLab extension jupyterlab_marble is activated!');


const toolbarButton = new ToolbarExtension();

app.docRegistry.addWidgetExtension('Notebook', toolbarButton);
}


/**
 * Initialization data for the jupyterlab_marble extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_marble:plugin',
  description: 'A JupyterLab extension that allows a user access to a marble node or allowthem to log in.',
  autoStart: true,
  requires: [ICommandPalette],
  optional: [ILayoutRestorer, ILauncher],
  activate: activate
};

export default plugin;
