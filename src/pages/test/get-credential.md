<GetCredential className="getCredentialContainer" templateId={template_id} productName={product_name} >

<GetCredentialSignIn title="Get credentials" paragraph="Create unique credentials that you will use to call Adobe Express Embed SDK from your application." buttonText="Sign in to create credentials" />

<GetCredentialForm title="Get credentials" paragraph="Create unique credentials that you will use to call Adobe Express Embed SDK from your application." className="formClass">

<GetCredentialFormCredentialName label="Credential name" description="Credential name must be unique and between 6 and 45 characters long and must not contain any special characters. A project will be automatically created with the same name in Adobe Developer Console." range="45" />

<GetCredentialFormAllowedOrigins label="Allowed domains (up to 5)" contextHelp={true} contextHelpHeading="What are allowed domains" placeholder="Example: www.domain-1.com, www.domain-2.com, *.my-domain.com, localhost:5000" contextHelpText="To prevent a third party from using your client ID on their own website, the use of your client ID is restricted to a list of domains that you specifically authorize." contextHelpLink="https://www.adobe.com/" contextHelpLabelForLink="Learn more in our documentation" description="Use wildcards to enter multiple subdomains (*.my-domain.com) or commas to separate multiple domains (www.domain-1.com, www.domain-2.com). During local development, you can include ports greater than 1023 with localhost (e.g. localhost:3000). Standard ports (80, 443) will be used for non-localhost domains." />

<GetCredentialFormProducts label="Included products and services">

<GetCredentialFormProduct label="Adobe Express Embed SDK" icon={creativeCloud} />

</GetCredentialFormProducts>

<GetCredentialFormDownloads label="Download a personalized code sample" contextHelp={true} contextHelpHeading="Select Language">

<GetCredentialFormDownload title="JavaScript" href={data?.allFile?.edges[0]?.node?.publicURL} />

</GetCredentialFormDownloads>

<GetCredentialFormAdobeDeveloperConsole label='By checking this box, you agree to' linkText="Adobe Developer Terms of Use" href="https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Adobe-Developer-Additional-Terms_en-US_20230822.pdf" />

<GetCredentialFormSide>

### API key credential

Submitting this form creates an API Key credential. The API key credential identifies your application to Adobe servers and can help accept or reject requests originating from certain domains.

### Learn more

[Quickstart guide](https://developer.adobe.com/express/embed-sdk/docs/guides/quickstart/)

[Adobe Express Embed SDK documentation](https://developer.adobe.com/express/embed-sdk/docs/guides/)

</GetCredentialFormSide>

</GetCredentialForm>

<GetCredentialUnknownError />

<GetCredentialCard title="Your credential is ready to use" paragraph="Check the downloads section of your browser for the ZIP file, or find it where you save downloads on your machine." nextStepsLabel="Next steps" nextStepsHref={targetURL} devConsoleDirection="/console" developerConsoleManage="Manage on Developer console" className="card_developer_console">

<GetCredentialCardSide>

### API key credential

An API Key credential was created. The API key credential identifies your application to Adobe servers and can help accept or reject request originating from certain domains.

### Learn more

[Quickstart guide](https://developer.adobe.com/express/embed-sdk/docs/guides/quickstart/)

[Adobe Express Embed SDK documentation](https://developer.adobe.com/express/embed-sdk/docs/guides/)

</GetCredentialCardSide>

<GetCredentialCardProducts label="Included products and services">

<GetCredentialCardProduct label="Adobe Express Embed SDK" icon={creativeCloud} />

</GetCredentialCardProducts>

<GetCredentialCardDevConsoleLink heading="Developer Console Project" />

<GetCredentialCardCredentialDetails heading="Credential details">

<GetCredentialCardCredentialDetails.APIKey heading="API Key" />

<GetCredentialCardCredentialDetailsAllowedOrigins heading="Allowed domains" />

<GetCredentialCardCredentialDetailsOrganizationName heading="Organization" />

<GetCredentialCardCredentialDetailsImsOrgID heading="IMS Organization ID" />

</GetCredentialCardCredentialDetails>

</GetCredentialCard>

<GetCredentialReturn title="Previously created projects" paragraph="Select a project and access your existing credentials for Adobe Express Embed SDK." nextStepsLabel="Next steps" nextStepsHref={targetURL} className="card_developer_console">

<GetCredentialReturnSide>

<GetCredentialReturnSideCustom>

### Welcome back

View your existing Adobe Express Embed SDK credentials and generate new ones. Quickly access your API keys to keep your projects running efficiently.

</GetCredentialReturnSideCustom>

<GetCredentialReturnSideNewCredential heading="Need another credential?" buttonLabel="Create new credential" />

</GetCredentialReturnSide>

<GetCredentialReturnCredentialDetails heading="Credential details">

<GetCredentialReturnCredentialDetailsAPIKey heading="API Key" />

<GetCredentialReturnCredentialDetailsAllowedOrigins heading="Allowed domains" />

<GetCredentialReturnCredentialDetailsOrganizationName heading="Organization" />

<GetCredentialReturnCredentialDetailsImsOrgID heading="IMS Organization ID" />

</GetCredentialReturnCredentialDetails>

<GetCredentialReturnProjectsDropdown label="Projects" subHeading="Only your projects that contain credentials are shown" />

<GetCredentialReturnManageDeveloperConsole label="Manage all your projects and credentials on Adobe Developer Console" direction='/console/projects' />

<GetCredentialReturnDevConsoleLink heading="Developer Console Project" />

<GetCredentialReturnProducts label="Included products and services">

<GetCredentialReturnProduct label="Adobe Express Embed SDK" icon={creativeCloud} />

</GetCredentialReturnProducts>

</GetCredentialReturn>

<GetCredentialRequestAccess title="Get credentials" paragraph="Create unique credentials that you will use to call Adobe Express Embed SDK from your application.">

<GetCredentialRequestAccessRestrictedAccess title="Restricted Access" buttonLabel="Request access" >

<GetCredentialRequestAccessRestrictedAccessProducts label="Included products and services">

<GetCredentialRequestAccessRestrictedAccessProductsProduct label="Adobe Express Embed SDK" icon={creativeCloud} />

</GetCredentialRequestAccessRestrictedAccessProducts>

</GetCredentialRequestAccessRestrictedAccess>

</GetCredentialRequestAccess>

</GetCredential>
