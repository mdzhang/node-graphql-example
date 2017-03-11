# Node Server

An example web server using Node.js, Express.js, and ES6.

## Table of Contents

- [Installation](#installation)
- [Running](#running)

## Installation

0. Follow [general requirements here](https://github.com/mdzhang/guides/blob/master/DEV_SETUP.md#general-requirements).

0. Clone and enter this repo
    ```sh
    git clone git@github.com:mdzhang/node-server.git
    cd node-server
    ```

0. Install Homebrew packages
    ```sh
    brew bundle
    ```

0. Follow Javascript setup steps [here](https://github.com/mdzhang/guides/blob/master/DEV_SETUP.md#javascript)

0. Install development environment variables
    ```sh
    cp .envrc.sample .envrc
    direnv allow
    ```

0. Install git hooks
    ```sh
    pre-commit install
    ```

    *NB*: These hooks will fail if `.envrc` is not up to date

## Running

```sh
npm start
```
