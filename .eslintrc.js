module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/standard'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'arrow-parens': 0, // 箭头函数用小括号括起来
		camelcase: 0, // 不强制驼峰法命名,
		eqeqeq: 0, // 不需要使用全等
		'generator-star-spacing': 0, // 生成器函数*的前后空格
		indent: [2, 4], // 缩进风格
		'prefer-const': 2, // 如果一个变量没有改变过,使用const声明
		quotes: [2, 'single'], // 引号类型 `` "" ''
		semi: [2, 'never'], // 语句强制分号结尾
		'semi-spacing': [2, { before: false, after: true }], // 分号前后空格
		'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
		'space-in-parens': [0, 'never'], // 小括号里面要不要有空格
		'no-var': 2,
		'no-undef': 0, // 不能有未定义的变量
		'no-eval': 0, // 允许使用eval()
		'no-callback-literal': 0, // 允许callback
		'no-new': 0, // 允许使用new语法
		'no-unused-expressions': 2,
		'no-multiple-empty-lines': [2, { max: 1 }], // 空行最多不能超过1行
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
}
