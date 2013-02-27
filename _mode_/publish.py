import sys
import os
import re

path = os.path.dirname(__file__)
config = eval(open(os.path.join(path, 'config.json'), 'r').read())

os.chdir(path)
os.chdir('..')
pubPath = os.getcwd()

def publish():
	pagePath = os.path.join(path, 'page')
	pageFolder = [pagePath]
	while pageFolder:
		folderPath = pageFolder.pop()
		filelist = os.listdir(folderPath)
		for file in filelist:
			filepath = os.path.join(folderPath, file)
			if os.path.isdir(filepath):
				mkPath = filepath.replace(pagePath, pubPath)
				if not os.path.exists(mkPath):
					os.mkdir(mkPath)
					print('创建文件夹 %s' % file)
				pageFolder.append(filepath)
			else:
				mkFile = filepath.replace(pagePath, pubPath)
				mkFileUrl = filepath.replace(pagePath + '\\', '')
				mkFileUrl = mkFileUrl.replace('\\', '/')
				try:
					templateValue = config[mkFileUrl]
				except:
					templateValue = config['default']
					for item in config:
						itemCompile = item.replace('*', '(\w*)')
						pattern = re.compile(itemCompile)
						match = pattern.match(mkFileUrl)
						if match:
							templateValue = config[item]
							break
				templatePath = os.path.join(path, 'template\\' + templateValue['template'])
				if os.path.exists(templatePath):
					content = open(templatePath, 'r').read()
					keys = re.findall(r'{\$(\w*)}', content, re.DOTALL)
					for key in keys:
						try:
							value = templateValue[key]
						except:
							value = False
						if value:
							if key == 'css' or key == 'js':
								if key == 'css':
									linkHtml = '<link rel="stylesheet" href="%s" />'
								else:
									linkHtml = '<script src="%s"></script>'
								likeValue = ''
								if isinstance(value, list):
									for url in value:
										likeValue += linkHtml % url
								else:
									likeValue += linkHtml % value
								content = content.replace(r'{$%s}' % key, likeValue)
							else:
								content = content.replace(r'{$%s}' % key, value)
						else:
							content = content.replace(r'{$%s}' % key, '')
				else:
					content = ''
					
				content = content.replace(r'{#content}' , open(filepath, 'r').read())
				open(mkFile, 'w').write(content)
				print('生成文件 %s' % file)
	
	
if __name__ == '__main__':
	try:
		publish()
		input('发布成功...')
	except:
		print('程序运行出错，发布失败！')
		input(sys.exc_info())

	