//Adds buttons to launcher panel
import {
  ILauncher
} from '@jupyterlab/launcher'

import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette,
  //ToolbarButton,
  //WidgetTracker,
  //IToolbarWidgetRegistry,
  //MainAreaWidget
} from '@jupyterlab/apputils';
/*
import {
  Widget
} from '@lumino/widgets';
*/
/*
import {
  DocumentRegistry
} from "@jupyterlab/docregistry";
*/
import {
    INotebookModel,
    INotebookTracker,
    Notebook,
    // NotebookPanel
    NotebookActions, NotebookModel,
    NotebookPanel
} from "@jupyterlab/notebook";

import {
    IDocumentManager
} from "@jupyterlab/docmanager"
/*
import {
  IDisposable
} from "@lumino/disposable";

*/
/*
import {
    CodeCell
} from "@jupyterlab/cells"
*/
/*
interface APODResponse {
  copyright: string;
  date: string;
  explanation: string;
  media_type: 'video' | 'image';
  title: string;
  url: string;
};
*/
/*
interface sessionResponse {
  cookie: string;
  url: string;
};
*/

/*
class SessionCodeCell extends CodeCell{
    constructor() {
        super();

        this.addClass('my-session');
        this.cell = new CodeCell({
            cell: { cell_type: 'code',
                source: [ `print(\'hello\')`, ],
                metadata: {}, }
        })
    }
}
*/
/*
class APODWidget extends Widget {

  // Construct a new APOD widget.

  constructor() {
    super();

    this.addClass('my-apodWidget');


    // Add a summary element to the panel
    this.summary = document.createElement('p');
    this.node.appendChild(this.summary);
  }




  // The summary text element associated with the widget.

  readonly summary: HTMLParagraphElement;


  // Handle update requests for the widget.

  async updateAPODImage(): Promise<void> {

    const response = await fetch('https://redoak.cs.toronto.edu/magpie/session');

        if (!response.ok) {
          const data = await response.json();
          if (data.error) {
            this.summary.innerText = data.error.message;
          } else {
            this.summary.innerText = response.statusText;
          }
          return;
        }

    const data = await response.json() as APODResponse;
    this.summary.innerText = data.url;

  }

}
*/
/*
class ToolbarExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {

   createNew( nbPanel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable{
     const mybutton = new ToolbarButton({
       label: 'Get Session',
       onClick: () => {
         alert('Button clicked')
        //this.addCell()

        }

     });
      // Add the toolbar button to the notebook toolbar
    nbPanel.toolbar.insertItem(10, 'mybutton', mybutton);

    // The ToolbarButton class implements `IDisposable`, so the
    // button *is* the extension for the purposes of this method.
    return mybutton;

   }

}

*/

/**
* Activate the APOD widget extension.
*/
async function activate(app: JupyterFrontEnd, notebook: Notebook, notebookmodel: INotebookModel, docManager: IDocumentManager, notebookTracker: INotebookTracker, panel: NotebookPanel, palette: ICommandPalette, restorer: ILayoutRestorer | null, launcher: ILauncher) {
  console.log('JupyterLab extension jupyterlab_apod is activated!');


  //const toolbarButton = new ToolbarExtension();
  //toolbarButton.addItem()
  //app.docRegistry.addWidgetExtension('Notebook', toolbarButton);




/*
               const current = notebookTracker.currentWidget;
        const notebook = current!.content;
        NotebookActions.insertBelow(notebook);
        const activeCell = notebook.activeCell;
        activeCell!.model.sharedModel.setSource('my content');
        //return activeCell;

    */

    const services = app.serviceManager
    await services.ready;
    const kernelspecs = services.kernelspecs;
    // Note: add null handling - should not use ! in production
    const kernels = Object.keys(kernelspecs.specs!.kernelspecs!);

    const result = await app.commands.execute(
            'docmanager:new-untitled',
    { path: '.', type:'notebook' }
    );

    await app.commands.execute('docmanager:open',
    {
        path: result.path,
        factory: 'Notebook',
        kernel: {
          name: kernels[0]
        }}
    );

    const newNotebookContent = {
        cells: [
            {
            cell_type: 'code',
            execution_count: null,
            id: 'new-notebook-code-cell',
            metadata: {},
            outputs: [],
            source: ['print("hello world")']
            },
        ]
    }

    const newNotebookModel = new NotebookModel();
    newNotebookModel.fromJSON(newNotebookContent)

    const newNotebook = result.content;
    NotebookActions.insertBelow(newNotebook);
        const activeCell = newNotebook.activeCell;
        activeCell!.model.sharedModel.setSource('my content')


/*
const current = notebookTracker.currentWidget;

       const newNotebook = current!.content;
        NotebookActions.insertBelow(newNotebook);
        const activeCell = newNotebook.activeCell;
        activeCell!.model.sharedModel.setSource('my content')


*/


         // Define a widget creator function
    /*
  const newWidget = () => {
    const content = new APODWidget();
    const widget = new MainAreaWidget({content});
    widget.id = 'apod-jupyterlab';
    widget.title.label = 'Session Details';
    widget.title.closable = true;
    return widget;
  }
*/
  // Create a single widget
 // let widget = newWidget();

/*
  const sessionCommand: string = 'get:marble-session';
  app.commands.addCommand(sessionCommand, {
      label: 'Get Session',
      execute: () => {

          console.log('panel content');
          console.log(panel.content);
          const currentNotebook = notebookTracker;
          console.log('currentNotebook');
              console.log(currentNotebook);
           const current = notebookTracker.currentWidget;
           notebookTracker.currentChanged.connect((tracker, panel) => {
    console.log('panel');
              console.log(panel);
  });

          const newNotebook = new Notebook

        const notebook = current!.content;
        NotebookActions.insertBelow(notebook);
        const activeCell = notebook.activeCell;
        activeCell!.model.sharedModel.setSource('my content');
      }
  });
  */
 // app.commands.execute(sessionCommand);

             // Add an application command
  //const command: string = 'apod:open';
  /*
  app.commands.addCommand(command, {
    label: 'Random Astronomy Picture',
    execute: () => {
      // Regenerate the widget if disposed
     if (!widget || widget.isDisposed) {
        const content = new APODWidget();
        widget = new MainAreaWidget({content});
        widget.id = 'apod-jupyterlab';
        widget.title.label = 'Astronomy Picture';
        widget.title.closable = true;
      }

     if (!tracker.has(widget)) {
        // Track the state of the widget for later restoration
        tracker.add(widget);
      }


      if (!widget.isAttached) {
        // Attach the widget to the main work area if it's not there
        app.shell.add(widget, 'main');
      }
      // Refresh the picture in the widget
      widget.content.updateAPODImage();
      // Activate the widget
     app.shell.activateById(widget.id);


    }
  });
*/
   // Refresh the picture in the widget
    /*
      widget.content.updateAPODImage();
      // Activate the widget
      app.shell.activateById(widget.id);
*/


  // Add the command to the palette.
  //palette.addItem({ command, category: 'Tutorial' });


  // Track and restore the widget state
    /*
  let tracker = new WidgetTracker<MainAreaWidget<APODWidget>>({
    namespace: 'apod'
  });
*/


/*
  if (restorer) {
    restorer.restore(tracker, {
      command,
      name: () => 'apod'
    });
  }
  */
/*
  if(launcher){
    launcher.add({
      command,
      category: 'Extension Astronomy Examples',
      rank: 1
    });
  }
  */

}


const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_apod',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  optional: [ILayoutRestorer, ILauncher],
  activate: activate
};





export default plugin;

