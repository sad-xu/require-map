const fs = require('fs')
const path = require('path')

// 获取require的包名
function getRequires(str) {
	// 去除注释
	str = str.replace(/\/\*[\s\S]*\*\/|\/\/.*/g, '\n')
	let arr = str.match(/require\('(\S*)'\)/mg)
	if (arr === null) return []
	return arr.map(item => {
		let name = item.replace(/\\/g, '').replace(/'/g,'"').slice(9,-2)
		if (isNPM(name)) return extract(name)
		else return name
	})
}

// 提取npm包名  a -> a   a/index.js -> a (防止同一个包,因写法不同导致被认为是两个)
function extract(str) {
	let match
  if (/^@/.test(str)) {
    match = /^(?:(@[^/]+)[/]+)([^/]+)[/]?/.exec(str)
    if (!match || !match[1] || !match[2]) return null
    return [ match[1], match[2] ].join('/')
  } else {
    match = /^([^/]+)[/]?/.exec(str)
    if (!match) return null
    return match[1] || null
  }
}

// 根据包名判断来源
function isNPM(str) {
	let reg = /^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[\\\/])/
	return !reg.test(str)
}

let mapArr = []

function start(str, p) {
	// sync
	let truePath = path.join(p, str)
	let data = ''

	if (truePath.indexOf('.js') < 0) {
		try {
			data = fs.readFileSync(truePath + '/index.js', 'utf8')
			truePath += '/index.js'
		} catch(err) {
			data = fs.readFileSync(truePath + '.js', 'utf8')
			truePath += '.js'
		}
	} else {
		data = fs.readFileSync(truePath, 'utf8')
	}
	
	let requireArr = getRequires(data)
	requireArr.forEach((item, index) => {
		mapArr.push({from: item, to: str})
		if (!isNPM(item)) {
			start(item, path.dirname(truePath))
		}
	})
}

function getData(data) {
	let nodeData = [],
			nodeArr = [],
			linkData = [];
	data.forEach((item, index) => {
		let {from, to} = item
		if (nodeArr.indexOf(to) < 0) nodeArr.push(to)
		if (nodeArr.indexOf(from) < 0) nodeArr.push(from)
		linkData.push({source: from, target: to})
	})
	nodeArr.forEach(item => {
		nodeData.push({name: item})
	})
	return {
		nodeData: nodeData,
		linkData: linkData
	}
}


/*
	{
		filename: 'index.html',  // 文件名
		width: 1300						// 画布宽
		height: 600 					// 画布高
		radius: 14					// 节点半径
		lineWidth: 2		// 连接线宽度
		lineLength: 120	// 连接线长度
		strength: -60  		// 节点间作用力
	}
*/
function RequireMap(entry = 'app.js', opt = {}) {  // 入口文件, map配置项
	this.entry = entry
	let { 
		filename = 'requiremap.html',
		radius = 14,
		lineLength = 120
	} = opt
	this.filename = filename
	this.radius = radius
	this.lineLength = lineLength
}

RequireMap.prototype.run = function() {
	start(this.entry, process.cwd())
	let {nodeData, linkData} = getData(mapArr)
	// 生成文件
	
	let htmlData = `
	<!DOCTYPE html>
	<html lang=en>
		<head>
			<meta charset=utf-8>
			<meta content="width=device-width,initial-scale=1"name=viewport>
			<script src="https://d3js.org/d3.v5.min.js"></script>
		</head>
		<body>
			<canvas height="700" width="1300"></canvas>
		</body>
	</html>
	<script>
	`
	
	htmlData += fs.readFileSync(__dirname + '/lib/relation.js', 'utf8')
	htmlData += `
	</script>
	<script>
		let canvas = document.querySelector("canvas")
		let nodeData = ${JSON.stringify(nodeData)}
		let linkData = ${JSON.stringify(linkData)}
		const s = new Relation({
			nodeData: nodeData,
			linkData: linkData,
			canvas: canvas,
			width: 1300,
			height: 700,
			radius: ${this.radius},
			lineWidth: 2,
			lineLength: ${this.lineLength},
			strength: -90
		})
		s.init()
	</script>`

	fs.writeFile(this.filename, htmlData, err => {
		if (err) throw err
		console.log('success! (๑•̀ㅂ•́)و✧')
	})
}


module.exports = RequireMap


