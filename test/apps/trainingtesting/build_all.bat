@echo off
setlocal EnableDelayedExpansion
echo ***************************************************************************
echo                build_all.bat
echo                     by niuren.zhu
echo                           2017.01.13
echo  ˵����
echo     1. �˽ű���Ҫ��Node.js command prompt�����С�
echo     2. ������ǰĿ¼��������Ŀ¼������tsconfig.json����롣
echo     3. ����1��tsc����������������磺-w����ʾ�����ļ��仯��
echo ****************************************************************************
REM ���ò�������
REM ����Ŀ¼
SET WORK_FOLDER=%~dp0
REM ������Ŀ¼����ַ����ǡ�\������
if "%WORK_FOLDER:~-1%" neq "\" SET WORK_FOLDER=%WORK_FOLDER%\
echo --������Ŀ¼��%WORK_FOLDER%
REM ��������
SET OPTIONS=%~1
REM ��������
SET COMMOND=tsc
if "%OPTIONS%" neq "" (
  SET COMMOND=start /min !COMMOND! %OPTIONS%
  echo ���!COMMOND!
)

REM ��ѯ��ǰĿ¼��tsconfig�ļ�
for /f %%l in ('dir /b tsconfig*.json') DO (
  SET TS_CONFIG=%%l
  echo --��ʼ���룺!TS_CONFIG!
  call !COMMOND! -p !TS_CONFIG!
)