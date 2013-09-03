jlls-mailsettings
=================

This is the source code for a REST-ful API to retrieve e-mail settings from an SQLite database.

If you just want to call a web service to get e-mail settings in your app - you can use my hosted service.
See http://jlls.info/websites-jmailapi.php for more information.

If you want to customise the API or database of mail providers, or want to self-host the system, clone this project!

Requirements

- PHP 5
- pdo_sqlite extension for PHP

Installation

- Clone project
- Edit "functions.php" to provide the path to the emailsettings.sqlite database
- Edit the emailsettings.sqlite database if you want (it's pre-populated with some settings).
- Your web service can then call "api.php"
- For more information on built-in methods, see http://jlls.info/websites-jmailapi.php

Database

- emailsettings.sqlite contains the mail settings.
- Table "providers" contains the list of settings
- Table "extensions" contains a list of email domain extensions (e.g. mac.com) linked to the "providerid" record in "providers".
- To add a new provider, add the details to table "providers", then note the "providerid" allocated, then add the domain extension to "extensions" and set "extensions.providerid" to the "providers.providerid" previously noted.

Questions

- e-mail me: j@jlls.info
