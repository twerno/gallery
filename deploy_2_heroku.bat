call build_prod.bat
call git add server/
call git commit -am "heroku deploy"
call git subtree push --prefix server heroku master
pause