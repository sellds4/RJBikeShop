EITHER

Use the .Net Project file (RJBikeShop)

OR

1)Install Node if not installed on your machine
	- https://nodejs.org/download/

2) npm install -g stylus jeet gulp

3) npm install

4) gulp appdev

5) Build in .NET and run

INITIAL LOGIN

username: admin

password: password123

.Net Web.Config Connection String will need to be changed to the following to run a LocalDB version

```html
<connectionStrings>
    <add name="RJBikeContext" connectionString="Data Source=(LocalDB)\v11.0;AttachDbFileName=|DataDirectory|\DatabaseFileName.mdf;Integrated Security=True;MultipleActiveResultSets=True" providerName="System.Data.SqlClient"/>
</connectionStrings>
```
