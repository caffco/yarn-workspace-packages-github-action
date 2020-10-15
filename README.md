[![Maintainability](https://api.codeclimate.com/v1/badges/d9d35eccf8ed20d25347/maintainability)](https://codeclimate.com/github/caffco/yarn-workspace-packages-github-action/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d9d35eccf8ed20d25347/test_coverage)](https://codeclimate.com/github/caffco/yarn-workspace-packages-github-action/test_coverage)

# Yarn Workspace Packages

> Returns the packages defined in a Yarn workspace.

## About

This action works with [Yarn workspaces][yarnworkspacesurl] and offers an easy way to get the list of packages defined in your workspace.

## Usage

```yml
name: Get packages
on: [push, pull_request]
jobs:
  get-workspace-packages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Get packages in workspace
        uses: caffco/yarn-workspace-pacakges-github-action@v1.0.0
        with:
          repository_path: .

  run-tests:
    runs-on: ubuntu-latest
    steps:
        - name: Print packages
        needs: get-workspace-packages
        run: echo ${{ needs.get-workspace-packages.outputs.package_names }}
```

[yarnworkspacesurl]: https://classic.yarnpkg.com/en/docs/workspaces/
