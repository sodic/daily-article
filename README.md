# daily-article
Serve a random article from [MDN's glossary](https://developer.mozilla.org/en-US/docs/Glossary) on each browser startup.

## Dependencies
- npm
- node
- systemd (if you want to run it as a service)

## Installation
1. Position yourself inside an appropriate directory and execute the following commands:
```bash
$ git clone https://github.com/sodic/daily-article
$ cd daily-article
$ ./install.sh
````
2. Set your browser's startup page to `localhost:9000`. This is only the default port, you can change it by editing the [.env file](https://github.com/sodic/daily-article/blob/master/.env).

Use `./uninstall.sh` for uninstalling.

## Usage

### Basic
[Install the service](#installation) and you'll get a random MDN article every time you open your browser.

### Complete API
- `GET /` - Get a random article
- `GET /<article_name>` - Get a specific article
- `POST /<article_name>` - Mark a specific article as read (the server will stop sending it when you make random article requests)
- `DELETE /<article_name>` - Mark a specific article as unread (the server will start sending it on random article requests again)
