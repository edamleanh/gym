$workouts = @{
    "batman" = "https://darebee.com/images/workouts/batman-workout.jpg"
    "total-core" = "https://darebee.com/images/workouts/total-core-workout.jpg"
    "micro-hiit" = "https://darebee.com/images/workouts/micro-hiit-workout.jpg"
    "legday" = "https://darebee.com/images/workouts/legday-workout.jpg"
    "power-core" = "https://darebee.com/images/workouts/power-core-workout.jpg"
    "metcon-prime" = "https://darebee.com/images/workouts/metcon-prime-workout.jpg"
    "wake-up" = "https://darebee.com/images/workouts/wake-up-workout.jpg"
    "spartan" = "https://darebee.com/images/workouts/spartan-workout.jpg"
    "unbound" = "https://darebee.com/images/workouts/unbound-workout.jpg"
    "everyday-yoga" = "https://darebee.com/images/workouts/everyday-yoga-workout.jpg"
    "cardio-trim" = "https://darebee.com/images/workouts/cardio-trim-workout.jpg"
    "pullup-level1" = "https://darebee.com/images/workouts/pullup-level1-workout.jpg"
}

$targetDir = "$PSScriptRoot\assets\workouts"
if (!(Test-Path -Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
}

foreach ($key in $workouts.Keys) {
    $url = $workouts[$key]
    $dest = "$targetDir\$key.jpg"
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
        Write-Host "✅ Downloaded: $key.jpg"
    } catch {
        Write-Host "❌ Failed: $key ($($_.Exception.Message))"
        if (Test-Path -Path $dest) {
            Remove-Item -Path $dest
        }
    }
}
Write-Host "All downloads completed!"
