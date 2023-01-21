import slugify from 'slugify'
import { Listr, Logger } from 'listr2'
import { execa } from 'execa'
import outdent from 'outdent'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TEMPLATE_PATH = 'templates/ts'
const TEMPLATE_ABSOLUTE_PATH = path.join(__dirname, '..', TEMPLATE_PATH)

const dependencies = ['add', '@getmize/core']
const devDependencies = [
	'add',
	'-D',
	'@types/node',
	'nodemon',
	'prettier',
	'rimraf',
	'ts-node',
	'typescript'
]

const copyTemplate = ({ appDir }: { appDir: string }) =>
	execa('npx', ['--yes', 'cpy-cli', `${TEMPLATE_ABSOLUTE_PATH}/**/*`, appDir])

const installDependencies = async ({ appDir }: { appDir: string }) => {
	await execa('yarn', dependencies, { cwd: appDir })
	return execa('yarn', devDependencies, {
		cwd: appDir
	})
}

const replaceInTemplates = ({
	packageName,
	appDir
}: {
	packageName: string
	appDir: string
}) =>
	execa(
		'npx',
		[
			'--yes',
			'replace-in-files-cli',
			'--string="%NAME%"',
			`--replacement="${packageName}"`,
			'.'
		],
		{ cwd: appDir }
	)

const logger = new Logger({ useIcons: true })

interface CreateAppProps {
	appName: string
}

const createApp = async ({ appName }: CreateAppProps) => {
	const packageName = slugify(appName)
	const appDir = path.join(process.cwd() || '', packageName)
	const tasks = new Listr([
		{
			title: 'Copy template files',
			task: () => copyTemplate({ appDir })
		},
		{
			title: 'Set selected app name',
			task: () => replaceInTemplates({ packageName, appDir })
		},
		{
			title: 'Install dependencies',
			task: () => installDependencies({ appDir })
		}
	])
	try {
		await tasks.run()
		logger.success(
			outdent`App created successfully.

			Run dev server:
			$ cd ${packageName}/
			$ yarn dev
			`
		)
	} catch {
		logger.fail('App creator failed.')
	}
}

export default createApp
