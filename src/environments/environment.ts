// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  host: '',
  port: '',
  dbhost: '',
  dbport: '',
  api_url: 'http://__ELBURL__/',
  test: 'test',
  socket_url: 'ws://__ELBURL__'
};
