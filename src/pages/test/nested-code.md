// copied from https://github.com/AdobeDocs/app-builder/blob/eds-migration/src/pages/guides/application-logging/azure-log-analytics.md?plain=1
// page https://developer.adobe.com/app-builder/docs/guides/application_logging/azure_log_analytics/

## Steps to configure Log Forwarding

1. Open Azure Portal and navigate to the Azure Log Analytics workspace you want to use. Go to the workspace overview screen and pick Agent Management from the menu on the left. Copy the **`Workspace ID`** and the **`Primary Key`** for later use.

2. Open terminal and navigate to the App Builder project directory on your machine.

3. Run the following command and supply the values copied in step 1 when prompted.

    ```yaml
    aio app config set log-forwarding
    ? select log forwarding destination: Azure Log Analytics
    ? customer ID: <Workspace ID>
    ? shared key: <Primary Key>
    ? log type: <table_name_alpha_chars_only>
    ```

    Note:
    + Replace the value of `Workspace ID` and `Primary Key` as copied in step 1.
    + Replace the value of `table_name_alpha_chars_only` with the custom table name that you wish to provide. This field only accepts alpha characters.

4. Verify that the config change has taken effect 

    ```yaml
    aio app config get log-forwarding
    ```

5. Execute an action in your App Builder application workspace to generate logs.

6. Go to Azure Portal, and on the overview screen of your workspace, select Logs on the left menu. Run a query using the table name you provided in step 3. Note the table name that shows up on the Azure portal will have the suffix **`_CL`** appended to the table name you provided.

7. If you don't see any logs in Azure, please check the log forwarding errors.
8. 
    ```yaml
    aio app config get log-forwarding errors
    ```

    _Note: If you are unable to set up log forwarding correctly, please visit our [App Builder forums](https://experienceleaguecommunities.adobe.com/t5/app-builder/ct-p/app-builder) for support._