# Web Deploy for Node

Web Deploy for Node automatically deploys your site by listening for specific HTTP requests and executing CLI commands on your webserver. This application makes it easy to automatically deploy a site hosted on Git provider that supports webhooks.

## Configuration

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
