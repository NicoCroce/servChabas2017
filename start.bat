@echo off 
set /p DESA=DESA?:  
start /min cmd /k call scripts/gulp.bat 
start cmd /k call scripts/gulpDeploy.bat