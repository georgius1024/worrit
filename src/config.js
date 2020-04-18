const development = {
  apiEndPoint: '//localhost:8000/'
}

const production = {
  ...development,
  ...{
    apiEndPoint: '//' + window.location.host + '/'
  }
}

export default (process.env.NODE_ENV === 'production' ? production : development)
