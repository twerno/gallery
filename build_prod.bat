cd client
del /S /Q dist
call npm run build-prod
cd ..
del /S /Q server\static
xcopy client\public server\static /s
xcopy client\dist\main server\static /s
pause