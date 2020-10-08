{ config:
   { url: 'https://www.googleapis.com/admin/directory/v1/users',
     method: 'POST',
     paramsSerializer: [Function],
     data:
      { name: [Object],
        password: 'elgatofeliz',
        primaryEmail: 'juanito.banana@iztacala.unam.mx',
        changePasswordAtNextLogin: true },
     headers:
      { 'Accept-Encoding': 'gzip',
        'User-Agent': 'google-api-nodejs-client/0.7.2 (gzip)',
        Authorization:
         'Bearer ya29.a0AfH6SMD7PjTC2OZGbZtXD1EjEPTmrdUNVYZZs6cm65ACD9mmzI3MWnRm0zCctURdvuGWfHYQ4Sjj16XMD6aMavVwn2d9J2GdPk67RH2usnoJQAiaCNe9nd9y_oCXm7cCf4HV9tEMj7YTp-kpRlu1tDAwRvT-R-uSgRI',
        'Content-Type': 'application/json',
        Accept: 'application/json' },
     params: [Object: null prototype] {},
     validateStatus: [Function],
     body:
      '{"name":{"familyName":"juanito","givenName":"banana"},"password":"elgatofeliz","primaryEmail":"juanito.banana@iztacala.unam.mx","changePasswordAtNextLogin":true}',
     responseType: 'json' },
  data:
   { kind: 'admin#directory#user',
     id: '100048188000911070169',
     etag:
      '"kUnwYYg1BVyzlZxLWewcY0fcrpfz6LbI3xDE6gsvPl4/ndSbtolHf7buQ3BnIw48y_jDCOU"',
     primaryEmail: 'juanito.banana@iztacala.unam.mx',
     name: { givenName: 'banana', familyName: 'juanito' },
     isAdmin: false,
     isDelegatedAdmin: false,
     creationTime: '2020-09-23T01:52:06.000Z',
     changePasswordAtNextLogin: true,
     customerId: 'C02ks768j',
     orgUnitPath: '/',
     isMailboxSetup: false },
  headers:
   { 'alt-svc':
      'h3-Q050=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-27=":443"; ma=2592000,h3-T051=":443"; ma=2592000,h3-T050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
     'cache-control': 'private',
     connection: 'close',
     'content-encoding': 'gzip',
     'content-type': 'application/json; charset=UTF-8',
     date: 'Wed, 23 Sep 2020 01:52:07 GMT',
     etag:
      '"kUnwYYg1BVyzlZxLWewcY0fcrpfz6LbI3xDE6gsvPl4/ndSbtolHf7buQ3BnIw48y_jDCOU"',
     server: 'ESF',
     'transfer-encoding': 'chunked',
     vary: 'Origin, X-Origin, Referer',
     'x-content-type-options': 'nosniff',
     'x-frame-options': 'SAMEORIGIN',
     'x-xss-protection': '0' },
  status: 200,
  statusText: 'OK' }
