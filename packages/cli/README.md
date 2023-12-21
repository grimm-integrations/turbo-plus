# turbo-plus | CLI

turbo-plus is a cli for interacting with turbo-plus-template. It's for easy use of the turborepo.
Features:

1. create
   - Storybook
   - Tailwind
   - Typescript
   - ESLint
   - Vite
   - NextJS

## ✍🏻 Authors

- [@dontfred](https://www.github.com/dontfred) for Grimm Integrations

## 📚 Stack

**Tooling:** 🥟 Bun

**Monorepo:** 🔄 Turborepo

**CLI:** 👩🏼‍✈️ Commander.js, ？Inquirer, ❇️ Execa

## Usage

```bash

# -h, --help
# To see all options
bunx turbo-plus@latest -h
# Usage: turbo-plus [options] [command]
#
# The Turbo CLI to work with turbo easily
#
# - Storybook
# - Tailwind
# - Typescript
# - ESLint
# - Vite
# - NextJS
#
# Options:
#   -v, --version     display the version number
#   -h, --help        display help for command
#
# Commands:
#   create [options]  Create a new turbo-plus project
#   help [command]    display help for command
```

### create [options]

```bash
# create
# To create a Turbo Plus Project
bunx turbo-plus@latest create

# create -p, --path <path>
# To set the path
bunx turbo-plus@latest create -p ../

# create -n, --name <name>
# To set the name
# ( Name have to start with '@' and contains only letters and '-' )
bunx turbo-plus@latest create -n @turbo-plus

# create -y, --yes
# To skip all questions
bunx turbo-plus@latest create -y

# create -pm, --package-manager <packageManager>
# To set Package Manager
# ( currently only support for bun )
bunx turbo-plus@latest create -pm bun
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## 🐕‍🦺 Support

For support, email fgrimm@grimm-integrations.cc.

## Disclaimer

The packages is highly inspired by [shadcn/ui](https://github.com/shadcn-ui/ui). Some code sippets are directly copied, copied and slightly changed or just inspired.

So, thanks [shadcn](https://github.com/shadcn) for providing open source code and make such a project possible.

## License

[MIT](https://choosealicense.com/licenses/mit/) License

Copyright (c) 2023 **Grimm Integrations**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
