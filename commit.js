const { execSync } = require('child_process');

// 替换为你的项目路径
const projectPath = 'C:/Users/190680/jh_c/base/commit-bash';

// 替换为你的远程仓库 URL
const remoteRepoUrl = 'https://github.com/jiang-24-gdufs/commit-bash';

// 生成随机时间戳函数
function generateRandomTimestamp() {
  const now = Date.now(); // 获取当前时间的时间戳（毫秒）
  const oneYearAgo = now - 31536000000; // 一年前的时间戳（毫秒）
  const randomTimestamp = new Date(oneYearAgo + Math.floor(Math.random() * (now - oneYearAgo))); // 随机时间戳在一年前和当前时间之间

  const year = randomTimestamp.getFullYear();
  const month = String(randomTimestamp.getMonth() + 1).padStart(2, '0');
  const day = String(randomTimestamp.getDate()).padStart(2, '0');
  const hour = String(randomTimestamp.getHours()).padStart(2, '0');
  const minute = String(randomTimestamp.getMinutes()).padStart(2, '0');
  const second = String(randomTimestamp.getSeconds()).padStart(2, '0');

  const timestamp = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return timestamp;
}

// 设置提交时间戳，并进行提交
function commitWithTimestamp(timestamp, message) {
  // 添加一些实际的代码修改
  // 例如，创建一个新的文件，或修改现有文件
  const cmdCreateFile = `cd ${projectPath} && echo "${timestamp}" > file.txt`;
  execSync(cmdCreateFile, { stdio: 'inherit' });

  // 添加和提交代码修改
  const cmdAdd = `cd ${projectPath} && git add -A`;
  execSync(cmdAdd, { stdio: 'inherit' });

  const cmdCommit = `cd ${projectPath} && git commit --date="${timestamp}" -m "${message}"`;
  execSync(cmdCommit, { stdio: 'inherit' });
}

// 批量提交
for (let i = 0; i < 135; i++) {
  const timestamp = generateRandomTimestamp();
  commitWithTimestamp(timestamp, 'Your commit message');
}

// findstr "origin" for windows | findstr "origin" for mac
// 检查是否已存在名为 origin 的远程仓库，如果不存在，则添加
// 检查是否已存在名为 origin 的远程仓库，如果不存在，则添加
const cmdCheckRemote = `cd ${projectPath} && git remote get-url origin`;
const existingRemoteUrl = execSync(cmdCheckRemote, { encoding: 'utf8', stdio: 'pipe' }).trim();

if (existingRemoteUrl !== remoteRepoUrl) {
  const cmdSetRemoteUrl = `cd ${projectPath} && git remote set-url origin ${remoteRepoUrl}`;
  execSync(cmdSetRemoteUrl, { stdio: 'inherit' });
  console.log('Remote "origin" URL updated.');
} else {
  console.log('Remote "origin" URL is already correct. Skipping update...');
}

// 一次性推送到远程仓库
// execSync(`cd ${projectPath} && git push -u origin main`, { stdio: 'inherit' });
