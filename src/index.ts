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
    const command = 'jupyterlab-marble-extension:marble_login';
    commands.addCommand(command, {
      label: 'Marble Session Cell',
      caption: 'Marble Session Cell',
      execute: async (args: any) => {
        const current = notebookTracker.currentWidget;
        const notebook = current!.content;
        NotebookActions.insertAbove(notebook);

        const activeCell = notebook.activeCell;

        activeCell!.model.sharedModel.setSource('import sys' +
          '\nimport ipywidgets' +
          '\nfrom IPython.display import display ' +
          '\n ' +
          '\ntry:' +
          '\n import requests' +
          '\nexcept:' +
          '\n raise Exception("The requests package is required to run this cell. Please install it and run this code again.") from exc' +
          '\n ' +
          '\ntry:' +
          '\n from marble_client import MarbleClient' +
          '\nexcept ImportError as exc:' +
          '\n raise Exception("The marble_client package is required to run this cell. Please install it and run this code again.") from exc' +
          '\n ' +
          '\nfrom marble_client import MarbleClient' +
          '\nfrom marble_client.exceptions import JupyterEnvironmentError' +
          '\n ' +
          '\nclient = MarbleClient()' +
          '\n ' +
          '\ntry:' +
          '\n client_session = client.this_session()' +
          '\nexcept JupyterEnvironmentError:' +
          '\n ' +
          '\n session = requests.Session()' +
          '\n session.cookies.get_dict()' +
          '\n node_id_list = ["Node ID"]' +
          '\n payload = {"credentials":{"user_name":"", "password":""}}' +
          '\n nodes = client.nodes' +
          '\n ui_label_style = {"font_family":"Helvetica Neue","font_size":"16px", "text_color":"#304FFE"}' +
          '\n input_field_style = {"description_width":"initial"}' +
          '\n login_success_style = {"font_family":"Helvetica Neue","font_size":"16px", "text_color":"green"}' +
          '\n error_style = {"font_family":"Helvetica Neue","font_size":"16px", "text_color":"red"}' +
          '\n choose_another_node_style = {"font_family":"Helvetica Neue","font_size":"16px", "text_color":"#304FFE"}' +
          '\n ' +
          '\n for node in nodes:' +
          '\n     node_id_list.append(nodes[node].id)' +
          '\n ' +
          '\n node_dropdown_label_widget = ipywidgets.Label(value="Select the node you want to log in to:", style=ui_label_style)' +
          '\n node_dropdown_widget = ipywidgets.Dropdown(options=node_id_list, style=input_field_style) ' +
          '\n node_dropdown_box_widget = ipywidgets.VBox([node_dropdown_label_widget, node_dropdown_widget])' +
          '\n ' +
          '\n username_label_widget = ipywidgets.Label(value="Enter your username or email:", style=ui_label_style)' +
          '\n username_widget = ipywidgets.Text(style=input_field_style) ' +
          '\n username_box_widget = ipywidgets.VBox([username_label_widget, username_widget])' +
          '\n ' +
          '\n password_label_widget = ipywidgets.Label(value="Enter your password:", style=ui_label_style)' +
          '\n password_widget =  ipywidgets.Password(style=input_field_style)' +
          '\n password_box_widget = ipywidgets.VBox([password_label_widget, password_widget])' +
          '\n ' +
          '\n submit_button = ipywidgets.Button(description="Submit", button_style="", tooltip="Submit", icon=""' +
          ', style={"font_family":"Helvetica Neue","font_size":"16px", "button_color":"#304FFE", "text_color":"white"} )' +
          '\n ' +
          '\n ui_message_output_widget = ipywidgets.Output()' +
          '\n ui_message_label_widget = ipywidgets.Label(value="", style=ui_label_style)' +
          '\n ui_message_display_box_widget = ipywidgets.HBox([ui_message_label_widget])' +
          '\n credential_error_output_widget = ipywidgets.Output()' +
          '\n credential_error_label_widget = ipywidgets.Label(value="", style=error_style)' +
          '\n credential_error_display_box_widget = ipywidgets.HBox([credential_error_label_widget])' +
          '\n ' +
          '\n def node_dropdown_choice(change):' +
          '\n     payload["selected_node"] = change["new"]' +
          '\n ' +
          '\n def get_username_input(change):' +
          '\n     payload["credentials"]["user_name"] =  change["new"];' +
          '\n ' +
          '\n def get_password_input(change):' +
          '\n     payload["credentials"]["password"] =  change["new"];' +
          '\n ' +
          '\n def submit(_arg):' +
          '\n     if("selected_node" in payload and payload["selected_node"] != "Node ID" and payload["credentials"]["user_name"] != "" and payload["credentials"]["password"] != ""):' +
          '\n         user_node = payload["selected_node"]' +
          '\n         url = client[user_node].url + "/magpie/signin" ' +
          '\n         response = session.post(url, headers={"Content-Type": "application/json"}, json=payload["credentials"])' +
          '\n         response_json = response.json()' +
          '\n ' +
          '\n         if(response_json["code"] == 200):' +
          '\n             with ui_message_output_widget:' +
          '\n                 ui_message_output_widget.clear_output()' +
          '\n                 credential_error_output_widget.clear_output()' +
          '\n                 ui_message_label_widget.value = response_json["detail"]' +
          '\n                 ui_message_label_widget.style = login_success_style' +
          '\n                 display(ui_message_display_box_widget)' +
          '\n         else:' +
          '\n             with ui_message_output_widget:' +
          '\n                 ui_message_output_widget.clear_output()' +
          '\n                 credential_error_output_widget.clear_output()' +
          '\n                 ui_message_label_widget.value = response_json["detail"]' +
          '\n                 ui_message_label_widget.style = error_style' +
          '\n                 display(ui_message_display_box_widget)' +
          '\n     else:' +
          '\n         if("selected_node" not in payload or payload["selected_node"] == "Node ID"): ' +
          '\n             with ui_message_output_widget:' +
          '\n                 ui_message_output_widget.clear_output()' +
          '\n                 ui_message_label_widget.value = "Invalid node name selected.  Please choose another node name."' +
          '\n                 ui_message_label_widget.style = choose_another_node_style' +
          '\n                 display(ui_message_display_box_widget)' +
          '\n         else:' +
          '\n             with ui_message_output_widget:' +
          '\n                 ui_message_output_widget.clear_output()' +
          '\n ' +
          '\n         if(payload["credentials"]["user_name"] == "" or payload["credentials"]["password"] == ""): ' +
          '\n             with credential_error_output_widget:' +
          '\n                 credential_error_output_widget.clear_output()' +
          '\n                 credential_error_label_widget.value = "Username or password cannot be empty"' +
          '\n                 display(credential_error_display_box_widget)' +
          '\n         else:' +
          '\n             with ui_message_output_widget:' +
          '\n                 credential_error_output_widget.clear_output()' +
          '\n ' +
          '\n display(node_dropdown_box_widget)' +
          '\n node_dropdown_widget.observe(node_dropdown_choice, names="value")' +
          '\n ' +
          '\n display(username_box_widget)' +
          '\n username_widget.observe(get_username_input, names="value")' +
          '\n ' +
          '\n display(password_box_widget)' +
          '\n password_widget.observe(get_password_input, names="value")' +
          '\n ' +
          '\n display(submit_button)' +
          '\n submit_button.on_click(submit)' +
          '\n display(ui_message_output_widget)' +
          '\n display(credential_error_output_widget)'
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