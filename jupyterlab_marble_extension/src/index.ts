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
        label: 'Marble Session Cell',
        caption: 'Marble Session Cell',
        execute: async (args: any) => {
        const current = notebookTracker.currentWidget;
        const notebook = current!.content;
        NotebookActions.insertAbove(notebook);

        const activeCell = notebook.activeCell;

        activeCell!.model.sharedModel.setSource('import sys' +
            '\nimport requests' +
            '\nimport getpass' +
            '\nimport ipywidgets' +
            '\nfrom IPython.display import display ' +
            '\n ' +
            '\ntry:' +
            '\n from marble_client import MarbleClient' +
            '\nexcept:' +
            '\n !{sys.executable} -m pip install marble_client' +
            '\n ' +
            '\nfrom marble_client import MarbleClient' +
            '\nfrom marble_client.exceptions import JupyterEnvironmentError' +
            '\n ' +
            '\ntry:' +
            '\n session = MarbleClient().this_session()' +
            '\nexcept JupyterEnvironmentError:' +
            '\n ' +
            '\n nodeIDList = ["Node ID"]' +
            '\n selectedNode = ""' +
            '\n usernameValue = ""' +
            '\n passwordValue = ""' +
            '\n payload = {"credentials":{}}' +
            '\n nodes = MarbleClient().nodes' +
            '\n ' +
            '\n for node in nodes:' +
            '\n     nodeIDList.append(nodes[node].id)' +
            '\n ' +
            '\n nodeDropdown = ipywidgets.Dropdown(options=nodeIDList, description="Select the node you want to log in to:")' +
            '\n nodeDropdownOutput = ipywidgets.Output()' +
            '\n usernameWidget = ipywidgets.Text( placeholder="",  description="Enter your username:", disabled=False)   ' +
            '\n usernameOutput = ipywidgets.Output()' +
            '\n passwordWidget = ipywidgets.Password(placeholder="", description="Enter your password:", disabled=False)' +
            '\n passwordOutput = ipywidgets.Output()' +
            '\n ' +
            '\n submitButton = ipywidgets.Button(description="Submit", disabled=False,button_style="", tooltip="Submit", icon="" )' +
            '\n ' +

            '\n file = open("../images/green_checkmark.png", "rb")' +
            '\n image = file.read()' +
            '\n loginSuccessIconWidget = ipywidgets.Image(value=image, format="png", width=32, height=32)' +
            '\n loginSuccessBoxWidget = ipywidgets.Box[ipywidgets.Label("Login Successful"), loginSuccessIconWidget, ]' +
            '\n @nodeDropdownOutput.capture()' +
            '\n def nodeDropdownChoice(change):' +
            '\n     with nodeDropdownOutput:' +
            '\n         payload["selectedNode"] = change["new"]' +
            '\n ' +
            '\n @usernameOutput.capture()' +
            '\n def getUsernameInput(change):' +
            '\n     with usernameOutput:' +
            '\n         payload["credentials"]["user_name"] =  change["new"];' +
            '\n ' +
            '\n @passwordOutput.capture()' +
            '\n def getPasswordInput(change):' +
            '\n     with passwordOutput:' +
            '\n         payload["credentials"]["password"] =  change["new"];' +
            '\n ' +
            '\n def submit(arg1):' +
            '\n     url = MarbleClient()[payload["selectedNode"]].url + "/magpie/signin" ' +
            '\n     response = requests.post(url, headers={"Content-Type": "application/json"}, json=payload["credentials"])' +
            //'\n     print(response)' +
            '\n     if("200" in str(response)):' +
            '\n         passwordOutput.clear_output()' +
            '\n         display(loginSuccessBoxWidget)' +
            '\n         #print("Logged into " + payload["selectedNode"] + " successfully.")' +
            '\n     else:' +
            '\n         print("Error logging in")' +
            '\n ' +
            '\n display(nodeDropdown, nodeDropdownOutput)' +
            '\n nodeDropdown.observe(nodeDropdownChoice, names="value")' +
            '\n ' +
            '\n display(usernameWidget, usernameOutput)' +
            '\n usernameWidget.observe(getUsernameInput, names="value")' +
            '\n ' +
            '\n display(passwordWidget, passwordOutput)' +
            '\n passwordWidget.observe(getPasswordInput, names="value")' +
            '\n ' +
            '\n display(submitButton)' +
            '\n submitButton.on_click(submit)'
            )
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



//Metadata form example
// src/index.ts#L17-L23

const simple: JupyterFrontEndPlugin<void> = {
  id: '@jupyterlab-examples/metadata-form:simple',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('Simple metadata-form example activated');
  }
};

export default [plugin,simple];