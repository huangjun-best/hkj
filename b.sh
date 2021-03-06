#!/bin/bash

#工程目录
#BASEDIR="/Users/huangjun/code/hkj/chanjet_hkj_js"
BASEDIR="/opt/C7649/webapps/hkj/publish"
#开发目录
#TARGETDIR="/Users/huangjun/chanjet/accounting"
TARGETDIR="/opt/C7649/webapps/accounting/"
SRCDIR="$BASEDIR/src"
#版本号
cdnVer=$1
#git 分支
gitBranch=$2
echo cdnVer
cd ${BASEDIR}
pwd
git reset --hard
git clean -df
echo "git reset clean done"
git checkout ${gitBranch}
git pull origin ${gitBranch}
git status
echo "git pull ${gitBranch} done"

mkdir -p ${BASEDIR}/${cdnVer}/
DISTDIR="$BASEDIR/$cdnVer/"

#更新build版本号
sed -i 's/\(cdnVer=\).*/\1"'"${cdnVer}"'"/' build.sh
echo "update version done"
sh build.sh

echo "start clear target file"
rm -rf "${TARGETDIR}${cdnVer}"
echo "clear done"
#删除开发目录当前版本号
mv -f ${cdnVer} ${TARGETDIR}
echo "copy done"
