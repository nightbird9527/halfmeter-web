#!/bin/bash
set -ex

# 删除旧的静态文件目录
rm -rf /var/www/halfmeter-web-static
if [ $? -ne 0 ]; then
  exit 1
fi

# 复制编译后的静态文件到静态文件目录
cp -r $WORKSPACE/build /var/www/halfmeter-web-static
if [ $? -ne 0 ]; then
  exit 1
fi

# 重启nginx
echo "$NGINX_SUDO_PASSWORD" | sudo -S systemctl restart nginx
if [ $? -ne 0 ]; then
  exit 1
fi