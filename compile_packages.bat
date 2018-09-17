@echo off
setlocal EnableDelayedExpansion
echo ***************************************************************************
echo            compile_packages.bat
echo                     by niuren.zhu
echo                           2016.06.19
echo  ˵����
echo     1. ��װapache-maven�����ص�ַhttp://maven.apache.org/download.cgi��
echo     2. ��ѹapache-maven��������ϵͳ����MAVEN_HOMEΪ��ѹ�ĳ���Ŀ¼��
echo     3. ���PATH������%%MAVEN_HOME%%\bin�������JAVA_HOME�����Ƿ���ȷ��
echo     4. ������ʾ������mvn -v ��鰲װ�Ƿ�ɹ���
echo     5. ����war����releaseĿ¼��
echo ****************************************************************************
REM ���ò�������
SET WORK_FOLDER=%~dp0

echo --��ǰ������Ŀ¼��[%WORK_FOLDER%]
echo --�����Ŀ����
if exist %WORK_FOLDER%release\ rd /s /q %WORK_FOLDER%release\ >nul
if not exist %WORK_FOLDER%release md %WORK_FOLDER%release >nul
echo --��ʼ����
if exist %WORK_FOLDER%pom.xml (
  call "%MAVEN_HOME%\bin\mvn" -q clean package -f %WORK_FOLDER%pom.xml
  if exist %WORK_FOLDER%\target\*.war copy /y %WORK_FOLDER%\target\*.war %WORK_FOLDER%release\ >nul
  if exist %WORK_FOLDER%\target\ rd /s /q %WORK_FOLDER%\target\
)

echo --������ɣ�������Ϣ��鿴[compile_packages_log_%OPNAME%.txt]
