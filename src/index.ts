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
  //ToolbarButton
  //WidgetTracker,
  //IToolbarWidgetRegistry,
  //MainAreaWidget
} from '@jupyterlab/apputils';
/*
import {
    PartialJSONObject
} from '@lumino/coreutils';
*/
/*
import {
  Widget
} from '@lumino/widgets';
*/
/*
import {
  DocumentRegistry
} from "@jupyterlab/docregistry";

import {
  IDisposable
} from "@lumino/disposable";
*/
import {
    INotebookModel,
    INotebookTracker,
    Notebook,
    // NotebookPanel
    NotebookActions,
    //NotebookModel,
    NotebookPanel
} from '@jupyterlab/notebook';

import {
    IDocumentManager
} from '@jupyterlab/docmanager'
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
interface sessioniCellContent {
    notebook: Notebook;
    context: DocumentRegistry.IContext<INotebookModel>;
    docManager: IDocumentManager;
};
*/
/*
export interface INotebookContent extends PartialJSONObject {

  nbformat: Array[{
      cellType: string,
      executionCount: null,
      cellID: string,
      cellMetadata: object,
      cellOutputs: any,
      cellSource: any
  }];
  //cells: ICell[];

}
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
           //console.log(notebookTracker.currentWidget)
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

    console.log(notebookTracker)
  console.log('JupyterLab extension jupyterlab_apod is activated!');


 // const toolbarButton = new ToolbarExtension();
  //toolbarButton.createNew(nbPanel, notebookTracker, notebookmodel)
  //app.docRegistry.addWidgetExtension('Notebook', toolbarButton);

/*
  const getSessionCommand = 'marble:command';
      commands.addCommand(getSessionCommand,{
      label: 'Get Session',
      caption: 'Get Session',
      execute:() => {
          //const toolbarButton = new ToolbarExtension();
          //app.docRegistry.addWidgetExtension('Notebook', toolbarButton);
      }


  })*/


/*
               const current = notebookTracker.currentWidget;
        const notebook = current!.content;
        NotebookActions.insertBelow(notebook);
        const activeCell = notebook.activeCell;
        activeCell!.model.sharedModel.setSource('my content');
        //return activeCell;

    */

    //const services = app.serviceManager
    //await services.ready;
    //const kernelspecs = services.kernelspecs;
    // Note: add null handling - should not use ! in production
    //const kernels = Object.keys(kernelspecs.specs!.kernelspecs!);


/*
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
    */


    const nbPanel: NotebookPanel = await app.commands.execute(
    'notebook:create-new',
    { kernelName: 'python3', activate: true }
    );

    console.log("created notebook");
    console.log(nbPanel);

console.log('notebookTracker.currentWidget')
console.log(notebookTracker.activeCell)


/*

    const cellContentJSON = {
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
*/






   // const cellContent = cellContentJSON as INotebookContent
/*
    const newNotebookModel = new NotebookModel();
     newNotebookModel.fromJSON(cellContent) as sessioniCellContent

    nbPanel.content.model = newNotebookModel
    */

    //const currentNotebook = notebookTracker.currentWidget;
   // const newNotebookContent = nbPanel.content;
   // console.log("newNotebookontent");
   // console.log(newNotebookContent)

    const newNotebookModelContent = nbPanel.content;
        console.log("newNotebookontent");
    console.log(newNotebookModelContent)

        const newNotebookModelModel = nbPanel.model;
        console.log("newNotebookModelModel");
    console.log(newNotebookModelModel)
/*
    const codeCellContent = {
        cell_type: 'code',
    source: ['from marble_client import MarbleClient', 'client = MarbleClient()'],
    trusted: true
}
*/
/*
const iCodeCellOptions = {
        model: ICodeCellModel
}*/


/*
const codeCell = newNotebookModelContent.contentFactory.createCodeCell({
cell:{
    cell_type: 'code',
    metadata: {},
    source: ['some code line 1', 'some code line 2'],
    trusted: true
}

})
*/

     //const newNotebookCodeCell = notebook.contentFactory.createCodeCell(codeCellContent)



   // const newCell = newNotebookContent.contentFactory.createCodeCell(codeCell)

    //const newNotebookModel = nbPanel.model;

   // newNotebookContent.activeCellIndex = 0;



    NotebookActions.insertBelow(newNotebookModelContent);

    console.log("notebook after adding cell")
    console.log(newNotebookModelContent)

    newNotebookModelContent.activeCell!.model.sharedModel.setSource('test')
        console.log("active cell")
    console.log(newNotebookModelContent.activeCell)
   // const cellList = newNotebookModelContent.model?.cells
        //cellList.insert(cells.length, [codeCellContent])
   // newNotebookModelModel!.sharedModel.insertCells(1, [codeCellContent])



    //NotebookActions.insertBelow(newNotebookContent);
    //newNotebookContent.activeCell!.model.sharedModel.setSource('my content')
   // console.log("newNotebookontent setSource");
   // console.log(newNotebookContent)
    //const activeCell = newNotebookContent.activeCell;
   // console.log("activeCell");
   // console.log(activeCell)
   // activeCell!.model.sharedModel.setSource('my content')

/*
    this._tracker.currentWidget?.model?.contentFactory.createCodeCell({
        cell: { cell_type: 'code', source: [ `print(\'hello\')`, ], metadata: {}, }
    })

    */
/*
     const cell = this._notebookPanel.content.model.contentFactory.createCell(
      this._notebookPanel.content.notebookConfig.defaultCell,
      {}
    );

    this._notebookPanel.content.model.cells.insert(0, cell);
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

