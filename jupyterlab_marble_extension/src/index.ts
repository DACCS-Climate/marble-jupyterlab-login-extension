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
            '\n nodeDropdownLabelWidget = ipywidgets.Label(value="Select the node you want to log in to:", style={"font_family":"Helvetica Neue","font_size":"16px", "text_color":"RoyalBlue"})' +
            '\n nodeDropdownWidget = ipywidgets.Dropdown(options=nodeIDList, style={"description_width":"initial"}) ' +
            '\n nodeDropdownBoxWidget = ipywidgets.VBox([nodeDropdownLabelWidget, nodeDropdownWidget])' +
            '\n nodeDropdownOutput = ipywidgets.Output()' +
            '\n ' +
            '\n usernameLabelWidget = ipywidgets.Label(value="Enter your username:", style={"font_family":"Helvetica Neue","font_size":"16px", "text_color":"RoyalBlue"})' +
            '\n usernameWidget = ipywidgets.Text( placeholder="", style={"description_width":"initial"}, disabled=False) ' +
            '\n usernameBoxWidget = ipywidgets.VBox([usernameLabelWidget, usernameWidget])' +
            '\n usernameOutput = ipywidgets.Output()' +
            '\n ' +
            '\n passwordLabelWidget = ipywidgets.Label(value="Enter your password:", style={"font_family":"Helvetica Neue","font_size":"16px", "text_color":"RoyalBlue"})' +
            '\n passwordWidget =  ipywidgets.Password(placeholder="", style={"description_width":"initial"}, disabled=False)' +
            '\n passwordBoxWidget = ipywidgets.VBox([passwordLabelWidget, passwordWidget])' +
            '\n passwordOutput = ipywidgets.Output()' +
            '\n ' +
            '\n submitButton = ipywidgets.Button(description="Submit", disabled=False,button_style="", tooltip="Submit", icon=""' +
            ', style={"font_family":"Helvetica Neue","font_size":"16px", "button_color":"RoyalBlue", "text_color":"white"} )' +
            '\n ' +
            '\n loginSuccessLabelWidget = ipywidgets.HBox([ipywidgets.Label("Login Successful", style={"text_color":"green", "font_size":"16px"})]) ' +
            '\n loginSuccessLabelOutputWidget = ipywidgets.Output()' +
            '\n loginFailedLabelWidget = ipywidgets.HBox([ipywidgets.Label("Error Logging In", style={"text_color":"red", "font_size":"16px"})])' +
            '\n ' +
            '\n def nodeDropdownChoice(change):' +
            '\n     with nodeDropdownOutput:' +
            '\n         payload["selectedNode"] = change["new"]' +
            '\n ' +
            '\n def getUsernameInput(change):' +
            '\n     with usernameOutput:' +
            '\n         payload["credentials"]["user_name"] =  change["new"];' +
            '\n ' +
            '\n def getPasswordInput(change):' +
            '\n     with passwordOutput:' +
            '\n         payload["credentials"]["password"] =  change["new"];' +
            '\n ' +
            '\n def submit(arg1):' +
            '\n     url = MarbleClient()[payload["selectedNode"]].url + "/magpie/signin" ' +
            '\n     response = requests.post(url, headers={"Content-Type": "application/json"}, json=payload["credentials"])' +
            '\n     if("200" in str(response)):' +
            '\n         passwordOutput.clear_output()' +
            '\n         with loginSuccessLabelOutputWidget:' +
            '\n             display(loginSuccessLabelWidget)' +
            '\n         print("Logged into " + payload["selectedNode"] + " successfully.")' +
            '\n     else:' +
            '\n         passwordOutput.clear_output()' +
            '\n         display(loginFailedlabelWidget)' +
            '\n         print("Error logging in")' +
            '\n ' +
            '\n display(nodeDropdownBoxWidget, nodeDropdownOutput)' +
            '\n nodeDropdownWidget.observe(nodeDropdownChoice, names="value")' +
            '\n ' +
            '\n display(usernameBoxWidget, usernameOutput)' +
            '\n usernameWidget.observe(getUsernameInput, names="value")' +
            '\n ' +
            '\n display(passwordBoxWidget, passwordOutput)' +
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


export default plugin;