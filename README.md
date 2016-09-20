# Web Deploy for Node

Web Deploy for Node automatically deploys your site by listening for specific HTTP requests and executing CLI commands on your webserver. This application makes it easy to automatically deploy a site hosted on Git provider that supports webhooks.

## Getting Started

### Configuring the Web Server

- [Option 1] download the repo as zip from <a target="_blank" href="https://github.com/notoriousb1t/web-deploy-for-node/archive/master.zip">here</a> and unzip the file to the correct path on the webserver
- [Option 2] login to the webserver and in the command line or terminal, run the following commands

```bash
cd /path/to/wwwroot
git clone https://github.com/notoriousb1t/web-deploy-for-node.git
```

- rename deploy.sample.json to deploy.json
- configure deploy.json (see below)
- run the following command to start the node server

```bash
node server.js
```
- configure a process manager like pm2 + nginx to keep the web deploy alive or deploy to IIS+Node

### Automatic Deployment on Git Push
- Web Deploy for Node currently supports simple GET requests at this time
- <a target="_blank" href="https://developer.github.com/webhooks/creating/">Configure in GitHub</a>
- <a target="_blank" href="https://gitlab.com/gitlab-org/gitlab-ce/blob/master/doc/web_hooks/web_hooks.md">Configure in GitLab</a>
- <a target="_blank" href="https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html">Configure in Bitbucket</a>

### Manual Deployment
- go to your site at http://mysite/my-relative-url to manually deploy it

## Configuration

**(This sample configuration has the scripts to update from a remote git repository)**

**deploy.json**
```json
{
    "port": 8080,
    "sites": [
        {
            "url": "/my-relative-url",
            "workingDir": "/path/to/directory",
            "scripts": [
                "echo $PWD",
                "git status",
                "whoami",
                "git pull",
                "git status",
                "git submodule sync",
                "git submodule update",
                "git submodule status",
                "npm i"
            ]
        }
    ]
}
```

### Config Properties

| Property | Explanation |
| ------------- | ------------- |
| **port**  | port of the HTTP server  |
| **sites**  | Site configuration; see below  |

### Site Properties
| Property | Explanation |
| ------------- | ------------- |
| **url**  | url path that activates this deployment strategy  |
| **workingDir**  | directory that contains your application.  this is where your scripts should run  |
| **scripts**  | list of commands to run from the CLI  |
