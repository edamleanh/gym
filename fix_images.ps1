$replacements = @{
    "batman" = @("batcave-workout.jpg", "batcave.jpg", "bruce-wayne-workout.jpg", "chest-and-back-workout.jpg", "upperbody-workout.jpg", "upperbody-builder-workout.jpg")
    "pullup-level1" = @("pullup-workout.jpg", "pull-up-workout.jpg", "back-and-biceps-workout.jpg", "back-and-core-workout.jpg")
    "micro-hiit" = @("super-hiit-workout.jpg", "hiit-workout.jpg", "brutal-hiit-workout.jpg")
    "cardio-trim" = @("cardio-hiit-workout.jpg", "cardio-blast-workout.jpg", "cardio-light-workout.jpg", "cardio-go-workout.jpg")
    "metcon-prime" = @("metcon-workout.jpg", "metabolic-prime-workout.jpg", "power-cardio-workout.jpg", "cardio-max-workout.jpg")
}

$targetDir = "$PSScriptRoot\assets\workouts"

foreach ($key in $replacements.Keys) {
    $success = $false
    foreach ($candidate in $replacements[$key]) {
        if ($success) { break }
        $url = "https://darebee.com/images/workouts/$candidate"
        $dest = "$targetDir\$key.jpg"
        try {
            Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
            $fileInfo = Get-Item $dest
            if ($fileInfo.Length -gt 20000) {
                Write-Host "✅ Replaced $key with $candidate (Size: $($fileInfo.Length))"
                $success = $true
            } else {
                Write-Host "❌ $candidate too small ($($fileInfo.Length)), trying next..."
                Remove-Item -Path $dest
            }
        } catch {
            Write-Host "❌ Failed $candidate"
            if (Test-Path -Path $dest) { Remove-Item -Path $dest }
        }
    }
    if (-not $success) {
        Write-Host "⚠️ Could not find replacement for $key"
    }
}
