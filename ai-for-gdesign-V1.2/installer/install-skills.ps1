param(
  [Parameter(Mandatory=$true)]
  [string]$Destination
)

$PackageRoot = Split-Path -Parent $PSScriptRoot
New-Item -ItemType Directory -Force -Path $Destination | Out-Null
$Skills = @('derive-experience-insights','extract-structured-requirements','generate-ux-prototype','manage-design-assets')
foreach ($Skill in $Skills) {
  $Target = Join-Path $Destination $Skill
  if (Test-Path $Target) { Remove-Item -Recurse -Force $Target }
  Copy-Item -Recurse (Join-Path $PackageRoot "skills\$Skill") $Target
}
Write-Host "已安装 4 个 AI for G Design Skill 到: $Destination"
Write-Host "资产库路径: $(Join-Path $PackageRoot 'assets\g-design-enterprise-v1.3.0')"
