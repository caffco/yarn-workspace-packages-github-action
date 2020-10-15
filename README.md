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
        run: echo ${{ needs.get-workspace-packages.outputs.package-names }}
```

[yarnworkspacesurl]: https://classic.yarnpkg.com/en/docs/workspaces/
