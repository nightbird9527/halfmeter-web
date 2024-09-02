#!/bin/bash
set -ex

echo "开始部署"

# 删除旧的静态文件目录
rm -rf /var/www/halfmeter-web-static
if [ $? -ne 0 ]; then
  echo "删除旧的静态目录文件失败"
  exit 1
else echo "成功删除旧的静态目录文件"
fi

# 复制编译后的静态文件到静态文件目录
cp -r $WORKSPACE/build /var/www/halfmeter-web-static
if [ $? -ne 0 ]; then
  echo "复制编译后的静态文件到静态文件目录失败"
  exit 1
else echo "成功复制编译后的静态文件到静态文件目录, 后续将使用nginx托管该目录"
fi

# 重启nginx
systemctl restart nginx
if [ $? -ne 0 ]; then
  echo "重启nginx失败"
  exit 1
else echo "成功重启nginx"
fi

echo "部署完成"

set +ex