set -x
cd $HOME # 进入用户主目录
rm -rf halfmeter-web-static # 删除旧的静态文件
cp -r $WORKSPACE/build halfmeter-web-static # 复制编译好的静态文件到静态文件目录
systemctl restart nginx # 重启nginx
set +x