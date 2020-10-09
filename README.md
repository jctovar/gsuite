Script for create mails on gsuite with oauth2

use restify & googleapis

npm install googleapis@39 --save
npm install restify --save

node .


###

https://developers.google.com/admin-sdk/directory/v1/reference/users

https://developers.google.com/admin-sdk/directory/v1/quickstart/nodejs


API
iztacala listening at http://[::]:3006

get photo as binary
http://localhost:3006/photo/a.corona@iztacala.unam.mx

get email data
http://localhost:3006/user/juanito@iztacala.unam.mx

insert email
http://localhost:3006/insert/

Body JSON
{
	"lastName": "Banana Banana",
	"firstName": "Juanito",
	"password": "LavaquitaFeliz*",
	"primaryEmail": "cocodrile@iztacala.unam.mx",
	"recoveryEmail": "cocodrile@hotmail.com",
	"recoveryPhone": "+525527539048",
	"userId": "488400039",
	"orgUnitPath": "/Alumnos"
}

TODO

- basic auth
- move functions to external file