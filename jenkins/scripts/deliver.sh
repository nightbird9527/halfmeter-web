set -x
rm -rf /var/halfmeter-web-static # 删除旧的静态文件
cp -r $WORKSPACE/build /var/halfmeter-web-static # 复制编译好的静态文件到静态文件目录
systemctl restart nginx # 重启nginx
set +x