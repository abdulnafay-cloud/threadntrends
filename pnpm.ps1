$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = Join-Path $projectRoot 'node-v20.18.0-win-x64\node.exe'
$pnpm = Join-Path $projectRoot 'node-v20.18.0-win-x64\node_modules\pnpm\bin\pnpm.cjs'
if (!(Test-Path -LiteralPath $node) -or !(Test-Path -LiteralPath $pnpm)) {
  throw 'Portable Node.js/pnpm was not found in this project folder.'
}
& $node $pnpm @args
exit $LASTEXITCODE
